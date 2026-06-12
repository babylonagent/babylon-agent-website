import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { initBabylonAsciiGlitch } from './asciiGlitch'
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
  { label: 'Shield', href: 'https://shield.babylon-agent.com' },
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

const normalizeAscii = (source: string) => {
  const lines = source.replace(/\r/g, '').replace(/^\n|\n$/g, '').split('\n').map((line) => line.replace(/\s+$/g, ''))
  const leftPad = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^\s*/)?.[0].length ?? 0))
  return lines.map((line) => line.slice(leftPad)).join('\n')
}

const desktopAscii = normalizeAscii(String.raw`
                  #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.  =#%%%%%%%%%%.   .       =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#.                
                .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%..#%%%%%%%%%%%%. .%%+      -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#                
                *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%..%%%%%%%%%%%%%. .%%+      -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*.              
               +%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%..%%%%%%%%%%%%%. .%%+      -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=              
              :#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%..%%%%#*+=--:::. .-=-      -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-             
              #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#*..%%%*                     :*%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*             
             =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*.   -%%%*                        .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-            
             *%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*  -#%%%%%*  :#%#:      .*%%=       .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#            
            .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ =%%%%%%%*  =%%%+      -%%%%.      .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%-           
            +%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ =%%%%%%%*  =%%%+      -%%%%.      .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+           
            #%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ =%%%%%%%*  =%%%+      -%%%%.      .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*           
           .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ =%%%%%#*+  :=--:      :++**.      .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#           
           :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ ::      ...:-=+*##*:              .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.          
           :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#:     .-*%%%%%%%%%%%%%%%:                =%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.          
           :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#.   -##%%%%%%%%%%%%%%%%%%%:                  -%%%%%%%%%%%%%%%%%%%%%%%%%%%%%.          
           :%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ .*%%%%%%%%%%%%%%%%%%%%%%%:     .*%%*.       .#%%%%%%%%%%%%%%%%%%%%%%%%%%%%.          
           .%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ :%%%%%%%%=  :#%%%%%%%%%%%:     *%%%%+       .#%%%%%%%%%%%%%%%%%%%%%%%%%%%#           
            #%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ :%%%%%%%%-  .#%%%%%%%%%%%:     *%%%%+       .#%%%%%%%%%%%%%%%%%%%%%%%%%%%*           
            +%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ :%%%%%%%%-  .#%%%%%%%%%%%:     *%%%%+       .#%%%%%%%%%%%%%%%%%%%%%%%%%%%=           
            .%%%%%%%%%%%%%%%%%%%%%%%%%%%%+ :%%%%%%%%-  .############:     *%%%%+       .#%%%%%%%%%%%%%%%%%%%%%%%%%%%:           
             *%%%%%%%%%%%%%%%%%%%%%%%%%%%+ :%%#*-.                           .::       .#%%%%%%%%%%%%%%%%%%%%%%%%%%#            
             -%%%%%%%%%%%%%%%%%%%%%%%%%%%=        :=+####%%%%%%%%%%%%%%%%#*.           .*%%%%%%%%%%%%%%%%%%%%%%%%%%:            
              #%%%%%%%%%%%%%%%%%%%%%%#:    :+##%%%%%%%%%%%%%%%%%%%%%%%%%%%%-              .=%%%%%%%%%%%%%%%%%%%%%%*             
              .#%%%%%%%%%%%%%%%%%%%%:  .*%%%%%%%%%%%%%%%%%%%%%#=-=*%%%%%%%%-                 +%%%%%%%%%%%%%%%%%%%%:             
               =%%%%%%%%%%%%%%%%%%%#  +%%%%%%%%%%%%%%%%%%%%%#.     .*%%%%%%-    .-:          :%%%%%%%%%%%%%%%%%%%-              
                +%%%%%%%%%%%%%%%%%%# .#%%%%%%%%+:-*%%%%%%%%%.       :%%%%%%=   +%%%%:        :%%%%%%%%%%%%%%%%%%*               
                .#%%%%%%%%%%%%%%%%%# .#%%%%%%%*   .%%%%%%%%#        .%%%%%%=  .#%%%%-        :%%%%%%%%%%%%%%%%%*                
`)

