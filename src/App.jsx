import { useEffect, useRef, useState } from 'react'
import './App.css'

const RESUME_URL = '/resume.pdf' 

function useInView(threshold = 0.18) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
    }
  }, [threshold, isVisible])

  return [ref, isVisible]
}

const PROJECTS = [
  {
    title: 'Resume Tailorer',
    description:
      'End-to-end resume parsing and job-based tailoring app. Uses an LLM pipeline to generate role-specific suggestions for each section of a resume.',
    stack: ['Python', 'TypeScript', 'FastAPI', 'React', 'PostgreSQL'],
    href: 'https://github.com/jacksonliao78/re',
  },
  {
    title: 'Tetris Bot',
    description:
      'Fully playable Tetris clone with an autonomous bot that uses a genetic algorithm to optimize weighted heuristics.',
    stack: ['Python', 'Pygame'],
    href: 'https://github.com/jacksonliao78/games_and_stuff',
  },
  {
    title: 'Critterworld',
    description:
      'Team project that implemented a parser and AST for a custom critter behavior language, plus the core simulation model, rule evaluation, and a responsive GUI.',
    stack: ['Java', 'Spark', 'Gradle', 'JUnit', 'Git'],
    href: null,
  },
  {
    title: 'Others...',
    description:
      'Solutions and practice mainly for USACO and the Advent of Code. Yay algorithms.',
    stack: ['Python'],
    href: 'https://github.com/jacksonliao78/prac',
  },
]

function techSlug(name) {
  const lower = name.toLowerCase()
  if (name === 'C++') return 'cpp'
  if (lower.startsWith('react')) return 'react'
  if (lower === 'tailwind css') return 'tailwind'
  if (lower === 'sqlite3') return 'sqlite'
  return lower.replace(/[^a-z0-9]+/g, '-')
}

function TechIcon({ name }) {
  const slug = techSlug(name)

  const imageIcons = {
    python: '/python.svg',
    javascript: '/javascript.svg',
    typescript: '/typescript.svg',
    java: '/java.svg',
    ocaml: '/ocaml.svg',
    sql: '/sql.svg',
    cpp: '/cpp.svg',

    react: '/react.svg',
    vite: '/vite.svg',
    tailwind: '/tailwind.svg',

    flask: '/flask.svg',
    fastapi: '/fastapi.svg',
    spark: '/spark.svg',
    postgresql: '/postgresql.svg',
    sqlite: '/sqlite3.svg',
    sqlite3: '/sqlite3.svg',

    git: '/git.svg',
    docker: '/docker.svg',
    vercel: '/vercel.svg',
    junit: '/junit.svg',
    pygame: '/pygame.svg',
  }

  const src = imageIcons[slug]
  if (!src) return null
  return <img src={src} alt={name} />
}

function mod(n, m) {
  return ((n % m) + m) % m
}

