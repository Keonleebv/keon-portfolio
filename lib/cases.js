export const CASES = {
  weekflow: {
    kicker: "Weekflow / Case Study",
    title: "I got tired of fighting Notion, so I built my own planner",
    dek: "A time-blocking planner with an attached journal. Real cross-device sync, real Google Calendar integration, verified with real browser tests, not just reasoning about it.",
    liveUrl: "https://weekflow-delta.vercel.app",
    meta: [
      ["Role","Solo builder, product + engineering"],
      ["Stack","Vite, React 19, TypeScript, Supabase, Google OAuth, Claude API"],
      ["Stage","Live &middot; multi-device, real auth"]
    ],
    tldr: [
      "A time-blocking planner with a built-in journal, closing the exact gap Notion and Google Calendar both miss: plan the week, then reflect on how it actually went, with real AI summaries throughout",
      "Rebuilt the core data model around real calendar dates instead of a fake week, one decision that made recurring blocks, task carryover, and real streaks possible together",
      "Added real cross-device sync and a live Google Calendar overlay, verified with real browser tests that caught three genuine bugs before they ever shipped"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">Overview</div>
        <p class="cs-body">Weekflow is a time-blocking planner with an attached journal: plan your week, then reflect against the blocks you actually worked, with real AI summaries underneath. I built it because Notion and Google Calendar each solve half the problem. Notion can track categories and time but takes constant rebuilding to see anything useful. Google Calendar is fast but has no concept of a goal or a reflection. Neither closes the loop between planning time and reflecting on it.</p>
        <p class="cs-body">This case study covers the product calls underneath it: the data model that made recurrence and carryover simple instead of hard, and the sync and testing work that made it trustworthy across devices. I scoped it to do that one loop well rather than keep expanding it, a finished product beats an over-engineered one.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">The decision that mattered more than any feature</div>
        <p class="cs-body">Two competing mockups, a dense 7-day grid and a single-day focused view, got merged into one app with a Week/Day toggle instead of shipping as two separate products. That was the easy call. The harder one was underneath: blocks originally lived at a fake day-index instead of a real date, which worked for a demo and broke the moment I needed an actual "next week."</p>
        <div class="callout">Rebuilding around real ISO calendar dates is the single change that made recurring blocks, task carryover, and real cross-week streaks possible. Before that, each of those three was its own hard problem. After it, none of them were, they all fell out of the same fix.</div>
        <p class="cs-body">That's the kind of call I'd want an APM to be able to explain: not "I added recurrence," but "I found the one underlying model that made three separate features cheap at once."</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Reflection was a bet, not an obvious feature</div>
        <p class="cs-body">Time-blocking tells you what you planned. It says nothing about whether it worked. Adding a Journal was a bet that reflection mattered as much as scheduling, so I tested two versions live instead of assuming: per-block notes, or one open freeform page for the day. A few weeks of actually using both settled it. The per-block version already had a reflection box, which made the freeform version redundant. I cut it rather than keep two options out of indecision.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Making it trustworthy enough to actually rely on</div>
        <p class="cs-body">A planner that only works in one browser isn't a real tool, so I added cross-device sync: real auth, Row Level Security so a public client key can't leak another user's data, and live updates so a change on one device shows up on another without a refresh. Google Calendar overlays in, read-only, on purpose, since a planner should never be able to silently rewrite your actual calendar.</p>
        <div class="callout">Instead of assuming any of that worked, I ran real headless browser tests against it. That caught a cascading delete bug, a session-handling bug that could've wiped a real user's local data, and a cross-account data leak, all before any of them shipped.</div>
        <p class="cs-body">That's the part I'd want a PM manager to notice: the willingness to go verify instead of reason your way to "it's probably fine."</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Key decisions</div>
        <table class="cs-table">
          <tr><th>Decision</th><th>Why</th></tr>
          <tr><td>ISO-date model over a fake week</td><td>The single change that unlocked recurrence, carryover, and cross-week streaks at once.</td></tr>
          <tr><td>One JSONB row per user, not normalized tables</td><td>The right complexity for a single-user document; Row Level Security makes the public anon key safe.</td></tr>
          <tr><td>Most-recently-edited-wins conflict resolution</td><td>Simple and predictable for a personal tool, with the clock-skew risk stated openly rather than hidden.</td></tr>
          <tr><td>Google Calendar is read-only and never stored</td><td>Preserves the read-only guarantee in spirit, not just at the API call.</td></tr>
          <tr><td>Deliberately simple overlap layout</td><td>No per-time-slice width reclamation, verified against edge cases instead of hand-waved.</td></tr>
          <tr><td>AI summary is a real server-side Claude call</td><td>A feature labeled AI-powered should be AI-powered, not a placeholder.</td></tr>
        </table>
      </div>

      <div class="cs-section">
        <div class="cs-h">What competitors get wrong</div>
        <table class="cs-table">
          <tr><th>Tool</th><th>Model</th><th>Reflection</th></tr>
          <tr><td>Reclaim.ai</td><td>AI auto-schedules into calendar gaps</td><td>None</td></tr>
          <tr><td>Sunsama</td><td>Guided manual planning ritual</td><td>Time tracking, not qualitative</td></tr>
          <tr><td>Motion</td><td>AI scheduler + full PM suite</td><td>None</td></tr>
          <tr><td>Akiflow</td><td>Aggregates 20+ tools, keyboard-first</td><td>None</td></tr>
          <tr><td>Obsidian + Day Planner</td><td>Manual, markdown, DIY plugins</td><td>Strong, but a 4&ndash;5 plugin stack to get there</td></tr>
        </table>
        <p class="cs-body">None of them tie a specific time block to a written reflection. Obsidian gets closest, but only if you're willing to become your own systems integrator across several plugins, the exact complexity Weekflow exists to remove.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where I land on it</div>
        <div class="metric-strip">
          <div class="metric"><div class="num">N=1</div><div class="lab">Real user right now, stated plainly</div></div>
          <div class="metric"><div class="num">3</div><div class="lab">Real bugs caught by actual testing, not review</div></div>
        </div>
        <p class="cs-body">My take: the reflection loop is the real differentiator here, not the scheduling. Anyone can build a calendar. Almost nobody ships "did this time actually work" as a first-class feature next to it, and that's exactly the gap I built into. The signal behind that bet: months of my own frustration with Notion, and Sunsama proving people will pay $20+/mo with zero free tier since 2022 for a lighter version of this same idea.</p>
        <p class="cs-body">It's currently a one-user tool. The next step is real: put it in front of actual users and watch where they get stuck, not add more features on a hunch.</p>
      </div>
    `
  },
  coddle: {
    kicker: "Coddle / Case Study",
    title: "What's in your fridge, cooked tonight",
    dek: "An iOS app that turns the ingredients you already have into AI-generated recipes, then walks you through cooking them. Co-founded with Eddi. Closed beta, pending Apple review.",
    liveUrl: "https://www.coddle.app",
    meta: [
      ["Role","Co-founder &middot; frontend, onboarding, recipe-gen UI"],
      ["Stack","Expo/RN, Express + Postgres, Claude Haiku + Sonnet vision"],
      ["Stage","Pre-launch &middot; 0 external users"]
    ],
    tldr: [
      "An iOS app that turns what's already in your kitchen into AI-generated recipes, then guides you through cooking one: scan your fridge, generate three recipes that fit it, cook with guided steps and timers",
      "An earlier version already reached 15 testers and generated 200+ recipes, real proof of demand this current, more robust rebuild is building on top of",
      "Split AI models by job on purpose: a cheap model handles every recipe generation, a vision model is reserved only for the paid fridge scan, to control cost per user before there's a dollar of revenue"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">Overview</div>
        <p class="cs-body">Coddle is an iOS app that turns what's already in your kitchen into AI-generated recipes, then guides you through cooking one: scan or type your inventory, generate three recipes that fit it, cook with guided steps and timers. The product bet: most recipe apps make you pick a dish first and shop second, and inverting that, starting from what you already have, closes real friction that generic tools like ChatGPT don't solve on their own.</p>
        <div class="funnel">
          <div class="funnel-row"><div class="funnel-label">Scan or add your kitchen</div><div class="funnel-track"><div class="funnel-fill" style="width:100%"></div></div><div class="funnel-pct">Step 1</div></div>
          <div class="funnel-row"><div class="funnel-label">Generate 3 recipes</div><div class="funnel-track"><div class="funnel-fill" style="width:78%"></div></div><div class="funnel-pct">Step 2</div></div>
          <div class="funnel-row"><div class="funnel-label">Guided cooking</div><div class="funnel-track"><div class="funnel-fill" style="width:56%"></div></div><div class="funnel-pct">Step 3</div></div>
          <div class="funnel-row"><div class="funnel-label">Saved to your cookbook</div><div class="funnel-track"><div class="funnel-fill" style="width:34%"></div></div><div class="funnel-pct">Step 4</div></div>
        </div>
        <div class="funnel-note">Illustrates the app's actual flow, not usage data, there are zero external users on this build yet.</div>
        <p class="cs-body">This case study covers the product calls underneath it: how I split AI models to control cost before there's any revenue, what testing before launch already caught, and the core product thesis I'm building toward.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where it actually is, precisely</div>
        <p class="cs-body">Build 5 is in Apple's review. A 27-person waitlist is ready to import. External users on this build: zero. An earlier, simpler pre-rebrand version did reach about 15 testers and generate 200+ recipes, real usage signal, from a different, earlier app. I'm keeping those two facts apart rather than letting the earlier traction blur into the current build's status.</p>
        <div class="metric-strip">
          <div class="metric"><div class="num">0</div><div class="lab">External users, current build</div></div>
          <div class="metric"><div class="num">15</div><div class="lab">Testers, earlier pre-rebrand version</div></div>
          <div class="metric"><div class="num">200+</div><div class="lab">Recipes generated in that earlier phase</div></div>
          <div class="metric"><div class="num">27</div><div class="lab">Waitlist ready to import</div></div>
        </div>
      </div>

      <div class="cs-section">
        <div class="cs-h">How it's built</div>
        <table class="cs-table">
          <tr><th>Layer</th><th>Details</th></tr>
          <tr><td>App</td><td>Expo 54, React Native 0.81.5, React 19, Firebase Auth with a hard email-verification gate</td></tr>
          <tr><td>Backend</td><td>Express 5 + PostgreSQL 16 on Render, Firebase Admin verifies tokens</td></tr>
          <tr><td>AI</td><td>Claude Haiku 4.5 for generation (cost and latency), Claude Sonnet 4.6 for the fridge/receipt vision scan, model IDs are DB-driven, not hardcoded</td></tr>
          <tr><td>Analytics</td><td>PostHog (EU), full event funnel plus session replay with text and images masked, verified end to end</td></tr>
          <tr><td>Ship</td><td>EAS Build and Submit to TestFlight, EAS Update configured for JS-only fixes</td></tr>
          <tr><td>Dev tools</td><td>Claude Code as the primary driver, Cursor, Claude API with MCP</td></tr>
        </table>
      </div>

      <div class="cs-section">
        <div class="cs-h">Key decisions</div>
        <table class="cs-table">
          <tr><th>Decision</th><th>Why it mattered</th></tr>
          <tr><td>Generate-first, not inventory-first</td><td>Users said they wanted pantry tracking, but usage didn't back it up. Flipped the model so ingredients are entered at generation time, and saving to Kitchen became a byproduct instead of a prerequisite.</td></tr>
          <tr><td>Onboarding cut from 5 steps to 2</td><td>Kept only Dietary and Skill upfront, deferring Cook Time, Kitchenware, and Cuisine to profile settings. Trimming the distance between opening the app and getting a recipe to improve time to value.</td></tr>
          <tr><td>Two generation paths: by-ingredients vs. by-meal</td><td>Some users have food on hand and want ideas; others crave a specific dish with nothing prepped. Built separate entry points instead of forcing everyone through one flow.</td></tr>
          <tr><td>Per-recipe streaming over atomic buffering</td><td>Recipes were buffered and released together to avoid partial DB rows if generation cut short. Reversed that to stream each recipe the moment it parses, cutting time-to-first-recipe from ~24s to ~8s, accepting the partial-state risk back in exchange for speed.</td></tr>
          <tr><td>prompt_versions as core infrastructure</td><td>Prompt text, temperature, and model choice live in a database table, not hardcoded. Lets A/B tests run on live traffic without a code deploy.</td></tr>
          <tr><td>Model split by job: Haiku for generation, Sonnet for vision</td><td>Recipe generation doesn't need frontier-level reasoning, so it runs on the cheap, fast model. Sonnet is reserved for the paid vision scan, where accuracy matters more than speed.</td></tr>
        </table>
      </div>

      <div class="cs-section">
        <div class="cs-h">What testing before launch already caught</div>
        <p class="cs-body">No external beta feedback exists yet, the 27 haven't been let in. But founder testing on the real build already surfaced real problems: a returning user could get permanently trapped in onboarding with no way out, and a confirmation dialog once rendered with blank, unusable buttons. Both caught and fixed before anyone outside the founders saw them, exactly the value of testing the build for real before importing a waitlist, not after.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where I land on it</div>
        <p class="cs-body">The core product bet: inventory, generation, and guided cooking as one loop is worth more together than any piece on its own, since recipe apps, pantry trackers, and ChatGPT alone each solve part of this but none close the full loop today. That's the thesis, and the real test is putting it in front of the waitlist.</p>
        <p class="cs-body">On the business side, I'm treating unit economics as a day-one constraint: every generation is a paid API call, so the first cohort is capped small on purpose while pricing gets figured out properly instead of guessed at.</p>
      </div>
    `
  },

  hootsuite: {
    kicker: "Hootsuite / Work",
    title: "Finding the 40% of drop-off nobody could see",
    dek: "A stalled beta, no visibility into why. The measurement framework that surfaced it, and what came after.",
    meta: [
      ["Role","PM Intern, Teams &amp; Orgs Beta, Jan&ndash;Apr 2026"],
      ["Stack","Mixpanel, FullStory, Confluence, SQL"],
      ["Scope","3 cross-functional teams, enterprise + SMB + core-plan"]
    ],
    tldr: [
      "Built a Mixpanel framework across 7 funnels and 15+ conversion events, and it surfaced that 40% of user drop-offs were going completely untracked",
      "Add-member conversion moved from roughly 16% to 34% once the untracked gap was closed and the team could actually see where people fell off",
      "The framework outlived the internship. It's still the identity team's instrumentation today"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">The state I walked into</div>
        <p class="cs-body">The Teams &amp; Orgs beta had stalled. Not failed outright, just stuck: activation numbers were flat, the team had theories about why, and no way to confirm any of them. Bug tickets were piling up across enterprise, SMB, and core-plan customers with no shared way to tell which ones actually mattered to the funnel versus which were noise.</p>
        <p class="cs-body">That's an ambiguous starting point on purpose. Nobody had said "build an instrumentation framework." The brief was closer to "figure out why this beta isn't moving," and the framework was the thing I decided the problem actually needed.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Building the instrumentation</div>
        <p class="cs-body">I mapped the beta into 7 Mixpanel funnels covering 15+ conversion events, from first beta invite through team creation, member invites, and activation. The goal wasn't to track everything. It was to track the specific handoffs where a user could plausibly drop off and nobody would know.</p>
        <div class="callout">That's where it got interesting: once the funnels were live, they showed that 40% of drop-offs weren't failing at a step we were watching. They were failing at steps we weren't watching at all.</div>
        <p class="cs-body">Below is an illustrative reconstruction of that funnel shape, not an export of the actual Hootsuite dashboard. The real, confirmed numbers are the 40% untracked figure and the 16% to 34% conversion move stated throughout this page.</p>
        <div class="funnel">
          <div class="funnel-row"><div class="funnel-label">Beta invite received</div><div class="funnel-track"><div class="funnel-fill" style="width:100%"></div></div><div class="funnel-pct">100%</div></div>
          <div class="funnel-row"><div class="funnel-label">Team created</div><div class="funnel-track"><div class="funnel-fill" style="width:74%"></div></div><div class="funnel-pct">74%</div></div>
          <div class="funnel-row"><div class="funnel-label">First member invited</div><div class="funnel-track"><div class="funnel-fill" style="width:52%"></div></div><div class="funnel-pct">52%</div></div>
          <div class="funnel-row"><div class="funnel-label">Member accepted invite</div><div class="funnel-track"><div class="funnel-fill" style="width:34%"></div></div><div class="funnel-pct">34%</div></div>
        </div>
        <div class="funnel-note">Illustrative shape only. Stage names and percentages are a representative reconstruction of the process, not real Hootsuite data.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Combining quant with qual</div>
        <p class="cs-body">The funnels showed where people dropped off. They didn't show why. For that I went into FullStory session replays on the steps with the worst fall-off, watching actual users hit team-creation failures and confusing invite flows. That's where the qualitative side turned into concrete UX fixes rather than a list of numbers nobody could act on.</p>
        <p class="cs-body">I triaged 20+ bug tickets against this view, prioritizing the ones that mapped to real funnel drop-off over ones that were just loud. Team creation failures and high-bounce steps that directly hit activation got fixed first.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Talking to CSMs, sourcing beta candidates</div>
        <p class="cs-body">Instrumentation only matters if it feeds decisions people actually act on. I worked with Customer Success to identify and source the next round of beta candidates directly from the funnel data, and coordinated client enablement so CSMs knew what to expect when new customers hit the beta. That loop, data to CSM conversation to next cohort, is what turned a dashboard into an actual go/no-go tool for the beta.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where it landed, and what came with it</div>
        <p class="cs-body">Add-member conversion moved from roughly 16% to 34% once the previously invisible 40% was addressed. Alongside the funnel work, I led Launch Readiness for two enterprise compliance features, SCIM identity management and Data Retention, across 3 stakeholder groups, shipping both to live customers. Data Retention was work I owned end to end; SCIM was more shadow-and-learn, and I'd rather say that plainly than claim equal ownership of both.</p>
        <p class="cs-body">I also navigated real pushback from CSMs on the data retention requirements without compromising the compliance bar, which is its own small case study in influence without authority.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Still open</div>
        <p class="cs-body">The framework is still in use by the identity team today, which is the actual measure of whether this held up past the internship. What I don't have visibility into anymore: whether the 40% untracked figure has moved further since, since that data lives inside Hootsuite now, not with me.</p>
      </div>
    `
  },

  ea: {
    kicker: "Electronic Arts / Work",
    title: "Two projects, one internship: acquisition and checkout",
    dek: "Battlefield's top-of-funnel acquisition, and a separate, webstore-wide project on the path to checkout. Different scope, different funnels, same internship.",
    meta: [
      ["Role","PM Intern, EAX, May&ndash;Aug 2025"],
      ["Stack","SQL, Looker, A/B testing, PRDs"],
      ["Scope","Project 1: Battlefield. Project 2: full EA webstore"]
    ],
    tldr: [
      "Project 1, Battlefield-specific: beat the sign-in North Star by 7 percentage points through competitive analysis and a Marketing partnership on acquisition",
      "Project 2, across the whole EA webstore, not just Battlefield: SQL and Looker analysis surfaced a mobile conversion gap that became next quarter's roadmap input",
      "Same webstore-wide project: found checkout friction and A/B tested fixes against it, capturing a 10% increase in checkout revenue"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">Two different projects, worth keeping separate</div>
        <p class="cs-body">These were two distinct workstreams during the internship, not one continuous funnel. Project 1 was scoped specifically to the Battlefield Webstore: getting more people to sign in. Project 2 was scoped across the entire EA webstore, not just Battlefield: the full path from a user landing on any EA storefront through to a completed purchase. Different products, different funnels, different teams. I'm keeping them separate here because collapsing them into one story would overstate how connected they actually were.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Project 1: Battlefield acquisition</div>
        <p class="cs-body">The brief was top-of-funnel, specifically for the Battlefield Webstore: get more people from landing to signed in. I ran competitive analysis across comparable webstores, mapped the Battlefield user journey from landing to sign-in, and partnered with Marketing to use EA's existing web presence as an acquisition channel instead of paying for net-new traffic. That combination got sign-in rate 7 percentage points above the North Star target.</p>
        <div class="funnel">
          <div class="funnel-row"><div class="funnel-label">North Star target</div><div class="funnel-track"><div class="funnel-fill" style="width:70%"></div></div></div>
          <div class="funnel-row"><div class="funnel-label">Actual sign-in rate</div><div class="funnel-track"><div class="funnel-fill" style="width:100%"></div></div></div>
        </div>
        <div class="funnel-note">Relative comparison only, not to scale with real values. The confirmed result is 7 percentage points above North Star.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Project 2: the webstore-wide path to checkout</div>
        <p class="cs-body">This one wasn't Battlefield-specific. The scope was the full EA webstore: a user landing on any storefront, all the way through to a completed purchase, across mobile and desktop. Pulling SQL and Looker data against industry benchmarks and adjacent epics surfaced a conversion gap specifically on mobile. That gap became the business case for a mobile optimization workstream and fed directly into next quarter's roadmap and a prioritized backlog.</p>
        <p class="cs-body">The highest-leverage part of this project was at checkout. End-to-end user journey analysis across mobile and desktop surfaced specific friction points at the final step. A/B testing fast-checkout options and improved autofill against those friction points captured a 10% increase in checkout revenue.</p>
        <div class="funnel-note">Exact percentage for the mobile conversion gap withheld to keep EA's internal metrics private. The confirmed number is the 10% increase in checkout revenue captured.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Keeping eight teams aligned</div>
        <p class="cs-body">The checkout and API performance decisions didn't sit inside one team. Staying aligned meant working directly across engineering, QA, design, data, marketing, and leadership, not just handing off a PRD and waiting. Here's who that touched.</p>
        <svg viewBox="0 0 800 560" xmlns="http://www.w3.org/2000/svg" role="img" style="width:100%;height:auto;max-width:640px;display:block;margin:0 auto;">
          <title>A hub-and-spoke diagram: me at the centre, connected directly to eight teams, the EAX and EADP development teams, QA, Product Managers, Product Designers, Data Analysts, the Battlefield Marketing team, and the Leadership team.</title>
          <line x1="400" y1="280" x2="400" y2="80" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="541.4" y2="138.6" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="600" y2="280" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="541.4" y2="421.4" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="400" y2="480" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="258.6" y2="421.4" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="200" y2="280" stroke="var(--line)" stroke-width="1.5"/>
          <line x1="400" y1="280" x2="258.6" y2="138.6" stroke="var(--line)" stroke-width="1.5"/>

          <circle cx="400" cy="80" r="8" fill="var(--brass)"/>
          <circle cx="541.4" cy="138.6" r="8" fill="var(--brass)"/>
          <circle cx="600" cy="280" r="8" fill="var(--brass)"/>
          <circle cx="541.4" cy="421.4" r="8" fill="var(--brass)"/>
          <circle cx="400" cy="480" r="8" fill="var(--brass)"/>
          <circle cx="258.6" cy="421.4" r="8" fill="var(--brass)"/>
          <circle cx="200" cy="280" r="8" fill="var(--brass)"/>
          <circle cx="258.6" cy="138.6" r="8" fill="var(--brass)"/>

          <circle cx="400" cy="280" r="40" fill="var(--ink)"/>

          <text x="400" y="60" text-anchor="middle" font-size="14" fill="var(--ink-soft)">EAX Development Team</text>
          <text x="555" y="130" text-anchor="start" font-size="14" fill="var(--ink-soft)">EADP Development Team</text>
          <text x="614" y="285" text-anchor="start" font-size="14" fill="var(--ink-soft)">QA</text>
          <text x="555" y="439" text-anchor="start" font-size="14" fill="var(--ink-soft)">Product Managers</text>
          <text x="400" y="502" text-anchor="middle" font-size="14" fill="var(--ink-soft)">Leadership Team</text>
          <text x="245" y="439" text-anchor="end" font-size="14" fill="var(--ink-soft)">Marketing Team (Battlefield)</text>
          <text x="186" y="285" text-anchor="end" font-size="14" fill="var(--ink-soft)">Product Designers</text>
          <text x="245" y="130" text-anchor="end" font-size="14" fill="var(--ink-soft)">Data Analysts</text>

          <text x="400" y="285" text-anchor="middle" font-size="13" fill="var(--card)">Me (Keon)</text>
        </svg>
        <div class="funnel-note">PM Intern, EAX. Working relationship, not an org chart, lines show who I coordinated with directly, not reporting lines.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Still open</div>
        <p class="cs-body">The mobile optimization roadmap Project 2 fed into extends past the internship, so I don't have visibility into how those next-quarter initiatives landed. What's confirmed and stated here is the internship-window impact on both projects: the Battlefield sign-in result 7 percentage points above North Star, the mobile gap identified, and the 10% increase in checkout revenue captured.</p>
      </div>
    `
  }
};