const tabletAscii = normalizeAscii(String.raw`

            :*%%%%%%%%%%%%%%%%%%%%%%%%-:*%%%%%%%%+ .#+    :*%%%%%%%%%%%%%%%%%%%%%%%+.           
           .+%%%%%%%%%%%%%%%%%%%%%%%%%--#%%%%%%%%+ :%*    :*%%%%%%%%%%%%%%%%%%%%%%%%+.          
          .=%%%%%%%%%%%%%%%%%%%%%%%%%%--#%%%%%%%#+ :#*    :*%%%%%%%%%%%%%%%%%%%%%%%%#-          
          -#%%%%%%%%%%%%%%%%%%%%%%%%%#--#%=.              :*%%%%%%%%%%%%%%%%%%%%%%%%%*:         
         .+%%%%%%%%%%%%%%%%%%%%%%%%+:..+%%=.                .=#%%%%%%%%%%%%%%%%%%%%%%%=.        
         -#%%%%%%%%%%%%%%%%%%%%%%%*:-#%%%%=.-#%+    .*%*-    .+%%%%%%%%%%%%%%%%%%%%%%%*:        
        .=%%%%%%%%%%%%%%%%%%%%%%%%*:+%%%%%=.=#%*    .#%#-    .+%%%%%%%%%%%%%%%%%%%%%%%%-        
        :*%%%%%%%%%%%%%%%%%%%%%%%%*:+%%%%%=.=#%*    .#%#-    .+%%%%%%%%%%%%%%%%%%%%%%%%=.       
        :#%%%%%%%%%%%%%%%%%%%%%%%%*:=*+=--. .:::::.  .::.    .+%%%%%%%%%%%%%%%%%%%%%%%%+.       
        :#%%%%%%%%%%%%%%%%%%%%%%#=:...-=+**#%%%%%%#.          :=*%%%%%%%%%%%%%%%%%%%%%%*:       
        :#%%%%%%%%%%%%%%%%%%%%#=..=*#%%%%%%%%%%%%%#.    .:.      -#%%%%%%%%%%%%%%%%%%%%*:       
        :*%%%%%%%%%%%%%%%%%%%%#-:*%%%%%*=+#%%%%%%%#.   :*%%=.    .*%%%%%%%%%%%%%%%%%%%%+.       
        .*%%%%%%%%%%%%%%%%%%%%#-:#%%%%#- :*%%%%%%%#.   :#%%+.    .*%%%%%%%%%%%%%%%%%%%%=.       
        .=%%%%%%%%%%%%%%%%%%%%#-:#%%%%#- :*%%%%%%%%:   -#%%+.    .*%%%%%%%%%%%%%%%%%%%%-        
         -#%%%%%%%%%%%%%%%%%%%#-:#%###*: .:::......    :+*#+.    .*%%%%%%%%%%%%%%%%%%%*:        
         .+%%%%%%%%%%%%%%%%%%%*: . ...:=+**#%%%%%%%%###+:        .*%%%%%%%%%%%%%%%%%%%=.        
          -#%%%%%%%%%%%%%%%#:  :+#%%%%%%%%%%%%%%%%%%%%%%+           .*%%%%%%%%%%%%%%%*:         
          .=%%%%%%%%%%%%%%#..*%%%%%%%%%%%%%%%#:...-%%%%%+             *%%%%%%%%%%%%%#-          
           .+%%%%%%%%%%%%%#.=%%%%%%*-+#%%%%%%:     -%%%%+  -##*:      +%%%%%%%%%%%%%=.          
            :*%%%%%%%%%%%%#.=%%%%%*: .+%%%%%#.     :%%%%+ .+%%#-      +%%%%%%%%%%%%+.           

`)

const phoneAscii = normalizeAscii(String.raw`

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

`)

const selectAscii = () => {
  if (typeof window === 'undefined') return desktopAscii
  if (window.matchMedia('(max-width: 640px)').matches) return phoneAscii
  if (window.matchMedia('(max-width: 1024px)').matches) return tabletAscii
  return desktopAscii
}

function App() {
  const [pushes, setPushes] = useState<Push[]>(fallbackPushes)
  const [asciiText, setAsciiText] = useState(selectAscii)

  useEffect(() => {
    const updateAscii = () => setAsciiText(selectAscii())
    updateAscii()
    window.addEventListener('resize', updateAscii)
    return () => window.removeEventListener('resize', updateAscii)
  }, [])

  useEffect(() => {
    const cleanup = initBabylonAsciiGlitch()
    return cleanup
  }, [asciiText])

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
          <h1>Autonomous onchain infrastructure</h1>
          <p>
            Babylon builds public tools, utility dApps, monitoring flows, and deployment surfaces for builders on Base.
          </p>
        </div>

        <div className="ascii-hero" aria-label="Babylon ASCII glitch art">
          <pre
            id="babylon-ascii"
            className="ascii-stage ascii-base"
            data-ascii-text={asciiText}
          >{asciiText}</pre>
          <pre
            id="babylon-ascii-glitch"
            className="ascii-stage ascii-glitch"
            aria-hidden="true"
          />
        </div>

        <div className="summary-strip" aria-label="Babylon focus areas">
          <span>Infra</span>
          <span>Tools</span>
          <span>Utility dApps</span>
          <span>Monitoring</span>
        </div>
      </section>

      <section className="roadmap-section" aria-label="Roadmap">
        <div className="section-title">
          <h2>Roadmap</h2>
          <p>We started by building tools that are critical for our own projects, then decided to make them public so the wider agentic builder ecosystem can benefit too.</p>
        </div>

        <div className="roadmap-grid">
          <article className="glass-panel">
            <span>Factory</span>
            <h3>Babylon is the main factory for onchain games, tools, dApps, and deployment surfaces.</h3>
          </article>
          <article className="glass-panel">
            <span>Public goods</span>
            <h3>Tools built first for ourselves become public interfaces, SDKs, and APIs when they can help other builders.</h3>
          </article>
          <article className="glass-panel">
            <span>Builder agents</span>
            <h3>Next, Babylon expands toward a small, effective team of builder agents using current frontier LLM systems.</h3>
          </article>
        </div>
      </section>

      <section className="resource-section" aria-label="Builder links">
        <div className="section-title compact">
          <h2>Builder links</h2>
          <a href="https://github.com/babylonagent" target="_blank" rel="noreferrer">All repos <ArrowUpRight size={14} /></a>
        </div>
        <div className="resource-grid">
          <a className="resource-link" href="https://docs.base.org/ai-agents/quickstart" target="_blank" rel="noreferrer">
            <span>MCP</span><strong>Base MCP quickstart</strong><ArrowUpRight size={14} />
          </a>
          <a className="resource-link" href="https://github.com/babylonagent/babylon-shield/tree/main/packages/sdk" target="_blank" rel="noreferrer">
            <span>SDK</span><strong>Babylon Shield SDK</strong><ArrowUpRight size={14} />
          </a>
          <a className="resource-link" href="https://github.com/babylonagent/babylon-shield" target="_blank" rel="noreferrer">
            <span>API</span><strong>Shield API + examples</strong><ArrowUpRight size={14} />
          </a>
          <div className="resource-link muted">
            <span>NPM</span><strong>Package publish pending</strong>
          </div>
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