export default function App() {
  const [projectIndex, setProjectIndex] = useState(0)
  const [exp1Ref, exp1Visible] = useInView()
  const [exp2Ref, exp2Visible] = useInView()
  const [exp3Ref, exp3Visible] = useInView()
  const [exp4Ref, exp4Visible] = useInView()
  const [edu1Ref, edu1Visible] = useInView()
  const [navVisible, setNavVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
        setNavVisible(true)
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setNavVisible(false)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const prevIndex = mod(projectIndex - 1, PROJECTS.length)
  const nextIndex = mod(projectIndex + 1, PROJECTS.length)

  // Build the 3 visible slots: [prev, current, next]
  const visibleSlots = [
    { project: PROJECTS[prevIndex], slot: 'left', originalIndex: prevIndex },
    { project: PROJECTS[projectIndex], slot: 'active', originalIndex: projectIndex },
    { project: PROJECTS[nextIndex], slot: 'right', originalIndex: nextIndex },
  ]

  return (
    <>
      <nav className={`nav ${navVisible ? 'nav-visible' : 'nav-hidden'} ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          <a href="#" className="nav-name">Jackson Liao-Cheng</a>
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <header className="hero">
          <div className="hero-photo">
            <img src="/portfolio.jpg" alt="Your Name" />
          </div>
          <div className="hero-content">
            <p className="hero-blurb">
              Hi! I'm Jackson, a fullstack software engineer that enjoys learning about algorithms. I also 
              dabble in ML/AI, and am continuously looking to expand upon and improve my skillset. 
            </p>
            <a href={RESUME_URL} className="hero-resume-button" target="_blank" rel="noopener noreferrer">
              Resume
              <svg className="hero-resume-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </a>
          </div>
        </header>

        <section id="about" className="section">
          <p className="section-title">About</p>
          <h2>About me</h2>
          <div className="about-grid">
            <div className="about-grid-cell">
              <h3 className="about-cell-title">Focus</h3>
              <p>
                Mostly full-stack development, but I'm also interested in creating algorithms.
              </p>
            </div>
            <div className="about-grid-cell">
              <h3 className="about-cell-title">Hobbies</h3>
              <p>
                I'm a pretty avid gym goer, a mediocre Tetris player, and I also enjoy playing piano - classical, OSTs, random covers. 
              </p>
            </div>
            <div className="about-grid-cell about-grid-education">
              <h3 className="about-cell-title">Education</h3>
              <ul className="education-list">
                <li
                  ref={edu1Ref}
                  className={`education-item reveal ${edu1Visible ? 'reveal-visible' : ''}`}
                >
                  <h4>CS & Operations Research</h4>
                  <div className="education-meta">Cornell University</div>
                </li>
              </ul>
            </div>
            <div className="about-grid-cell">
              <h3 className="about-cell-title">Currently</h3>
              <p>
                Learning more about ML - particularly RL, and hopefully building more projects.
              </p>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <p className="section-title">Projects</p>
          <h2>Some of my selected works.</h2>
          <div className="project-carousel">
            <div className="project-carousel-viewport">
              <div className="project-carousel-track">
                {visibleSlots.map(({ project, slot, originalIndex }) => (
                  <div
                    key={originalIndex}
                    className={`project-item project-item-${slot}`}
                    onClick={() => {
                      if (slot === 'left') setProjectIndex(prevIndex)
                      if (slot === 'right') setProjectIndex(nextIndex)
                    }}
                  >
                    <div className="project-item-name">
                      <h3>{project.title}</h3>
                      {project.href && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View on GitHub"
                        >
                          <svg
                            className="project-github-icon"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.09.68-.22.68-.48
                              0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62
                              1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08
                              0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.2 9.2 0 0 1 12 6.32c.85 0 1.71.12 2.51.35
                              1.9-1.31 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9
                              0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                    <div className="project-item-about">
                      <p>{project.description}</p>
                    </div>
                    <div className="project-item-links">
                      {project.stack && project.stack.length > 0 && (
                        <div className="project-tech-stack">
                          {project.stack.map((tech) => (
                            <span key={tech} className="project-tech-pill">
                              <span className="project-tech-pill-icon" aria-hidden="true">
                                <TechIcon name={tech} />
                              </span>
                              <span className="project-tech-pill-label">{tech}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="project-carousel-nav">
              <button
                type="button"
                className="project-carousel-btn project-carousel-btn-prev"
                onClick={() => setProjectIndex(prevIndex)}
                aria-label="Previous project"
              >
                &lt;
              </button>
              <button
                type="button"
                className="project-carousel-btn project-carousel-btn-next"
                onClick={() => setProjectIndex(nextIndex)}
                aria-label="Next project"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <p className="section-title">Experience</p>
          <h2>Experience</h2>
          <ul className="experience-list">
            <li
              ref={exp4Ref}
              className={`experience-item reveal ${exp4Visible ? 'reveal-visible' : ''}`}
            >
              <h3>Incoming Summer SWE Intern, Splunk</h3>
              <div className="experience-meta">March 2026 – Present · Boulder, CO</div>
              <p>
                FinOPs team
              </p>
            </li>
            <li
              ref={exp3Ref}
              className={`experience-item reveal ${exp3Visible ? 'reveal-visible' : ''}`}
            >
              <h3>Undergrad Researcher, Cornell University</h3>
              <div className="experience-meta">January 2026 – Present · Ithaca, NY</div>
              <p>
                Conducting research on queuing network optimization through deep reinforcement learning under Professor Jim Dai.
              </p>
            </li>
            <li
              ref={exp1Ref}
              className={`experience-item reveal ${exp1Visible ? 'reveal-visible' : ''}`}
            >
              <h3>Software Engineering Intern, American Red Cross</h3>
              <div className="experience-meta">June 2025 – August 2025 · Remote</div>
              <p>
                Developed a utility script and REST API to archive 25,000+ Jira issues, saving over
                200 engineering hours, and built a Flask-based web app to trigger and monitor archival jobs
                while collaborating with engineers on internal tooling for an AWS Kubernetes migration.
              </p>
            </li>
            <li
              ref={exp2Ref}
              className={`experience-item reveal ${exp2Visible ? 'reveal-visible' : ''}`}
            >
              <h3>Center Assistant, Kumon</h3>
              <div className="experience-meta">June 2023 – August 2025 · Buffalo, NY</div>
              <p>
                Guided K–12 students through math and English problem sets, tracked progress, and shared
                targeted feedback with parents to support long-term skill development.
              </p>
            </li>
          </ul>
        </section>

        <section id="skills" className="section">
          <p className="section-title">Skills</p>
          <h2>Skills</h2>
          <div className="skills-container">
            <div className="skill-category">
              <h3 className="skill-category-title">Languages</h3>
              <div className="skills-grid">
                {['Python', 'JavaScript', 'TypeScript', 'Java', 'OCaml', 'SQL'].map((name) => (
                  <span key={name} className="skill-tag">
                    <span className="skill-tag-icon" aria-hidden="true">
                      <TechIcon name={name} />
                    </span>
                    <span className="skill-tag-label">{name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Frontend</h3>
              <div className="skills-grid">
                {['React.js', 'Vite', 'Tailwind CSS'].map((name) => (
                  <span key={name} className="skill-tag">
                    <span className="skill-tag-icon" aria-hidden="true">
                      <TechIcon name={name} />
                    </span>
                    <span className="skill-tag-label">{name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Backend</h3>
              <div className="skills-grid">
                {['Flask', 'FastAPI', 'Spark', 'PostgreSQL', 'SQLite3'].map((name) => (
                  <span key={name} className="skill-tag">
                    <span className="skill-tag-icon" aria-hidden="true">
                      <TechIcon name={name} />
                    </span>
                    <span className="skill-tag-label">{name}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Other</h3>
              <div className="skills-grid">
                {['Git', 'Docker', 'Vercel'].map((name) => (
                  <span key={name} className="skill-tag">
                    <span className="skill-tag-icon" aria-hidden="true">
                      <TechIcon name={name} />
                    </span>
                    <span className="skill-tag-label">{name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <p className="section-title">Contact</p>
          <h2>Let's Connect!</h2>
          <div className="contact-grid">
            <a href="mailto:jacksonliao78@gmail.com" className="contact-box">
              <span className="contact-box-label">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 11l8-4.99V6H4zm0 3.8V18h16v-8.2l-7.4 4.62a2 2 0 0 1-2.2 0L4 9.8z"
                    />
                  </svg>
                </span>
                Email
              </span>
              <span className="contact-box-value">jacksonliao78@gmail.com</span>
            </a>
            <a href="https://www.github.com/jacksonliao78" className="contact-box" target="_blank" rel="noopener noreferrer">
              <span className="contact-box-label">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2C6.48 2 2 6.58 2 12.26c0 4.51 2.87 8.33 6.84 9.68.5.09.68-.22.68-.48
                      0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62
                      1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.08
                      0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.2 9.2 0 0 1 12 6.32c.85 0 1.71.12 2.51.35
                      1.9-1.31 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.74 0 3.95-2.34 4.82-4.57 5.07.36.32.68.94.68 1.9
                      0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
                    />
                  </svg>
                </span>
                GitHub
              </span>
              <span className="contact-box-value">github.com/jacksonliao78</span>
            </a>
            <a href="https://www.linkedin.com/in/jackson-liao-cheng/" className="contact-box" target="_blank" rel="noopener noreferrer">
              <span className="contact-box-label">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.32 8.16h4.36V24H.32zM8.35 8.16h4.18v2.15h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.68V24h-4.36v-8.1c0-1.93-.03-4.41-2.69-4.41-2.7 0-3.11 2.11-3.11 4.28V24H8.35z"
                    />
                  </svg>
                </span>
                LinkedIn
              </span>
              <span className="contact-box-value">linkedin.com/in/jackson-liao-cheng</span>
            </a>
          </div>
          <a href={RESUME_URL} className="resume-link" target="_blank" rel="noopener noreferrer">
            Download resume →
          </a>
        </section>
      </main>
    </>
  )
}
