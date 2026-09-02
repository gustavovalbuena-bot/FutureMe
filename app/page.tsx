"use client";

import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Download,
  HeartHandshake,
  LockKeyhole,
  Mail,
  Menu,
  PackageCheck,
  Play,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

type Capsule = {
  childName: string;
  ageBand: string;
  dream: string;
  letter: string;
  deliveryDate: string;
  privacy: "child" | "shared";
  obstacle: string;
  ifThen: string;
  firstStep: string;
  parentEmail: string;
  createdAt: string;
  checkIns: number;
};

const initialCapsule: Omit<Capsule, "createdAt" | "checkIns"> = {
  childName: "",
  ageBand: "8–10",
  dream: "",
  letter: "",
  deliveryDate: "",
  privacy: "child",
  obstacle: "",
  ifThen: "",
  firstStep: "",
  parentEmail: "",
};

const gallery = [
  ["The kitchen-table ritual", "One question. One page. Ten unrushed minutes."],
  ["A dream becomes visible", "Prompt cards help a child find their own words."],
  ["Celebrate the first step", "Progress is evidence—not pressure."],
  ["A gentle parent nudge", "The app reminds the adult what to ask, not what to demand."],
  ["Make the future together", "A tactile vision map for the whole family."],
  ["A quiet note before bed", "Private reflection can happen in a few honest lines."],
  ["Designed for real schedules", "A weekly ritual that fits between ordinary life."],
  ["Money dreams count too", "Turn saving for a bike into a child-owned plan."],
  ["Ask, don’t assign", "Parents get coaching prompts that protect autonomy."],
  ["Carry the next step", "A pocket card keeps one small commitment close."],
  ["See the path—not a score", "Milestones make effort visible without ranking a child."],
  ["Letters across generations", "Grandparents can add encouragement—only when invited."],
  ["From idea to little project", "A future shop, story, invention, or community dream."],
  ["Walk and wonder", "The best future conversations don’t need another screen."],
  ["A story worth opening later", "The sealed letter preserves the child’s own voice."],
  ["Plan the obstacle kindly", "If–then planning turns friction into a prepared response."],
  ["A check-in without judgment", "Did it happen? What got in the way? What changes now?"],
  ["A calm family dashboard", "Adults see the ritual; children control the letter."],
  ["A circle of possibility", "A workshop format for clubs, libraries, and classrooms."],
  ["A gift with a future", "The physical kit makes a meaningful family ritual tangible."],
];

