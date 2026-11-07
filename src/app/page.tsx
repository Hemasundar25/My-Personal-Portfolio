import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const links = {
  email: "mailto:ghemasundarreddy25@gmail.com",
  github: "https://github.com/Hemasundar25",
  linkedin: "https://www.linkedin.com/in/hemasundarreddy-guggilla/",
  portfolio: "https://my-portfolio-coral-xi-45.vercel.app",
};

const tools = [
  "Python",
  "C",
  "Java (basic)",
  "HTML",
  "CSS",
  "Azure",
  "Flutter",
  "Supabase",
  "Git",
  "GitHub",
  "VS Code",
  "Antigravity",
  "AI / ML fundamentals",
  "Supervised learning",
  "Unsupervised learning",
  "Regression",
  "Classification",
  "Model evaluation",
  "Data preprocessing",
  "Exploratory data analysis",
  "Generative AI fundamentals",
  "Prompt engineering",
  "Gemini 2.0 Flash",
  "AWS Cloud Practitioner",
];

const projects = [
  {
    number: "01",
    title: "Azure Demand Forecasting",
    subtitle: "Capacity optimization system",
    description:
      "An Azure-based demand forecasting and capacity optimization system developed during the Infosys Springboard Virtual Internship 6.0 (B1).",
    points: [
      "Contributed to the front end of the system.",
      "Worked on demand forecasting and capacity optimization.",
      "Internship period: Aug–Oct 2025.",
    ],
    tools: ["Azure", "Front-end", "Infosys Springboard"],
    live: null,
  },
  {
    number: "02",
    title: "AuraHealth",
    subtitle: "Smart diagnostics · website concept",
    description:
      "An AI-powered healthcare website concept with patient and doctor portal experiences.",
    points: [
      "Worked on portal features for patient and doctor experiences.",
      "Contributed to authentication integration.",
      "Explored an AI-powered smart diagnostics concept.",
    ],
    tools: ["AI", "Healthcare", "Authentication"],
    live: null,
  },
  {
    number: "03",
    title: "Couple Space",
    subtitle: "Pairing app concept",
    description:
      "A Flutter and Supabase application concept centered on a short code-based pairing flow.",
    points: [
      "Explored anonymous authentication.",
      "Designed around short, time-limited pairing codes.",
      "Built as an application concept using Flutter and Supabase.",
    ],
    tools: ["Flutter", "Supabase", "Anonymous authentication"],
    live: null,
  },
  {
    number: "04",
    title: "Personal Portfolio",
    subtitle: "Profile · skills · projects",
    description:
      "A personal portfolio website presenting profile, skills, projects, and professional information.",
    points: [
      "Brings profile and professional information together.",
      "Presents skills and selected project work.",
      "A portfolio project listed on the resume.",
    ],
    tools: ["HTML", "CSS", "Personal website"],
    live: links.portfolio,
  },
];

