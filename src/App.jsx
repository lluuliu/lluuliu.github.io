import { useEffect, useState } from 'react'
import { capabilities, experience, profile, projects } from './content.js'

const Arrow = ({ diagonal = false }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d={diagonal ? 'M6 18 18 6m-8 0h8v8' : 'M5 12h14m-5-5 5 5-5 5'} />
  </svg>
)

const ThemeIcon = ({ dark }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    {dark ? (
      <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    ) : (
      <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
    )}
  </svg>
)

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('[data-reveal]').forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">跳到主要内容</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${profile.name} 首页`} onClick={closeMenu}>
          {profile.initials}<span>.</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
          <a href="#work" onClick={closeMenu}>作品</a>
          <a href="#about" onClick={closeMenu}>关于</a>
          <a href="#experience" onClick={closeMenu}>经历</a>
          <a href="#contact" onClick={closeMenu}>联系</a>
          <button className="theme-toggle" type="button" onClick={() => setDark((value) => !value)} aria-label="切换颜色主题">
            <ThemeIcon dark={dark} />
          </button>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <p className="eyebrow reveal" data-reveal>{profile.eyebrow}</p>
          <h1 className="hero-title reveal" data-reveal>
            {profile.headline.map((line, index) => (
              <span key={line} className={index === 1 ? 'accent-line' : ''}>{line}</span>
            ))}
          </h1>
          <div className="hero-footer reveal" data-reveal>
            <p>{profile.intro}</p>
            <a className="circle-link" href="#work" aria-label="查看作品">
              <Arrow />
            </a>
          </div>
          <div className="hero-meta reveal" data-reveal>
            <span><i className="status-dot" />{profile.availability}</span>
            <span>{profile.location}</span>
          </div>
        </section>

        <section className="manifesto" aria-label="工作方式">
          <div className="marquee" aria-hidden="true">
            <span>THINK CLEARLY · DESIGN WITH PURPOSE · BUILD WITH CARE · </span>
            <span>THINK CLEARLY · DESIGN WITH PURPOSE · BUILD WITH CARE · </span>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading reveal" data-reveal>
            <p className="section-kicker">SELECTED WORK / 精选作品</p>
            <h2>工作不只是结果，<br />也是思考的轨迹。</h2>
            <p>以下为内容示例，请在 <code>src/content.js</code> 中替换为你的真实项目。</p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a
                className={`project-card project-${project.accent} reveal`}
                data-reveal
                href={project.href}
                key={project.number}
                onClick={project.href === '#' ? (event) => event.preventDefault() : undefined}
                aria-label={`${project.title}${project.placeholder ? '，示例项目' : ''}`}
              >
                <div className="project-topline">
                  <span>{project.number}</span>
                  <span>{project.type}</span>
                  {project.placeholder && <span className="placeholder-label">CONTENT PLACEHOLDER</span>}
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-footer">
                  <div className="tag-list">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <span className="project-arrow"><Arrow diagonal /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-intro reveal" data-reveal>
            <p className="section-kicker">HOW I WORK / 工作方式</p>
            <h2>在好奇心与秩序之间，<br />寻找恰到好处的解法。</h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability reveal" data-reveal key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="experience-heading reveal" data-reveal>
            <p className="section-kicker">EXPERIENCE / 经历</p>
            <h2>一路走来</h2>
            <p>把这里替换成你的工作、教育或重要合作经历。</p>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row reveal" data-reveal key={item.period}>
                <span className="experience-period">{item.period}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                </div>
                <p className="experience-note">{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy reveal" data-reveal>
            <p className="section-kicker">START A CONVERSATION / 联系我</p>
            <h2>有个好想法？<br /><em>一起把它做出来。</em></h2>
          </div>
          <a className="contact-button reveal" data-reveal href={`mailto:${profile.email}`}>
            <span>发送邮件</span>
            <Arrow diagonal />
          </a>
          <div className="contact-meta reveal" data-reveal>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <div>
              {profile.social.map((item) => (
                <a href={item.href} key={item.label} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{item.label}</a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed & built with care.</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </>
  )
}

export default App