const researchLinks = [
  {
    label: "Implementation intentions meta-analysis",
    detail: "94 independent tests; medium-to-large effect on goal attainment.",
    href: "https://cancercontrol.cancer.gov/sites/default/files/2020-06/goal_intent_attain.pdf",
  },
  {
    label: "MCII field experiment with fifth graders",
    detail: "Better grades, attendance, and conduct in a randomized study.",
    href: "https://pubmed.ncbi.nlm.nih.gov/25068007/",
  },
  {
    label: "Future-self letters and temporal distancing",
    detail: "Future-letter writing improved short-term emotional outcomes in adults.",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8013690/",
  },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#top" aria-label="Kindred Tomorrow home">
      <svg className="brand-mark" viewBox="0 0 52 52" aria-hidden="true">
        <path d="M10 21.5 26 10l16 11.5v20H10z" fill="#F7F0E3" stroke="currentColor" strokeWidth="2.4" />
        <path d="m11.7 23.2 14.3 11 14.3-11" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M26 9.5V3.8" stroke="#E96F51" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M18.5 10.2 15 6.7M33.5 10.2 37 6.7" stroke="#E96F51" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M19.2 16.1a7.2 7.2 0 0 1 13.6 0" fill="#F2C14E" stroke="#E96F51" strokeWidth="2.1" />
      </svg>
      {!compact && (
        <span>
          <strong>Kindred Tomorrow</strong>
          <small>Parent-led. Child-owned.</small>
        </span>
      )}
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [capsule, setCapsule] = useState(initialCapsule);
  const [saved, setSaved] = useState<Capsule | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("kindred-tomorrow-capsule");
    if (stored) {
      try {
        setSaved(JSON.parse(stored) as Capsule);
      } catch {
        window.localStorage.removeItem("kindred-tomorrow-capsule");
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  const minimumDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().slice(0, 10);
  }, []);

  function updateCapsule<K extends keyof typeof initialCapsule>(key: K, value: (typeof initialCapsule)[K]) {
    setCapsule((current) => ({ ...current, [key]: value }));
  }

  function openBuilder() {
    setStep(saved ? 4 : 1);
    setModalOpen(true);
  }

  function submitCapsule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const complete: Capsule = {
      ...capsule,
      createdAt: new Date().toISOString(),
      checkIns: 0,
    };
    window.localStorage.setItem("kindred-tomorrow-capsule", JSON.stringify(complete));
    setSaved(complete);
    setStep(4);
  }

  function recordCheckIn() {
    if (!saved) return;
    const next = { ...saved, checkIns: Math.min(saved.checkIns + 1, 4) };
    setSaved(next);
    window.localStorage.setItem("kindred-tomorrow-capsule", JSON.stringify(next));
  }

  function resetPrototype() {
    window.localStorage.removeItem("kindred-tomorrow-capsule");
    setSaved(null);
    setCapsule(initialCapsule);
    setStep(1);
  }

  function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = JSON.parse(window.localStorage.getItem("kindred-tomorrow-waitlist") || "[]") as string[];
    if (!current.includes(waitlistEmail)) current.push(waitlistEmail);
    window.localStorage.setItem("kindred-tomorrow-waitlist", JSON.stringify(current));
    setWaitlistDone(true);
  }

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="shell nav-shell">
          <Logo />
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Primary navigation">
            <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#kit" onClick={() => setMenuOpen(false)}>The family kit</a>
            <a href="#evidence" onClick={() => setMenuOpen(false)}>Evidence</a>
            <a href="#gallery" onClick={() => setMenuOpen(false)}>Campaign</a>
            <button className="button button-small" onClick={openBuilder}>Try the prototype</button>
          </nav>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div id="main-content">
        <section className="hero section-pad">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={16} /> A Sunday ritual for ages 8–14</p>
              <h1>Help a dream become a <em>next step.</em></h1>
              <p className="hero-lede">Kindred Tomorrow turns one future letter into a family practice: imagine, plan, check in—and open it later.</p>
              <div className="hero-actions">
                <button className="button" onClick={openBuilder}>Start a family capsule <ArrowRight size={18} /></button>
                <a className="text-link" href="#how"><Play size={17} fill="currentColor" /> See the 3-minute ritual</a>
              </div>
              <p className="prototype-note">Interactive MVP • Saves only on this device • No charge today</p>
            </div>
            <div className="hero-media">
              <div className="sun-stamp">ONE DREAM<br /><strong>ONE STEP</strong></div>
              <Image src={assetPath("/kindred/hero.png")} alt="A parent listening while a child writes a future letter at a warm kitchen table" width={1536} height={1024} priority unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
              <div className="hero-caption"><Mail size={18} /> “Dear future me, I kept going because…”</div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Product principles">
          <div className="shell trust-grid">
            <span><LockKeyhole /> Private by default</span>
            <span><ShieldCheck /> No ads or child profiling</span>
            <span><HeartHandshake /> Parent-led, child-owned</span>
            <span><Clock3 /> Ten minutes a week</span>
          </div>
        </section>

        <section className="section-pad" id="how">
          <div className="shell">
            <div className="section-heading">
              <p className="eyebrow">The product loop</p>
              <h2>A letter alone is a wish.<br />A ritual makes it useful.</h2>
              <p>The parent creates the space. The child chooses the future. The product connects imagination to action without turning family life into another performance dashboard.</p>
            </div>
            <div className="steps">
              <article>
                <span className="step-number">01</span>
                <Mail />
                <h3>Imagine it</h3>
                <p>Write, draw, or record a message to a future self. The letter stays private unless the child chooses to share.</p>
              </article>
              <article>
                <span className="step-number">02</span>
                <Target />
                <h3>Plan one obstacle</h3>
                <p>Turn “I hope” into “If this gets in the way, then I will…” and choose one small action for this week.</p>
              </article>
              <article>
                <span className="step-number">03</span>
                <CalendarDays />
                <h3>Notice progress</h3>
                <p>A weekly prompt helps the family notice effort, adjust the plan, and protect the joy of the original dream.</p>
              </article>
              <article>
                <span className="step-number">04</span>
                <PackageCheck />
                <h3>Open it later</h3>
                <p>The future letter returns at 90 days or one year—creating a moment to reflect, celebrate, and begin again.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="demo-band section-pad" id="demo">
          <div className="shell demo-grid">
            <div>
              <p className="eyebrow light">Live MVP</p>
              <h2>Build a future capsule in under eight minutes.</h2>
              <p>Try the complete flow: dream, private letter, if–then plan, delivery date, and a lightweight check-in dashboard.</p>
              <button className="button button-sun" onClick={openBuilder}>{saved ? "Open your dashboard" : "Try the working prototype"} <ChevronRight /></button>
            </div>
            <div className="mini-dashboard">
              <div className="mini-top"><span>OUR PATH TO TOMORROW</span><LockKeyhole size={16} /></div>
              <h3>{saved?.dream || "Learn to play my first song"}</h3>
              <div className="progress-row"><span>Weekly ritual</span><strong>{saved?.checkIns || 0}/4</strong></div>
              <div className="progress-track"><span style={{ width: `${((saved?.checkIns || 0) / 4) * 100}%` }} /></div>
              <div className="plan-card">
                <small>IF–THEN PLAN</small>
                <p>{saved?.ifThen || "If practice feels too hard, then I’ll play just four measures."}</p>
              </div>
              <div className="privacy-row"><ShieldCheck /> Parent sees ritual progress. The letter stays child-controlled.</div>
            </div>
          </div>
        </section>

        <section className="section-pad kit-section" id="kit">
          <div className="shell product-grid">
            <div className="product-image">
              <Image src={assetPath("/kindred/family-kit.png")} alt="Kindred Tomorrow family kit with workbook, prompt cards, envelopes, stickers, and companion app" width={1536} height={1024} unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
              <span className="image-tag">Commercial prototype render</span>
            </div>
            <div className="product-copy">
              <p className="eyebrow">Tactile by design</p>
              <h2>A physical ritual, with just enough software.</h2>
              <p>The kit creates a beginning worth remembering. The app handles timing, progress, and delivery without replacing the kitchen-table conversation.</p>
              <ul className="check-list">
                <li><Check /> Future Letter workbook and sealed “Open Later” envelopes</li>
                <li><Check /> 24 child prompts and 12 parent coaching cards</li>
                <li><Check /> Dream map, milestone stickers, and QR-linked capsule</li>
                <li><Check /> Private family dashboard and four gentle check-ins</li>
              </ul>
              <div className="price-row">
                <div><small>MVP PRICE TEST</small><strong>$79/year</strong><span>Digital founding family</span></div>
                <div><small>OPTIONAL KIT</small><strong>$39</strong><span>One-time, shipping included</span></div>
              </div>
              <button className="button" onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}>Join the 50-family pilot <ArrowRight /></button>
            </div>
          </div>
        </section>

        <section className="dashboard-section section-pad">
          <div className="shell product-grid reverse">
            <div className="product-copy">
              <p className="eyebrow">The autonomy promise</p>
              <h2>Guidance without surveillance.</h2>
              <p>Parents can see that a ritual happened and offer support. They do not automatically see the child’s letter, rank behavior, or receive a stream of productivity scores.</p>
              <div className="promise-grid">
                <div><LockKeyhole /><strong>Child controls content</strong><span>Private is the default, sharing is a choice.</span></div>
                <div><HeartHandshake /><strong>Parent gets better questions</strong><span>“What would help?” instead of “Did you finish?”</span></div>
                <div><ShieldCheck /><strong>Business model aligns</strong><span>Families pay; advertisers never do.</span></div>
              </div>
            </div>
            <div className="product-image dashboard-image">
              <Image src={assetPath("/kindred/dashboard.png")} alt="Kindred Tomorrow laptop and phone dashboard showing a dream, plan, check-in, and private letter status" width={1536} height={1024} unoptimized sizes="(max-width: 900px) 100vw, 52vw" />
              <span className="image-tag">Digital companion prototype</span>
            </div>
          </div>
        </section>

        <section className="section-pad evidence-section" id="evidence">
          <div className="shell evidence-grid">
            <div>
              <p className="eyebrow">Evidence-informed, honestly framed</p>
              <h2>Three mechanisms. One testable product hypothesis.</h2>
              <p className="evidence-lede">Research supports future-self connection, implementation intentions, and autonomy-supportive parenting as promising mechanisms. It does not yet prove that Kindred Tomorrow improves long-term outcomes. That is what the pilot is designed to test.</p>
              <a className="download-link" href={assetPath("/downloads/Kindred_Tomorrow_Impact_Research.pdf")}><Download /> Read the evidence paper <span>PDF</span></a>
            </div>
            <div className="research-list">
              {researchLinks.map((item, index) => (
                <a href={item.href} target="_blank" rel="noreferrer" key={item.label}>
                  <span>0{index + 1}</span>
                  <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                  <ArrowRight />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad gallery-section" id="gallery">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="eyebrow">Launch campaign</p><h2>One Sunday. One dream.<br />One small step.</h2></div>
              <p>Twenty finished campaign concepts across home, gifting, community, and everyday family moments. Designed for paid social, partnerships, email, and pilot recruitment.</p>
            </div>
            <div className="campaign-grid">
              {gallery.map(([title, copy], index) => (
                <article className="campaign-card" key={title}>
                  <Image src={assetPath(`/scenes/scene-${String(index + 1).padStart(2, "0")}.jpg`)} alt={`${title}: ${copy}`} width={720} height={720} unoptimized sizes="(max-width: 620px) 100vw, (max-width: 960px) 50vw, 25vw" />
                  <div className="campaign-overlay">
                    <span>{String(index + 1).padStart(2, "0")} / 20</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad pilot-section" id="waitlist">
          <div className="shell pilot-card">
            <div>
              <p className="eyebrow light">Founding-family pilot</p>
              <h2>We’re looking for 50 families, not 50,000 clicks.</h2>
              <p>Join a six-week prototype test. You’ll receive the ritual, four check-ins, and a short research survey. No payment is collected in this mockup.</p>
            </div>
            {waitlistDone ? (
              <div className="success-panel"><CircleCheck /><strong>You’re on this device’s pilot list.</strong><span>This is a front-end MVP: no email was sent. The production pilot will include consent and verified delivery.</span></div>
            ) : (
              <form className="waitlist-form" onSubmit={joinWaitlist}>
                <label htmlFor="waitlist-email">Parent email</label>
                <div><input id="waitlist-email" type="email" value={waitlistEmail} onChange={(event) => setWaitlistEmail(event.target.value)} placeholder="parent@example.com" required /><button className="button button-sun" type="submit">Request a pilot spot <ArrowRight /></button></div>
                <small>Prototype behavior: your email is stored locally in this browser only.</small>
              </form>
            )}
          </div>
        </section>

        <section className="section-pad faq-section">
          <div className="shell faq-grid">
            <div><p className="eyebrow">Questions parents ask</p><h2>Warm on the surface.<br />Serious underneath.</h2></div>
            <div>
              <details><summary>Can a parent read the letter?</summary><p>Not automatically. The child chooses whether a parent can read it. Parents see completion and check-in status, not private content.</p></details>
              <details><summary>Is this therapy or academic tutoring?</summary><p>No. It is an evidence-informed family reflection and planning product. It makes no clinical or guaranteed achievement claims.</p></details>
              <details><summary>How will children’s data be protected?</summary><p>The production plan uses verified parental consent, data minimization, no behavioral advertising, encrypted storage, deletion/export tools, and age-appropriate defaults.</p></details>
              <details><summary>What happens after I join?</summary><p>This website is a functional front-end test. The real pilot will recruit 30–50 families, conduct onboarding interviews, and test activation, 30-day retention, willingness to pay, and safety.</p></details>
            </div>
          </div>
        </section>
      </div>

      <footer>
        <div className="shell footer-grid">
          <Logo />
          <div><strong>Explore</strong><a href="#how">How it works</a><a href="#evidence">Evidence</a><a href="#gallery">Campaign</a></div>
          <div><strong>Company</strong><a href="mailto:hello@kindredtomorrow.test">Pilot contact</a><a href="https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions" target="_blank" rel="noreferrer">Child privacy framework</a></div>
          <p>Kindred Tomorrow is a working name pending trademark and domain clearance. This MVP does not send emails, collect payments, or provide clinical services.</p>
        </div>
        <div className="shell footer-bottom"><span>© 2026 Kindred Tomorrow concept</span><span>Designed for evidence, agency, and family care.</span></div>
      </footer>

      {modalOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <section className="builder-modal" role="dialog" aria-modal="true" aria-labelledby="builder-title">
            <button className="modal-close" onClick={() => setModalOpen(false)} aria-label="Close prototype"><X /></button>
            <div className="builder-header">
              <Logo compact />
              <div><span>FAMILY CAPSULE PROTOTYPE</span><div className="step-dots" aria-label={`Step ${step} of 4`}>{[1, 2, 3, 4].map((number) => <i className={number <= step ? "active" : ""} key={number} />)}</div></div>
            </div>
            {step === 1 && (
              <form className="builder-form" onSubmit={(event) => { event.preventDefault(); setStep(2); }}>
                <p className="eyebrow">Step 1 of 3</p><h2 id="builder-title">Whose tomorrow are we imagining?</h2><p>Use a nickname. The child should choose the dream in their own words.</p>
                <label>Child nickname<input value={capsule.childName} onChange={(event) => updateCapsule("childName", event.target.value)} placeholder="Mia" required maxLength={30} /></label>
                <label>Age band<select value={capsule.ageBand} onChange={(event) => updateCapsule("ageBand", event.target.value)}><option>8–10</option><option>11–12</option><option>13–14</option></select></label>
                <label>One dream or project<input value={capsule.dream} onChange={(event) => updateCapsule("dream", event.target.value)} placeholder="Make my first short film" required maxLength={80} /></label>
                <button className="button form-next" type="submit">Write to the future <ArrowRight /></button>
              </form>
            )}
            {step === 2 && (
              <form className="builder-form" onSubmit={(event) => { event.preventDefault(); setStep(3); }}>
                <p className="eyebrow">Step 2 of 3</p><h2 id="builder-title">A note only the future can open.</h2><p>Prompt: “Dear future me, I hope you remember…”</p>
                <label>Your future letter<textarea value={capsule.letter} onChange={(event) => updateCapsule("letter", event.target.value)} placeholder="Dear future me…" required minLength={20} maxLength={1200} rows={6} /><small>{capsule.letter.length}/1,200 characters</small></label>
                <label>Open on<input type="date" min={minimumDate} value={capsule.deliveryDate} onChange={(event) => updateCapsule("deliveryDate", event.target.value)} required /></label>
                <fieldset><legend>Who can read it before delivery?</legend><label className="radio-card"><input type="radio" name="privacy" checked={capsule.privacy === "child"} onChange={() => updateCapsule("privacy", "child")} /><span><LockKeyhole /><strong>Only the child</strong><small>Recommended. Parent sees completion, not content.</small></span></label><label className="radio-card"><input type="radio" name="privacy" checked={capsule.privacy === "shared"} onChange={() => updateCapsule("privacy", "shared")} /><span><HeartHandshake /><strong>Shared with parent</strong><small>The child chooses to invite the parent.</small></span></label></fieldset>
                <div className="form-actions"><button type="button" className="back-button" onClick={() => setStep(1)}>Back</button><button className="button" type="submit">Make a plan <ArrowRight /></button></div>
              </form>
            )}
            {step === 3 && (
              <form className="builder-form" onSubmit={submitCapsule}>
                <p className="eyebrow">Step 3 of 3</p><h2 id="builder-title">Prepare for the wobble.</h2><p>Good plans expect an obstacle. Keep the first step small enough to begin this week.</p>
                <label>What might get in the way?<input value={capsule.obstacle} onChange={(event) => updateCapsule("obstacle", event.target.value)} placeholder="I might feel stuck editing" required maxLength={100} /></label>
                <label>If that happens, then I will…<input value={capsule.ifThen} onChange={(event) => updateCapsule("ifThen", event.target.value)} placeholder="If I feel stuck, then I’ll ask one friend to watch a rough cut" required maxLength={160} /></label>
                <label>My first small step<input value={capsule.firstStep} onChange={(event) => updateCapsule("firstStep", event.target.value)} placeholder="Write a six-line scene on Sunday" required maxLength={120} /></label>
                <label>Parent email for production reminders<input type="email" value={capsule.parentEmail} onChange={(event) => updateCapsule("parentEmail", event.target.value)} placeholder="parent@example.com" required /><small>This front-end MVP stores it on this device and sends nothing.</small></label>
                <div className="form-actions"><button type="button" className="back-button" onClick={() => setStep(2)}>Back</button><button className="button" type="submit">Seal the capsule <Mail /></button></div>
              </form>
            )}
            {step === 4 && saved && (
              <div className="builder-form capsule-success">
                <CircleCheck className="success-icon" />
                <p className="eyebrow">Prototype capsule sealed</p><h2 id="builder-title">{saved.childName}&rsquo;s path to “{saved.dream}”</h2>
                <p>Saved locally on this device. No real email or future delivery has been scheduled.</p>
                <div className="capsule-summary">
                  <div><small>FIRST STEP</small><strong>{saved.firstStep}</strong></div>
                  <div><small>IF–THEN PLAN</small><strong>{saved.ifThen}</strong></div>
                  <div><small>OPEN DATE</small><strong>{new Date(`${saved.deliveryDate}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</strong></div>
                </div>
                <div className="checkin-box"><div><span>Weekly ritual progress</span><strong>{saved.checkIns}/4 check-ins</strong></div><div className="progress-track"><span style={{ width: `${(saved.checkIns / 4) * 100}%` }} /></div><button className="button" onClick={recordCheckIn} disabled={saved.checkIns >= 4}>{saved.checkIns >= 4 ? "Four rituals complete" : "Record one gentle check-in"} <Check /></button></div>
                <div className="success-actions"><button className="back-button" onClick={resetPrototype}>Reset prototype</button><button className="button button-secondary" onClick={() => setModalOpen(false)}>Return to the campaign</button></div>
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