const timeline = [
  {
    date: "Aug–Oct 2025",
    kind: "INTERNSHIP",
    title: "Infosys Springboard Virtual Internship 6.0 (B1)",
    detail:
      "Front-end contribution to an Azure-based demand forecasting and capacity optimization system.",
  },
  {
    date: "2025–2026",
    kind: "STUDENT LEADERSHIP",
    title: "NSS · Event organization",
    detail: "Event organization through NSS.",
  },
  {
    date: "2026",
    kind: "HACKATHON",
    title: "XHorizon National-Level Hackathon",
    detail:
      "Organized the national-level hackathon and coordinated student teams for hackathons and coding competitions.",
  },
  {
    date: "STUDENT ACTIVITIES",
    kind: "TECHNICAL EVENTS",
    title: "Coding Club · Data Club · ISTE · IUCEE · Anveshana",
    detail:
      "Organized technical events through student organizations and coordinated teams for hackathons and coding competitions.",
  },
  {
    date: "Aug–Oct 2026",
    kind: "INTERNSHIP / TRAINING",
    title: "Eduskills Java Full Stack",
    detail: "Internship / training program.",
  },
  {
    date: "2026–2027",
    kind: "STUDENT LEADERSHIP",
    title: "Coding Club · Vice Chairperson",
    detail: "Student leadership role.",
  },
  {
    date: "2026–2027",
    kind: "STUDENT LEADERSHIP",
    title: "IUCEE Association · Head",
    detail: "Student leadership role.",
  },
  {
    date: "2026–2027",
    kind: "STUDENT LEADERSHIP",
    title: "Data Club · Photography role",
    detail: "Photography role in the Data Club.",
  },
  {
    date: "2027",
    kind: "STUDENT LEADERSHIP",
    title: "Anveshana Club · Chairperson",
    detail: "Student leadership role.",
  },
  {
    date: "2023–2027",
    kind: "EDUCATION",
    title: "B.Tech · Computer Science & Engineering (AI & ML)",
    detail: "Mohan Babu University · CGPA 8.28 / 10.",
  },
  {
    date: "2021–2023",
    kind: "EDUCATION",
    title: "Intermediate",
    detail: "Narayana Junior College · 68%.",
  },
  {
    date: "2021",
    kind: "EDUCATION",
    title: "SSC",
    detail: "C.V.R Memorial English Medium · 100%.",
  },
];

const certifications = [
  "Artificial Intelligence Internship · Cognifyz Technologies",
  "AWS Cloud Practitioner",
  "Ethical Hacking · Eduskills",
  "Predictive Modeling Techniques · L&T",
  "Intro to Gemini 2.0 Flash",
  "Explore Machine Learning Using Python · Infosys",
  "NXT Wave workshop",
];

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "C", "Java (basic)"],
  },
  {
    title: "AI & machine learning",
    items: [
      "AI/ML fundamentals",
      "Supervised and unsupervised learning",
      "Regression and classification",
      "Model evaluation",
      "Data preprocessing",
      "Exploratory data analysis",
      "Generative AI fundamentals",
      "Prompt engineering",
    ],
  },
  {
    title: "Web & platforms",
    items: ["HTML", "CSS", "Azure", "Flutter", "Supabase"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "VS Code", "Antigravity"],
  },
  {
    title: "Professional",
    items: [
      "Team leadership",
      "Project coordination",
      "Event management",
      "Collaboration",
      "Communication",
      "Time management",
      "Strategic planning",
    ],
  },
];

const principles = [
  {
    number: "01",
    title: "Build with purpose",
    detail: "Focus on practical AI-enabled and cloud-connected applications.",
  },
  {
    number: "02",
    title: "Learn by making",
    detail: "Turn coursework and training into hands-on project experience.",
  },
  {
    number: "03",
    title: "Bring people together",
    detail: "Coordinate student teams, technical events, and competitions.",
  },
  {
    number: "04",
    title: "Keep improving",
    detail: "Grow through collaboration, clear communication, and reflection.",
  },
];

