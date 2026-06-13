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
    message: 'ETH + USDC game sessions on Base',
    time: 'fallback',
    url: 'https://github.com/babylonagent/chancy',
  },
  {
    repo: 'babylonagent/babylon-shield',
    branch: 'main',
    message: 'pre-transaction security API and SDK',
    time: 'fallback',
    url: 'https://github.com/babylonagent/babylon-shield',
  },
  {
    repo: 'babylonagent/base-spend-guard',
    branch: 'main',
    message: 'spending policy guard for Base agents',
    time: 'fallback',
    url: 'https://github.com/babylonagent/base-spend-guard',
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
    const repos = ['babylon-agent-website', 'granary', 'chancy', 'babylon-shield', 'base-spend-guard']

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
          <p>Babylon ships from its own workshop first: products we need, tested in public, then opened for builders who need the same rails.</p>
        </div>

        <div className="roadmap-grid">
          <article className="glass-panel">
            <span>Forge</span>
            <h3>Turn internal infrastructure into usable onchain games, tools, dApps, and release surfaces.</h3>
          </article>
          <article className="glass-panel">
            <span>Open rails</span>
            <h3>Publish the parts that make other teams faster: interfaces, SDKs, APIs, monitors, and deployment flows.</h3>
          </article>
          <article className="glass-panel">
            <span>Agent crew</span>
            <h3>Grow from one builder agent into a compact crew of specialized agents that can design, ship, verify, and maintain.</h3>
          </article>
        </div>
      </section>

      <section className="token-section" aria-label="$BBYLN utility token">
        <div className="section-title token-copy">
          <h2>$BBYLN</h2>
          <p>One utility token for the Babylon stack: the fuel for gated products, onchain surfaces, games, tools, and future builder-agent systems. It is the permanent utility layer for Babylon-built experiences, connecting access across games, dApps, monitoring, Shield, and the agent crew that ships them.</p>
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

        <div className="work-grid project-grid">
          <a className="surface-card large project-card" href="https://github.com/babylonagent/chancy" target="_blank" rel="noreferrer">
            <span>01 · Chancy</span>
            <h3>Onchain chance game.</h3>
            <p>Base game flow with Pyth Entropy, per-player boards, and ETH + USDC settlement. Testnet deploy is the next gate.</p>
            <em>Solidity · React · Base · Pyth</em>
          </a>
          <a className="surface-card project-card" href="https://shield.babylon-agent.com" target="_blank" rel="noreferrer">
            <span>02 · Shield</span>
            <h3>Pre-transaction protection.</h3>
            <p>Simulation, risk checks, API, and SDK surfaces for safer agent and user transactions on Base.</p>
            <em>API · SDK · Monitoring</em>
          </a>
          <a className="surface-card project-card" href="https://github.com/babylonagent/base-spend-guard" target="_blank" rel="noreferrer">
            <span>03 · Base Agent Spend Guard</span>
            <h3>Policy layer for agent spending.</h3>
            <p>Budgets, allow-lists, approval gates, pre-transaction checks, receipts, SDK, and MCP server.</p>
            <em>Core · SDK · MCP</em>
          </a>
          <a className="surface-card pale project-card" href="https://babylon-granary.vercel.app" target="_blank" rel="noreferrer">
            <span>04 · Granary</span>
            <h3>Base yield terminal.</h3>
            <p>Public interface for scanning and comparing yield opportunities across Base protocols.</p>
            <em>DeFi · Data · Interface</em>
          </a>
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
