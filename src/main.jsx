import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X, MessageCircle, Send, Sparkles, Database, ChartNoAxesCombined, Workflow, ChevronRight } from "lucide-react";
import "./styles.css";

const profile = {
  name: "Vinay Wakadkar",
  headline: "Curious about business. Driven by data.",
  intro: "I’m an MBA student at IMDR Pune, building practical skills at the intersection of business analytics, finance, and technology.",
  about: "My path into management began with a degree in Zoology. That scientific background taught me to observe carefully, ask better questions, and look for evidence. I’m now applying that mindset to business problems: organising data, exploring what it says, and turning analysis into decisions people can act on.",
  education: [
    "PGDM / MBA, IMDR Pune · 2026–2028",
    "B.Sc. Zoology, Garware College of Commerce (Autonomous), SPPU · 2022–2025 · CGPA 8.64/10"
  ],
  email: "vinaywakadkar.work@gmail.com",
  linkedin: "https://linkedin.com/in/vinaywakadkar",
  github: "https://github.com/vinaywork-droid"
};

const projects = [
  {
    number: "01", type: "BUSINESS RESEARCH · DATA ANALYTICS", title: "Meridian — Market Entry Analysis",
    description: "A fictional FMCG market-entry case study exploring where a brand could expand next, using a repeatable data pipeline and a decision-focused evaluation framework.",
    tags: ["Python", "SQLite", "Market sizing", "Scenario analysis", "Looker Studio"],
    outcome: "Compared candidate cities with a weighted scorecard, estimated total addressable market, and modelled 36-month revenue scenarios and breakeven timing.",
    link: "https://github.com/vinaywork-droid/Meridian-Market-Entry",
    dashboardLink: "https://datastudio.google.com/reporting/dfe4bf6b-1a30-4442-8cfa-9f85b0448c76",
    icon: <ChartNoAxesCombined size={22} strokeWidth={1.6} />
  },
  {
    number: "02", type: "WORKFLOW AUTOMATION · LEAD OPERATIONS", title: "AI-Powered Lead Qualification",
    description: "A prototype workflow concept for organising incoming leads and supporting a more consistent qualification process with automation and AI-assisted categorisation.",
    tags: ["Groq API", "Make.com", "Looker Studio"],
    outcome: "Connects lead qualification logic with an automation workflow and a visual reporting layer.",
    link: "https://github.com/vinaywork-droid",
    icon: <Workflow size={22} strokeWidth={1.6} />
  }
];

const skills = [
  { title: "Data analysis", items: "Python, Pandas, NumPy, Matplotlib, Seaborn" },
  { title: "Databases & querying", items: "SQL (learning), SQLite" },
  { title: "Reporting & automation", items: "Looker Studio, Google Sheets, Make.com, Groq API" },
  { title: "Tools", items: "Git, GitHub, VS Code, Jupyter Notebook" }
];

const qa = [
  { keys: ["who are you", "about vinay", "tell me about", "introduce"], answer: "Vinay Wakadkar is an MBA student at IMDR Pune interested in business analytics, finance, and data-led decision making. He has a B.Sc. in Zoology and is building practical analytics projects." },
  { keys: ["education", "degree", "college", "zoology", "cgpa", "marks"], answer: "Vinay is pursuing his PGDM/MBA at IMDR Pune (2026–2028). He completed a B.Sc. in Zoology at Garware College of Commerce (Autonomous), SPPU, from 2022–2025, with a CGPA of 8.64/10." },
  { keys: ["meridian", "market entry", "fmcg", "project"], answer: "Meridian Consumer Goods is a fictional FMCG market-entry case study comparing Nashik, Nagpur, and Mysuru for a proposed ₹8–12 crore Year 1 expansion. The workflow simulates seven data sources across four formats, cleans and normalises data with Python into SQLite, explores the data in a notebook, applies a weighted four-pillar city scorecard with sensitivity analysis, estimates TAM, models three revenue scenarios, analyses breakeven and risks, and generates an AI-assisted recommendation report using Groq. In this simulated case, Nagpur is recommended with a weighted score of 0.622, estimated annual TAM of ₹314 crore, base-case Year 1 revenue of ₹12.84 crore, and breakeven in Month 14. These are project-model outputs, not real company results. Code and methodology: https://github.com/vinaywork-droid/Meridian-Market-Entry | Live Looker Studio dashboard: https://datastudio.google.com/reporting/dfe4bf6b-1a30-4442-8cfa-9f85b0448c76" },
  { keys: ["lead", "automation", "groq", "make.com"], answer: "Vinay's AI-Powered Lead Qualification project explores a workflow using Groq, Make.com, and Looker Studio to support lead categorisation and reporting." },
  { keys: ["skills", "technical", "python", "sql", "tools"], answer: "Current tools and skills include Python, Pandas, NumPy, Matplotlib, Seaborn, SQLite, SQL (currently learning), Looker Studio, Google Sheets, Make.com, Groq API, Git/GitHub, VS Code, and Jupyter Notebook." },
  { keys: ["finance", "career", "interested", "goal", "role"], answer: "Vinay is exploring roles and projects that combine business analytics and finance. He is interested in using data to support business decisions and is continuing to develop his technical skills." },
  { keys: ["experience", "job", "internship", "work experience"], answer: "This portfolio focuses on academic and self-directed projects. It does not list formal full-time work experience or an internship." },
  { keys: ["contact", "email", "linkedin", "github", "reach"], answer: "You can contact Vinay at vinaywakadkar.work@gmail.com, connect on LinkedIn at https://linkedin.com/in/vinaywakadkar, or explore his work at https://github.com/vinaywork-droid." },
  { keys: ["hobby", "outside work", "creative", "poetry", "tabla"], answer: "Outside analytics, Vinay enjoys poetry, short-story writing, tabla, and business case studies." }
];