function SectionMarker({ children }: { children: string }) {
  return (
    <div className="section-marker" data-build="type">
      <span className="marker-dot" />
      {children}
    </div>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${children} (opens in a new tab)`}
    >
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" id="top" aria-labelledby="hero-name">
        <header className="site-header">
          <a className="wordmark" href="#top" aria-label="Back to top" data-build="pop">
            <span className="wordmark-mark">GH</span>
            <span className="wordmark-name">Guggilla Hemasundar Reddy</span>
          </a>
          <nav className="top-nav" aria-label="Main navigation">
            <a href="#work" data-build="type">Work</a>
            <a href="#record" data-build="type">Record</a>
            <a href="#about" data-build="type">About</a>
            <a href="#contact" data-build="type">Contact</a>
          </nav>
          <a className="header-contact" href={links.email} data-build="pop">
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </header>

        <div
          className="hero-word"
          data-build="wipe"
          data-text="PORTFOLIO"
          aria-hidden="true"
        >
          PORTFOLIO
        </div>
        <div className="hero-glow" aria-hidden="true" />
        <div className="portrait-wrap" aria-hidden="true" data-build="pop">
          <Image
            src="/headshot.png"
            alt=""
            fill
            priority
            sizes="(max-width: 700px) 90vw, 70vw"
            className="portrait-image"
          />
        </div>
        <div className="portrait-fade" aria-hidden="true" />

        <div className="hero-copy">
          <p className="handwritten" data-build="type">Hello, I’m</p>
          <h1 id="hero-name" className="hero-name" data-build="type">
            Guggilla
            <br />
            Hemasundar
            <br />
            Reddy
          </h1>
          <p className="hero-role" data-build="type">AI &amp; Cloud Engineering</p>
          <p className="hero-bio" data-build="type">
            Computer Science undergraduate specializing in AI &amp; ML.
            Interested in practical AI-enabled and cloud-connected applications.
          </p>
          <a className="button button-primary hero-cta" href="#work" data-build="pop">
            View work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <p className="based-in" data-build="type">
            <span className="location-dot" />
            Based in Tirupati, Andhra Pradesh, India
          </p>
        </div>

        <aside className="hero-stats" aria-label="Profile highlights">
          <p className="stats-eyebrow" data-build="type">At a glance</p>
          <div className="hero-stat" data-build="pop">
            <strong>04</strong>
            <span>Projects</span>
          </div>
          <div className="hero-stat" data-build="pop">
            <strong>05</strong>
            <span>Student leadership roles</span>
          </div>
          <div className="hero-stat" data-build="pop">
            <strong>8.28<span className="stat-unit">/10</span></strong>
            <span>B.Tech CGPA</span>
          </div>
          <a href="#work" className="stat-link" data-build="type">
            Explore selected work <ArrowRight size={14} aria-hidden="true" />
          </a>
        </aside>

        <a className="hero-scroll" href="#work" aria-label="Scroll to work" data-build="type">
          <span>Scroll to explore</span>
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </section>

      <section className="section work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading work-heading">
          <div>
            <SectionMarker>01 / SELECTED WORK</SectionMarker>
            <h2 id="work-title" data-build="wipe">Work that ships<span>.</span></h2>
            <p className="section-intro" data-build="type">
              Project concepts, internship contributions, and practical explorations.
            </p>
          </div>
          <div className="work-metrics" aria-label="Work and education statistics">
            <div data-build="pop"><strong>04</strong><span>Projects</span></div>
            <div data-build="pop"><strong>05</strong><span>Leadership roles</span></div>
            <div data-build="pop"><strong>8.28</strong><span>CGPA / 10</span></div>
          </div>
        </div>

        <div className="projects-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number} data-build="pop">
              <span className="project-number">{project.number}</span>
              <div className="project-main">
                <p className="project-subtitle">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-points">
                  {project.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
                <div className="chip-row" aria-label="Project technologies">
                  {project.tools.map((tool) => <span className="tech-chip" key={tool}>{tool}</span>)}
                </div>
              </div>
              <div className="project-links">
                <ExternalLink href={links.github}>GitHub profile</ExternalLink>
                {project.live ? <ExternalLink href={project.live}>Live portfolio</ExternalLink> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stack-section" id="stack" aria-labelledby="stack-title">
        <div className="stack-heading section">
          <SectionMarker>02 / TOOLS &amp; METHODS</SectionMarker>
          <h2 id="stack-title" data-build="wipe">A growing toolkit<span>.</span></h2>
          <p data-build="type">Technologies, methods, and platforms named in my resume.</p>
        </div>
        <div className="marquee-viewport" aria-label="Tools and methods marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                {tools.map((tool, index) => (
                  <span className="marquee-item" key={`${copy}-${tool}`} data-build="pop">
                    <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
                    {tool}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="stack-footer section">
          <span data-build="type">Move over the tools to pause</span>
          <span data-build="type">AI · ML · Web · Cloud</span>
        </div>
      </section>

      <section className="section record-section" id="record" aria-labelledby="record-title">
        <div className="section-heading record-heading">
          <div>
            <SectionMarker>03 / THE RECORD</SectionMarker>
            <h2 id="record-title" data-build="wipe">Learning in motion<span>.</span></h2>
            <p className="section-intro" data-build="type">
              Education, experience, student leadership, and technical events.
            </p>
          </div>
        </div>
        <div className="timeline">
          {timeline.map((item, index) => (
            <article className="timeline-item" key={`${item.title}-${item.date}`} data-build="pop">
              <span className="timeline-date">{item.date}</span>
              <span className="timeline-marker" aria-hidden="true" />
              <div className="timeline-copy">
                <p className="timeline-kind">{item.kind} <span>· {String(index + 1).padStart(2, "0")}</span></p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="certification-block">
          <div>
            <SectionMarker>LEARNING &amp; CERTIFICATIONS</SectionMarker>
            <h3 data-build="type">Continued learning</h3>
          </div>
          <ul className="certification-list">
            {certifications.map((certification) => (
              <li key={certification} data-build="type">{certification}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="section-heading">
          <div>
            <SectionMarker>04 / A LITTLE ABOUT ME</SectionMarker>
            <h2 id="about-title" data-build="wipe">Curious by design<span>.</span></h2>
          </div>
        </div>
        <div className="about-copy">
          <p data-build="type">
            I’m a Computer Science undergraduate specializing in Artificial
            Intelligence and Machine Learning at Mohan Babu University. I’m
            interested in building practical AI-enabled and cloud-connected
            applications while growing my skills in Python, machine learning
            fundamentals, and software development.
          </p>
          <p data-build="type">
            Alongside project work and training, I coordinate student-led
            technical activities and events. I enjoy learning with a team,
            exploring ideas hands-on, and bringing practical projects from
            concept toward a useful experience.
          </p>
        </div>

        <div className="skills-area">
          <div className="subsection-title" data-build="type">
            <span>Skills &amp; strengths</span>
            <span className="subsection-rule" />
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group" key={group.title} data-build="pop">
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="principles-area">
          <div className="subsection-title" data-build="type">
            <span>Principles I work by</span>
            <span className="subsection-rule" />
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article className="principle" key={principle.number} data-build="type">
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-inner section">
          <SectionMarker>05 / SAY HELLO</SectionMarker>
          <div className="contact-grid">
            <div>
              <h2 id="contact-title" data-build="wipe">
                Let’s make
                <br />
                something useful<span>.</span>
              </h2>
              <p className="contact-note" data-build="type">
                Interested in practical AI, machine learning, and cloud-connected
                applications. Reach out and say hello.
              </p>
            </div>
            <div className="contact-card" data-build="pop">
              <span className="contact-card-label">OPEN TO A CONVERSATION</span>
              <a className="contact-email" href={links.email}>
                ghemasundarreddy25@gmail.com <ArrowUpRight size={19} aria-hidden="true" />
              </a>
              <div className="social-links">
                <ExternalLink href={links.github}><Github size={16} aria-hidden="true" /> GitHub</ExternalLink>
                <ExternalLink href={links.linkedin}><Linkedin size={16} aria-hidden="true" /> LinkedIn</ExternalLink>
                <ExternalLink href={links.portfolio}>Portfolio</ExternalLink>
              </div>
            </div>
          </div>
          <a className="contact-cta" href={links.email} data-build="pop">
            <span>Have an idea or opportunity?</span>
            <strong>Start a conversation <ArrowUpRight size={19} aria-hidden="true" /></strong>
          </a>
          <footer className="site-footer">
            <span data-build="type">Guggilla Hemasundar Reddy</span>
            <span data-build="type">AI &amp; Cloud Engineering</span>
            <a href="#top" data-build="type">Back to top <ArrowRight size={14} aria-hidden="true" /></a>
          </footer>
        </div>
      </section>
    </main>
  );
}
