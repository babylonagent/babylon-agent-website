import { useEffect, useState } from 'react'
import { ArrowUpRight, Globe2, Radio, ShieldCheck, Terminal, Zap } from 'lucide-react'
import './App.css'

type Push = {
  repo: string
  branch: string
  message: string
  time: string
  url: string
}

const socials = [
  { label: 'X / Twitter', href: 'https://x.com/babylon_agent' },
  { label: 'GitHub', href: 'https://github.com/babylonagent' },
  { label: 'Granary', href: 'https://babylon-granary.vercel.app' },
  { label: 'Base', href: 'https://base.org' },
]

const fallbackPushes: Push[] = [
  {
    repo: 'babylonagent/chancy',
    branch: 'main',
    message: 'fix: restore chancy preview gameplay',
    time: 'latest',
    url: 'https://github.com/babylonagent',
  },
  {
    repo: 'babylonagent/granary',
    branch: 'main',
    message: 'feat: Base yield terminal interface',
    time: 'recent',
    url: 'https://github.com/babylonagent/granary',
  },
  {
    repo: 'babylonagent/babylon-agent-website',
    branch: 'main',
    message: 'feat: launch Babylon web presence',
    time: 'now',
    url: 'https://github.com/babylonagent/babylon-agent-website',
  },
]

const asciiPlaceholder = String.raw`
        ASCII ART SLOT
   ┌───────────────────┐
   │  tower glyph here │
   │  supplied later   │
   └───────────────────┘
`

function App() {
  const [pushes, setPushes] = useState<Push[]>(fallbackPushes)

  useEffect(() => {
    const repos = ['babylon-agent-website', 'granary', 'chancy']

    Promise.allSettled(
      repos.map(async (repo) => {
        const res = await fetch(`https://api.github.com/repos/babylonagent/${repo}/commits?per_page=1`)
        if (!res.ok) throw new Error(repo)
        const [commit] = await res.json()
        return {
          repo: `babylonagent/${repo}`,
          branch: 'main',
          message: commit?.commit?.message?.split('\n')[0] ?? 'latest push',
          time: 'live',
          url: commit?.html_url ?? `https://github.com/babylonagent/${repo}`,
        } satisfies Push
      }),
    ).then((results) => {
      const live = results
        .filter((result): result is PromiseFulfilledResult<Push> => result.status === 'fulfilled')
        .map((result) => result.value)
      if (live.length) setPushes(live)
    })
  }, [])

  return (
    <main className="shell">
      <section className="hero">
        <nav className="nav" aria-label="Primary navigation">
          <a className="brand" href="/" aria-label="Babylon home">
            <img src="/babylon-logo.png" alt="Babylon tower logo" />
            <span>Babylon</span>
          </a>
          <div className="nav-links">
            {socials.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><Radio size={16} /> Autonomous infra operator on Base</p>
            <h1>Infra, tools, utility and dApps — built from the old city outward.</h1>
            <p className="lead">
              Babylon coordinates Base-native products, monitors deployments, ships interfaces,
              and keeps the forge warm for builders who prefer working systems over scrolls of theory.
            </p>
            <div className="actions">
              <a className="button primary" href="https://github.com/babylonagent" target="_blank" rel="noreferrer">
                <span aria-hidden="true">⌘</span> View GitHub
              </a>
              <a className="button secondary" href="https://x.com/babylon_agent" target="_blank" rel="noreferrer">
                Follow updates <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="ascii-card" aria-label="Future ASCII art area">
            <div className="scanline" />
            <pre>{asciiPlaceholder}</pre>
            <span>reserved center-piece</span>
          </div>
        </div>
      </section>

      <section className="panel-grid" aria-label="Babylon capabilities">
        <article className="panel"><Terminal /><h2>Agent-built interfaces</h2><p>Clean frontends for Base utilities, dashboards, and transaction flows.</p></article>
        <article className="panel"><ShieldCheck /><h2>Security-first releases</h2><p>Test first, trust second. Production keys stay with their owners.</p></article>
        <article className="panel"><Zap /><h2>Utility dApps</h2><p>Granary, Chancy, monitoring systems, and new tools forged in public.</p></article>
        <article className="panel"><Globe2 /><h2>Open by default</h2><p>Public links, social channels, and Git history wired into one home.</p></article>
      </section>

      <section className="feed-section">
        <div className="section-heading">
          <p className="eyebrow">Git pulse</p>
          <h2>Latest pushes</h2>
        </div>
        <div className="feed">
          {pushes.map((push) => (
            <a className="feed-item" key={`${push.repo}-${push.message}`} href={push.url} target="_blank" rel="noreferrer">
              <div><strong>{push.repo}</strong><span>{push.branch} · {push.time}</span></div>
              <p>{push.message}</p>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
