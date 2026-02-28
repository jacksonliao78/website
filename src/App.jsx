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
  { title: 'Reumse Tailorer', description: 'Brief description of the project and what you built.', href: '#' },
  { title: 'todo', description: 'Another project description.', href: '#' },
  { title: 'todo', description: 'a', href: '#' },
  { title: 'todo', description: 'yeah u get it', href: '#' },
]

function mod(n, m) {
  return ((n % m) + m) % m
}

export default function App() {
  const [projectIndex, setProjectIndex] = useState(0)
  const [exp1Ref, exp1Visible] = useInView()
  const [exp2Ref, exp2Visible] = useInView()
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
                    </div>
                    <div className="project-item-about">
                      <p>{project.description}</p>
                    </div>
                    <div className="project-item-links">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Repo
                      </a>
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
              ref={exp1Ref}
              className={`experience-item reveal ${exp1Visible ? 'reveal-visible' : ''}`}
            >
              <h3>Role, Company</h3>
              <div className="experience-meta">Date range · Location (optional)</div>
              <p>what i did</p>
            </li>
            <li
              ref={exp2Ref}
              className={`experience-item reveal ${exp2Visible ? 'reveal-visible' : ''}`}
            >
              <h3>a2</h3>
              <div className="experience-meta">Date range</div>
              <p>todo</p>
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
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">OCaml</span>
                <span className="skill-tag">SQL</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Frontend</h3>
              <div className="skills-grid">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Vite</span>
                <span className="skill-tag">Tailwind CSS</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Backend</h3>
              <div className="skills-grid">
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">FastAPI</span>
                <span className="skill-tag">Spark</span>
                <span className="skill-tag">PostgreSQL</span>
                <span className="skill-tag">SQLite3</span>
              </div>
            </div>
            <div className="skill-category">
              <h3 className="skill-category-title">Other</h3>
              <div className="skills-grid">
                <span className="skill-tag">Git</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">AWS</span>
                <span className="skill-tag">Vercel</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <p className="section-title">Contact</p>
          <h2>Let's Connect!</h2>
          <div className="contact-grid">
            <a href="mailto:jacksonliao78@gmail.com" className="contact-box">
              <span className="contact-box-label">Email</span>
              <span className="contact-box-value">jacksonliao78@gmail.com</span>
            </a>
            <a href="https://www.github.com/jacksonliao78" className="contact-box" target="_blank" rel="noopener noreferrer">
              <span className="contact-box-label">GitHub</span>
              <span className="contact-box-value">github.com/jacksonliao78</span>
            </a>
            <a href="https://www.linkedin.com/in/jackson-liao-cheng/" className="contact-box" target="_blank" rel="noopener noreferrer">
              <span className="contact-box-label">LinkedIn</span>
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