function answerQuestion(question) {
  const q = question.toLowerCase().replace(/[^\w\s.-]/g, " ");
  const found = qa.find(item => item.keys.some(key => q.includes(key)));
  return found?.answer || "I can answer questions about Vinay's education, projects, skills, career interests, and contact details. Try asking about the Meridian project, Python and SQL skills, or how to contact him.";
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I’m Vinay’s portfolio assistant. Ask me about his projects, skills, education, or contact details." }]);
  const send = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { from: "user", text: trimmed }, { from: "bot", text: answerQuestion(trimmed) }]);
    setInput("");
  };
  return <>
    {open && <section className="chat-panel" aria-label="Ask my resume chatbot">
      <div className="chat-head"><div><span className="chat-eyebrow"><Sparkles size={12} /> PORTFOLIO ASSISTANT</span><strong>Ask my resume</strong></div><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18}/></button></div>
      <div className="chat-messages">{messages.map((m, i) => <div key={i} className={`message ${m.from}`}>{m.text}</div>)}</div>
      <div className="quick-questions"><button onClick={() => send("Tell me about the Meridian project")}>Meridian project</button><button onClick={() => send("What are Vinay's skills?")}>Skills</button><button onClick={() => send("How can I contact Vinay?")}>Contact</button></div>
      <form className="chat-form" onSubmit={e => { e.preventDefault(); send(); }}><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question…" aria-label="Ask a question"/><button aria-label="Send question" type="submit"><Send size={16}/></button></form>
      <p className="chat-note">Answers are based on the information published on this site.</p>
    </section>}
    <button className={`chat-launch ${open ? "active" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close resume assistant" : "Open resume assistant"}>
      {open ? <X size={20}/> : <><MessageCircle size={19}/><span>Ask my resume</span></>}
    </button>
  </>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();
  const navItems = useMemo(() => [["Work", "#work"], ["About", "#about"], ["Skills", "#skills"], ["Contact", "#contact"]], []);
  return <div className="site-shell">
    <header className="site-header">
      <a href="#top" className="brand" aria-label="Vinay Wakadkar homepage"><span className="brand-mark">VW</span><span>VINAY WAKADKAR</span></a>
      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={14}/></a></nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot"></span> MBA STUDENT · BUSINESS ANALYTICS · FINANCE</p>
          <h1>Curious about business.<br/><em>Driven by data.</em></h1>
          <p className="hero-intro">I’m <strong>Vinay Wakadkar</strong>, an MBA student at IMDR Pune exploring how data, technology, and business thinking can help solve real-world problems.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="#about">A little about me <ArrowUpRight size={15}/></a></div>
          <div className="hero-meta"><span>BASED IN PUNE, INDIA</span><span>OPEN TO LEARNING & COLLABORATION</span></div>
        </div>
        <div className="hero-art" aria-label="Editorial data illustration">
          <div className="art-top"><span>FIELD NOTES / 001</span><span>BUSINESS × DATA</span></div>
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="art-center"><span className="art-big">VW</span><span className="art-small">OBSERVE → ANALYSE → DECIDE</span></div>
          <div className="art-stamp">THINK<br/>CLEARLY.</div>
          <div className="chart-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div className="art-bottom"><span>ANALYTICAL CURIOSITY</span><span>EST. 2026</span></div>
        </div>
      </section>

      <section className="intro-strip"><div className="section-wrap strip-inner"><span className="strip-label">THE THROUGH-LINE</span><p>From studying living systems to understanding business systems — <strong>follow the evidence, find the pattern, make the next decision clearer.</strong></p></div></section>

      <section className="section-wrap work-section" id="work">
        <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2>Projects with a<br/><em>business question.</em></h2></div><p className="section-note">I like projects that move beyond charts to explain what the data might mean — and what someone could do next.</p></div>
        <div className="project-list">{projects.map(p => <article className="project-card" key={p.number}>
          <div className="project-number">{p.number}</div><div className="project-main"><p className="project-type">{p.type}</p><h3>{p.title}</h3><p className="project-description">{p.description}</p><div className="tag-list">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div><p className="project-outcome"><strong>WHAT IT EXPLORES</strong>{p.outcome}</p><a className="project-link" href={p.link} target="_blank" rel="noreferrer">View project / GitHub <ArrowUpRight size={16}/></a>{p.dashboardLink && <a className="project-link dashboard-link" href={p.dashboardLink} target="_blank" rel="noreferrer">View live dashboard <ArrowUpRight size={16}/></a>}</div><div className="project-icon">{p.icon}<span>CASE<br/>STUDY</span></div>
        </article>)}</div>
      </section>

      <section className="process-section"><div className="section-wrap process-inner"><div><p className="eyebrow">02 / HOW I APPROACH A PROBLEM</p><h2>Make the messy<br/><em>make sense.</em></h2><p className="process-copy">A good analysis is more than a polished chart. It starts with the right question and ends with a useful next step.</p></div><div className="process-steps"><div><span>01</span><Database/><h3>Structure</h3><p>Bring scattered information into a format that can be explored.</p></div><div><span>02</span><ChartNoAxesCombined/><h3>Investigate</h3><p>Look for patterns, compare assumptions, and test the story the data tells.</p></div><div><span>03</span><Workflow/><h3>Communicate</h3><p>Turn findings into a clear recommendation, dashboard, or decision.</p></div></div></div></section>

      <section className="section-wrap about-section" id="about"><div className="about-label"><p className="eyebrow">03 / THE PERSON BEHIND THE SPREADSHEET</p><span className="about-initials">V.</span></div><div className="about-content"><h2>A different starting point.<br/><em>A curious next chapter.</em></h2><p>{profile.about}</p><p>Currently, I’m pursuing my PGDM/MBA at IMDR Pune and developing projects that connect business questions with data analysis. I’m especially interested in the overlap between business analytics and finance.</p><div className="education-list"><h3>EDUCATION</h3>{profile.education.map(e => <p key={e}>{e}</p>)}</div><div className="personal-note"><span>OUTSIDE THE DATA</span><p>Poetry, short stories, tabla, and business case studies. Different interests, same habit: notice the details and stay curious.</p></div></div></section>

      <section className="skills-section" id="skills"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow">04 / TOOLKIT</p><h2>Tools I use.<br/><em>Skills I’m building.</em></h2></div><p className="section-note">A growing toolkit for turning raw information into useful business insight. I’m still learning, and I try to make each project stretch my skills.</p></div><div className="skills-grid">{skills.map((s, i) => <div className="skill-item" key={s.title}><span>0{i+1}</span><h3>{s.title}</h3><p>{s.items}</p></div>)}</div></div></section>

      <section className="contact-section" id="contact"><div className="section-wrap contact-inner"><p className="eyebrow">05 / START A CONVERSATION</p><h2>Have a question,<br/><em>idea, or opportunity?</em></h2><p>I’m always happy to talk about business problems, analytics projects, and opportunities to learn or collaborate.</p><a className="button button-lime" href={`mailto:${profile.email}`}>Email Vinay <ArrowUpRight size={17}/></a><div className="social-links"><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn <ArrowUpRight size={13}/></a><a href={profile.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub <ArrowUpRight size={13}/></a><a href={`mailto:${profile.email}`}><Mail size={16}/> Email <ArrowUpRight size={13}/></a></div></div></section>
    </main>

    <footer className="site-footer"><a href="#top" className="footer-brand">VW <span>VINAY WAKADKAR</span></a><p>Built with curiosity, not a template.</p><span>© {currentYear} VINAY WAKADKAR</span></footer>
    <Chatbot/>
  </div>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
