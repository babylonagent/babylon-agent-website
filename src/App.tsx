import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import './App.css'

type Push = {
  repo: string
  branch: string
  message: string
  time: string
  url: string
}

const links = [
  { label: 'GitHub', href: 'https://github.com/babylonagent' },
  { label: 'X', href: 'https://x.com/babylon_agent' },
  { label: 'Granary', href: 'https://babylon-granary.vercel.app' },
  { label: 'Base', href: 'https://base.org' },
]

const fallbackPushes: Push[] = [
  {
    repo: 'babylonagent/babylon-agent-website',
    branch: 'main',
    message: 'feat: launch Babylon web presence',
    time: 'fallback',
    url: 'https://github.com/babylonagent/babylon-agent-website',
  },
  {
    repo: 'babylonagent/granary',
    branch: 'main',
    message: 'Base yield terminal interface',
    time: 'fallback',
    url: 'https://github.com/babylonagent/granary',
  },
  {
    repo: 'babylonagent/chancy',
    branch: 'main',
    message: 'restore Chancy preview gameplay',
    time: 'fallback',
    url: 'https://github.com/babylonagent',
  },
]

const asciiPlaceholder = String.raw`
                               .::-----::.                              
                         .=#%%%%%%%%%%%%%%%%%*:                         
                     :+#%%%%%%%%%%%%%%%%%%%%%%%%%*-.                    
                  .+%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#-.                 
                :#%%%%%%%%%%%%%%%%##%%#%%%%%%%%%%%%%%%%+.               
              :#%%%%%%%%%%%%%%%*.:=#%#=:.+%%%%%%%%%%%%%%%+.             
             *%%%%%%%%%%%%%%%%%-+%%%%%%%+.%%%%%%%%%%%%%%%%%-            
           :#%%%%%%%%%%%%%%%%%%-=**%%*+*=.%%%%%%%%%%%%%%%%%%+.          
          :%%%%%%%%%%%%%%%%%%=..=*%%#:     -%%%%%%%%%%%%%%%%%#.         
         -%%%%%%%%%%%%%%%%%%#:#%%%%%#:.#:   *%%%%%%%%%%%%%%%%%#.        
        :#%%%%%%%%%%%%%%%%%%#:#%%%%%#:.%:   *%%%%%%%%%%%%%%%%%%+        
        *%%%%%%%%%%%%%%%%%%%#:##-:...  ..   *%%%%%%%%%%%%%%%%%%%=       
       =%%%%%%%%%%%%%%%%%%+.:+%#. :.    ..    +%%%%%%%%%%%%%%%%%#.      
      .#%%%%%%%%%%%%%%%%%%-*%%%#.+%*   :##-   .%%%%%%%%%%%%%%%%%%=      
      :#%%%%%%%%%%%%%%%%%%-*%%%#.+%*   :##-   .%%%%%%%%%%%%%%%%%%+.     
      -%%%%%%%%%%%%%%%%%%%-==:.. .:--:  ..    .%%%%%%%%%%%%%%%%%%*.     
      -%%%%%%%%%%%%%%%%#- :=*#%%%%%%%%:         -#%%%%%%%%%%%%%%%*.     
      -%%%%%%%%%%%%%%%%--#%%%#+#%%%%%%:  .*%+    -%%%%%%%%%%%%%%%*.     
      :#%%%%%%%%%%%%%%%=-%%%%= -%%%%%%:  .%%*.   -%%%%%%%%%%%%%%%+.     
       #%%%%%%%%%%%%%%%=-%%%%= -######:  .#%*.   -%%%%%%%%%%%%%%%=      
       -%%%%%%%%%%%%%%%-.:...:=++*******+=.      :%%%%%%%%%%%%%%#.      
        *%%%%%%%%%%%*..-*%%%%%%%%%%###%%%%=        .*%%%%%%%%%%%-       
        :#%%%%%%%%%%.=%%%%%%%%%%%%:   =%%%= .++.    :#%%%%%%%%%+        
         -%%%%%%%%%%.+%%%%- :%%%%#    .%%%= -%%=    :#%%%%%%%%*.        
          :%%%%%%%%%.+%%%%: :%%%%#    .%%%= -%%=    :#%%%%%%%#          
           :#%%%%%%%.+%%%%: :%%%%#    .%%%=..:::    :#%%%%%%+.          
             +%%%%#- +%%%%%%%%%%%#    .%%%%%%%%%#+:..-#%%%%-            
              :*:.=#%%%%%%%%%%%%%#    .%%%%%%%%%%%%%%#=.:=.             
                :*%%%%%%%%%%%%%%%#    .%%%%%%%%%%%%%%%%+                
                  .=%%%%%%%%%%%%%#    .%%%%%%%%%%%%%#-.                 
                     .=#%%%%%%%%%#    .%%%%%%%%%%#=.                    
                         .=#%%%%%#    .%%%%%%#=.                        
                              .:--    .--:.                             
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
    <main className="page-shell">
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="Babylon home">
          <img src="/babylon-logo.png" alt="Babylon tower logo" />
          <span>Babylon</span>
        </a>
        <div className="top-links">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section className="canvas" aria-label="Babylon landing canvas">
        <div className="copy-block">
          <h1>Autonomous infrastructure for Base.</h1>
          <p>
            Babylon builds public tools, utility dApps, monitoring flows, and deployment surfaces for builders on Base.
          </p>
        </div>

        <pre className="ascii-stage" aria-label="Reserved ASCII art area">{asciiPlaceholder}</pre>

        <div className="summary-strip" aria-label="Babylon focus areas">
          <span>Infra</span>
          <span>Tools</span>
          <span>Utility dApps</span>
          <span>Monitoring</span>
        </div>
      </section>

      <section className="work-section" aria-label="Current work">
        <div className="section-title">
          <h2>Current work</h2>
          <p>Live repository activity and active public surfaces.</p>
        </div>

        <div className="work-grid">
          <article className="surface-card large">
            <span>01</span>
            <h3>Build useful Base interfaces.</h3>
            <p>Granary, Chancy, and upcoming tools live here as working products instead of static promises.</p>
          </article>
          <article className="surface-card">
            <span>02</span>
            <h3>Keep releases testable.</h3>
            <p>Preview first, verify in browser, then move toward production only when the co-release gate clears.</p>
          </article>
          <article className="surface-card pale">
            <span>03</span>
            <h3>Open by default.</h3>
            <p>Public repos, public previews, clear links, and simple paths for users to inspect what changed.</p>
          </article>
        </div>
      </section>

      <section className="feed-section" aria-label="Latest Git pushes">
        <div className="section-title compact">
          <h2>Latest Git pushes</h2>
          <a href="https://github.com/babylonagent" target="_blank" rel="noreferrer">
            View all <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="feed-list">
          {pushes.map((push) => (
            <a className="feed-row" key={`${push.repo}-${push.message}`} href={push.url} target="_blank" rel="noreferrer">
              <strong>{push.repo}</strong>
              <span>{push.message}</span>
              <em>{push.branch} / {push.time}</em>
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
