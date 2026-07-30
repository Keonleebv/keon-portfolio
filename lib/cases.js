export const CASES = {
  weekflow: {
    kicker: "Weekflow / Case Study",
    title: "I got tired of fighting Notion, so I built my own planner",
    dek: "A time-blocking planner with an attached journal. Real cross-device sync, real Google Calendar integration, verified with real browser tests, not just reasoning about it.",
    meta: [
      ["Role","Solo builder, product + engineering"],
      ["Stack","Vite, React 19, TypeScript, Supabase, Google OAuth, Claude API"],
      ["Stage","Live &middot; multi-device, real auth"]
    ],
    tldr: [
      "Everything is keyed by real ISO calendar dates instead of a fake day-index. That one decision is what unlocked recurring blocks, task carryover, and real cross-week streaks",
      "Added cross-device sync (Supabase, Google OAuth, Row Level Security) and a live Google Calendar overlay without rewriting a single existing component",
      "Verified with real headless-browser tests, not just reasoning about it. That caught actual bugs: a cascading delete, a session bug that could've wiped an anonymous user's data, and a cross-account data leak"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">The gap</div>
        <p class="cs-body">For months my week lived in three places. A Notion database I kept redesigning instead of using. A Google Calendar that told me when something was happening but nothing about why. And a mental tally of whether I was actually spending time on what mattered.</p>
        <p class="cs-body">Notion could technically do all of this. That was the problem. Seeing "how much time did I put into Resume &amp; Career this week" meant rebuilding a relation and two rollups every time. Google Calendar was the opposite failure: fast, but no concept of a category, a goal, or what any of it meant once the week was over.</p>
        <div class="callout">So I built Weekflow. Not as a portfolio piece first. As a tool I was going to open every day.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Two directions, on purpose</div>
        <p class="cs-body">I started with two competing mockups: a dense 7-day grid, and a single-day focused timeline, deliberately different enough that combining them would be a real decision. The trap was shipping both as separate products just because they were designed separately. I merged them into one app with a Week/Day toggle. Same data underneath, two views on top.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">The architecture that made everything else possible</div>
        <p class="cs-body">Early on, every block lived at a 0&ndash;6 index into a single fake week. That worked for a demo and broke the moment I needed a real "next week." The fix was rebuilding the data model around real ISO calendar dates instead of a day-index, migrated once from the old model with no data loss.</p>
        <div class="callout">That single change is what unlocked recurring blocks, task carryover, and real cross-week streaks. None of the three were separately hard once the dates were real.</div>
        <p class="cs-body">Recurrence is generated lazily, one occurrence at a time, never speculatively. Navigating to a week checks each active series and creates at most one occurrence if the slot isn't already occupied, which stops future weeks from silently filling up with blocks nobody confirmed. Editing the instance that drives the series updates future occurrences; editing an already-generated instance stays isolated to that one, surfaced with an inline note so the effect is never silent.</p>
        <p class="cs-body">Task carryover works the same way for the same reason: a task's date lives independently of which block it's attached to, so an unfinished task under a biweekly block is overdue tomorrow, not in two weeks.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Adding the missing half: reflection</div>
        <p class="cs-body">Time-blocking tells you what you planned. It says nothing about whether it worked. So I built a Journal. Its own page, not a bolted-on tab. I tested two writing styles live instead of guessing: per-block notes ("By Block") versus one open page for the day ("Freeform"). A few weeks in, the answer was obvious. "By Block" already includes an overall reflection box, which makes "Freeform" redundant. I cut it.</p>
        <p class="cs-body">The Journal also has a mood tag, a streak that counts real consecutive calendar days across week and month boundaries, and an AI-generated summary through a real server-side Claude call, cached per entry and invalidated by a content hash, not a client-side fake.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">From one browser to every device</div>
        <p class="cs-body">All state used to live in localStorage, per browser, per device. My laptop and desktop each had their own copy with no shared source of truth. The fix was Supabase: real auth (Google one-tap and email/password), and one Postgres table holding a single JSONB row per user. The whole planner state serializes into that row. Simple, and a fair fit for what is fundamentally a single-user document.</p>
        <p class="cs-body">Row Level Security is what makes shipping a public anon key in the client safe: a user can only ever read or write their own row. A Realtime subscription means a change on the laptop shows up on the desktop live, no refresh. Conflict resolution is most-recently-edited-wins, each device tracks its own last-edit timestamp and compares against the cloud row on login. It's clock-based, so I'll say plainly it's vulnerable to real device clock skew, a server-arbitrated timestamp would be the bulletproof version.</p>
        <div class="callout">The storage layer is fully isolated from the rest of the app, so adding sync never meant rewriting a single existing component.</div>
        <p class="cs-body">The subtlest bug in the whole sync layer: Supabase fires an "initial session" event with a null session on every logged-out page load. Treating that as a sign-out would wipe a genuine anonymous user's local data the moment they opened the app. Caught before it shipped, but it's exactly the kind of bug that only shows up if you actually test the logged-out path, not just the happy one.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Google Calendar, read-only by design</div>
        <p class="cs-body">Weekflow pulls your invites in to sit next to your own blocks. It never writes to your calendar, a deliberate scope decision, not an oversight. Events render directly on the day and week grid using the same pixel-per-minute math as native blocks, visually distinct with a dashed border, and are never persisted as stored blocks, so they can never silently drift from the real calendar.</p>
        <p class="cs-body">Signing in with Google requests the calendar scope in the same OAuth handshake, so the calendar connects in one step for Google users, no second popup. The connection follows the signed-in account and disconnects on sign-out. The token lives in sessionStorage, cleared when the tab closes, never at rest in localStorage.</p>
        <p class="cs-body">Known limitation, accepted rather than hidden: Google access tokens last about an hour and there's no client-side refresh token, so reconnecting after expiry is one deliberate click. A fully silent, permanent reconnection would need a server-side refresh-token flow, consciously left out as disproportionate for a single-user tool.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">The overlap problem nobody notices until it's ugly</div>
        <p class="cs-body">Overlapping items used to render full-width, stacked on top of each other and unreadable the moment a native block collided with a Google event. The fix: any conflicting items, native-to-native, native-to-Google, Google-to-Google, cluster into transitively-connected groups and split into side-by-side columns through one shared algorithm.</p>
        <p class="cs-body">It's a deliberately simple version. An item chained to a conflict elsewhere stays narrower for its whole span, rather than reclaiming width per time-slice, a stated tradeoff, not an oversight. The algorithm was ported as a pure function and checked against all six documented edge cases, identical, nested, back-to-back, staggered, three-way, live-add, before it ever touched the UI.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Hardening the one endpoint that costs money</div>
        <p class="cs-body">Almost the entire app is a static site with local persistence. The only surface that costs money or can be abused is the AI summary endpoint, so it's the one place I actually hardened: server-side-only secrets, an Origin allowlist, an 8,000-character input cap, a 512-token output cap, generic error responses that leak no internal detail, and a prompt-injection guard in the system prompt itself.</p>
        <p class="cs-body">Rate limiting is per-IP and app-wide, durable across serverless instances via Upstash Redis when configured, with an in-memory fallback otherwise. The backstop underneath all of it is a documented monthly spend cap on the Anthropic account, the ceiling that code alone can't provide.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Testing it for real, not just reasoning about it</div>
        <p class="cs-body">The overlap algorithm was verified in isolation as a plain function before it touched any UI. Everything else was checked with real headless Playwright runs, seeded state, real clicks and drags, DOM and geometry assertions, rather than me reasoning about whether the behavior was probably right.</p>
        <div class="callout">That caught real bugs: deleting a block was cascade-deleting its linked carried-over tasks instead of just unlinking them, the null-session bug above, and a cross-account data isolation gap where one account could see traces of another's data.</div>
        <p class="cs-body">Before calling any of this a portfolio piece, I ran a full QA pass across recurrence, carryover, the weekly review, journal, onboarding, mobile, export, and overflow, every scenario actually run, not sampled, with what broke and how it got fixed logged plainly rather than smoothed over.</p>
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
        <div class="cs-h">What competitors actually showed me</div>
        <table class="cs-table">
          <tr><th>Tool</th><th>Model</th><th>Reflection</th></tr>
          <tr><td>Reclaim.ai</td><td>AI auto-schedules into calendar gaps</td><td>None</td></tr>
          <tr><td>Sunsama</td><td>Guided manual planning ritual</td><td>Time tracking, not qualitative</td></tr>
          <tr><td>Motion</td><td>AI scheduler + full PM suite</td><td>None</td></tr>
          <tr><td>Akiflow</td><td>Aggregates 20+ tools, keyboard-first</td><td>None</td></tr>
          <tr><td>Obsidian + Day Planner</td><td>Manual, markdown, DIY plugin stack</td><td>Strong, but a 4&ndash;5 plugin stack to get there</td></tr>
        </table>
        <p class="cs-body">None of the four commercial tools tie a specific time block to a written reflection. Sunsama tracks time spent, not how it went. Obsidian can approximate the whole thing, but only by turning you into your own systems integrator, the exact problem I started this to escape.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Defining "working" before building more</div>
        <p class="cs-body">Before adding features, I defined a North Star: Weekly Active Planning: weeks with both real time-blocking and a journal entry, plus activation, engagement, and retention metrics under it. Retention specifically looks at the distribution of journal streak lengths, since the median streak is a far more honest signal than "percent who journaled at all."</p>
        <div class="metric-strip">
          <div class="metric"><div class="num">16%&rarr;34%</div><div class="lab">Hootsuite add-member conversion (same framework instinct)</div></div>
          <div class="metric"><div class="num">N=1</div><div class="lab">Current usage, stated directly, not dressed up</div></div>
        </div>
        <p class="cs-body">At one user, none of this data is statistically meaningful, even with real auth and multiple devices now in place. I said so directly instead of dressing up N=1 usage as validated learning. The value was never the dashboard. It was answering "what would tell me this is working" before building on a shaky foundation, and building the sync and testing rigor to make that measurement trustworthy once real users show up.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">The closed loop: Capture, Surface, Act</div>
        <p class="cs-body"><b>Capture:</b> per-block notes, one-tap mood, one-tap estimate accuracy. Built.<br>
        <b>Surface:</b> streak, weekly AI digest, week-over-week trend, mid-week pace flag. Built.<br>
        <b>Act:</b> a suggested (never automatic) adjustment to next week's plan based on a pattern from Surface. Not built, not spec'd. Needs real usage data to trust the pattern before acting on it.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Market &amp; pricing, reasoned honestly</div>
        <p class="cs-body">TAM: the productivity apps market, $14.46B in 2026 growing to $30.85B by 2034, not the $86&ndash;110B "productivity software" figure most reports lead with, since that includes Slack and Office 365 and isn't a comparable category.</p>
        <p class="cs-body">SOM: no report isolates "manual, reflective planning tools," but Sunsama sustaining $20&ndash;25/mo with no free tier since 2022 is direct evidence the niche pays. The wedge segment: job seekers and interview-prep grinders, a specific population juggling competing priorities that needs to reflect on execution quality, not just log hours.</p>
        <p class="cs-body">Free: the entire planner, including calendar sync and journaling. None of it calls the Claude API. Paid, around $6&ndash;8/mo, well under Sunsama's $20&ndash;25: AI summary, AI digest, and eventually Act. Pricing follows the cost line.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Still open</div>
        <p class="cs-body">Act is deferred on purpose, pending real usage data. Google Calendar reconnection is a single deliberate click after an hour, not permanent, a server-side refresh-token flow would fix that but felt disproportionate for a single-user tool. Blocks are clamped to a single calendar day by design, so true overnight blocks aren't supported yet. Conflict resolution is clock-based, not server-arbitrated. There are still no users beyond me. North Star and pricing are reasoned, not evidence-backed, and I'd rather say that plainly than pretend otherwise.</p>
      </div>
    `
  },
  coddle: {
    kicker: "Coddle / Case Study",
    title: "What's in your fridge, cooked tonight",
    dek: "An iOS app that turns the ingredients you already have into AI-generated recipes, then walks you through cooking them. Co-founded with Eddi. Closed beta, pending Apple review.",
    meta: [
      ["Role","Co-founder &middot; frontend, onboarding, recipe-gen UI"],
      ["Stack","Expo/RN, Express + Postgres, Claude Haiku + Sonnet vision"],
      ["Stage","Pre-launch &middot; 0 external users"]
    ],
    tldr: [
      "0 users on the current build. Build 5 is pending Apple review, though an earlier pre-rebrand version reached about 5 beta testers and 200+ recipes generated",
      "Split models by job: Haiku for generation, Sonnet reserved for the paid vision scan, to control cost per user",
      "Pricing is undecided and unit economics are a live risk. Every generation is a paid API call with no spend cap yet"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">The idea</div>
        <p class="cs-body">Most recipe apps make you pick a dish first and shop second. Coddle inverts that. You stock a digital kitchen, type it in or scan your fridge or receipt with your camera, tap Generate, and get 3 recipes tailored to what you own, your dietary needs, your skill level, and your time. Each one carries a match score showing how well it fits your actual inventory.</p>
        <p class="cs-body">Start from what's in your kitchen. Cook something now. Waste less.</p>
        <div class="callout">This framing is the product's implied thesis, not a validated one. We never ran a formal problem-validation exercise. It's a strong hypothesis, and I'd rather say that than dress it up as proven demand.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where it actually is right now</div>
        <p class="cs-body">Build 5 is sitting in Apple's external Beta App Review. First cohort is a 27-person waitlist collected through email invites. External users on this build today: zero. The only testing that's happened is the two founders plus one populated demo account.</p>
        <div class="callout">Worth being precise about which phase this is. An earlier version, before the rebrand from Nourish and before the native iOS rebuild described below, reached about 5 beta testers across personal contacts at Unilever, EA, and Hootsuite, and generated 200+ AI recipes across that testing. That was real usage, on a different, simpler build. This current app is a from-scratch rewrite on Expo/React Native with its own inventory, vision scan, and guided-cooking architecture, and it hasn't been in front of anyone outside the founders yet. Both things are true at once: real signal exists from an earlier version, and this version is still pre-launch.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">The gap in what already exists</div>
        <p class="cs-body">Recipe apps are search engines over a fixed database. You already have to know what you want. Pantry apps track expiry but hand you off once something's about to go bad; they don't cook for you. And generic ChatGPT can generate a recipe from a list of ingredients, but it has no persistent inventory, no fridge scanning, no guided cooking mode with timers, no saved cookbook, and no memory of your skill or diet between sessions.</p>
        <p class="cs-body">The bet is that inventory, generation, and guided cooking living in one loop is worth more than any one of those pieces alone. Whether that bundle is a real moat or just table stakes people will eventually get from ChatGPT directly is the open question underneath all of this.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Why now, what it does</div>
        <p class="cs-body">Two things got cheap at the same time: generating a genuinely personalized recipe instead of retrieving a template, and reading a fridge or receipt photo into a structured ingredient list through vision. Neither was viable a couple years ago.</p>
        <p class="cs-body"><b>Kitchen inventory:</b> zones for fridge, pantry, and spice, fuzzy autocomplete over a 1,502-item catalog, plus a camera scan that bulk-populates from a fridge or receipt photo. Capped at 300 items.<br>
        <b>Recipe generation:</b> one Claude call streams exactly 3 recipes; modes for ingredients, quick-cook meals, or surprise. Kitchen staples like oil, salt, and water are assumed and don't count against the match score.<br>
        <b>Guided cooking:</b> step-by-step with built-in timers, an ingredient checklist, and mid-cook resume.<br>
        <b>Cookbook:</b> Favourites, To-Cook, Cooked. State derived from activity events rather than a stored status field.<br>
        <b>Profile:</b> diet, skill level, time preference, cuisine, kitchenware, all feeding generation.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">How it's built</div>
        <table class="cs-table">
          <tr><th>Layer</th><th>Details</th></tr>
          <tr><td>App</td><td>Expo 54, React Native 0.81.5, React 19, Firebase Auth with a hard email-verification gate</td></tr>
          <tr><td>Backend</td><td>Express 5 + PostgreSQL 16 on Render, Firebase Admin verifies tokens</td></tr>
          <tr><td>AI</td><td>Claude Haiku 4.5 for generation (cost and latency), Claude Sonnet 4.6 for the fridge/receipt vision scan. Model IDs are DB-driven, not hardcoded</td></tr>
          <tr><td>Analytics</td><td>PostHog (EU), full event funnel plus session replay with text and images masked, verified end to end</td></tr>
          <tr><td>Ship</td><td>EAS Build and Submit to TestFlight, EAS Update configured for JS-only fixes</td></tr>
          <tr><td>Dev tools</td><td>Claude Code as the primary driver, Cursor, Claude API with MCP. Gemini CLI turned out to be dead for this project. The free tier throws an eligibility error, so PR review fell back to a git pre-push hook and manual review</td></tr>
        </table>
        <p class="cs-body">Two-person team. I own frontend: auth, onboarding, autocomplete, the recipe-gen UI, profile. Eddi owns backend: inventory, cookbook, cooking mode.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Key decisions</div>
        <table class="cs-table">
          <tr><th>Decision</th><th>Why</th></tr>
          <tr><td>Rebrand: Nourish &rarr; Coddle</td><td>Storage keys migrated cleanly on first launch, domain and bundle ID moved with it. The full reasoning behind the rename itself isn't written up yet.</td></tr>
          <tr><td>No recipe selection screen</td><td>3 recipes stream from one Claude call with a tool schema enforcing exactly 3; selection happens inside the loading screen instead of a separate step.</td></tr>
          <tr><td>Two models, split by job</td><td>Haiku for generation because it's cheap and fast enough. Sonnet reserved for the paid vision scan only.</td></tr>
          <tr><td>Cookbook state is derived, not stored</td><td>No status column. State is computed from activity events, which avoids an entire class of sync bugs.</td></tr>
          <tr><td>Session replay: deferred, then un-deferred</td><td>First shipped without it. I wrongly diagnosed a CocoaPods conflict as the blocker and pulled it. On a second look it ran through an already-installed plugin, re-enabled with zero new dependencies. Worth naming as a wrong call I corrected, not hiding it.</td></tr>
          <tr><td>Individual Apple Developer account for now</td><td>Means Eddi can't be added as an internal tester, and the App Store listing shows my name instead of Coddle's. Fixable by forming an LLC and converting to an Organization account, deliberately deferred to public launch.</td></tr>
        </table>
      </div>

      <div class="cs-section">
        <div class="cs-h">Metrics framework</div>
        <p class="cs-body">There is no usage data. N=0 external. The instrumentation is built and verified: generation started/completed/failed, recipe viewed/selected/saved, cooking started/completed, kitchen scans, streaks, onboarding. But the numbers behind it don't exist yet, because nobody outside the founders has used it.</p>
        <p class="cs-body">No north star metric is locked in. If I had to name a candidate given what's instrumented, it'd be something like recipes cooked per active user per week, but that's a guess, not a decision I've made. Same for activation, engagement, and retention: reasonable definitions exist given the event schema, but none of them are official yet.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">What founder testing actually caught</div>
        <p class="cs-body">No external beta feedback exists yet. The 27 haven't been let in. But dogfooding on the real TestFlight build surfaced real bugs worth naming honestly: a returning user with an email tied to an old Firebase UID got trapped in onboarding by a database constraint error with no way out, fixed by re-linking accounts by verified email server-side. A confirmation dialog rendered with blank buttons because a prop was named wrong, caught by looking at it, not by any test. OTA updates didn't reliably land on the test device, which is why some fixes ended up baked into full builds instead of pushed over the air.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Market and pricing, stated plainly</div>
        <p class="cs-body">TAM and SOM have never been worked out for this one. I'm not going to back into a number just to fill the section. If it's needed, it gets built from scratch, starting from the roughest wedge: people who cook at home three or more nights a week, own an iPhone, and already feel the "what do I make tonight" friction. Even that segment is unvalidated.</p>
        <p class="cs-body">Pricing isn't decided either. No tiers exist yet. The one hard constraint forcing the question: every recipe generation is a paid Claude call, and every fridge scan is a paid Sonnet vision call, with no per-user spend cap in place yet. That's exactly why the first cohort is capped small, to keep the bill predictable while the real pricing model gets figured out.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Still open</div>
        <p class="cs-body"><b>Blocking launch:</b> Apple's review, then importing the 27-person waitlist.<br>
        <b>Deferred on purpose:</b> LLC formation and the Apple Organization account, a lawyer pass and custom EULA for recipe-safety liability, GDPR ahead of any EU launch, a Firebase Admin version migration.<br>
        <b>Not yet solved:</b> pricing and unit economics, a locked north star and retention definition, market sizing, and the central bet: whether inventory-plus-generation-plus-cooking is actually defensible versus someone just doing this in ChatGPT. Generation currently takes 22&ndash;24 seconds, which is known to be slow and has a clear backend fix that hasn't been built yet.</p>
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
      "Project 1, Battlefield-specific: hit a 32% sign-in rate against a 25% North Star through competitive analysis and a Marketing partnership on acquisition",
      "Project 2, across the whole EA webstore, not just Battlefield: SQL and Looker analysis surfaced a 15% mobile conversion gap that became next quarter's roadmap input",
      "Same webstore-wide project: found checkout friction and A/B tested fixes against it, capturing $2M in additional revenue"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">Two different projects, worth keeping separate</div>
        <p class="cs-body">These were two distinct workstreams during the internship, not one continuous funnel. Project 1 was scoped specifically to the Battlefield Webstore: getting more people to sign in. Project 2 was scoped across the entire EA webstore, not just Battlefield: the full path from a user landing on any EA storefront through to a completed purchase. Different products, different funnels, different teams. I'm keeping them separate here because collapsing them into one story would overstate how connected they actually were.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Project 1: Battlefield acquisition</div>
        <p class="cs-body">The brief was top-of-funnel, specifically for the Battlefield Webstore: get more people from landing to signed in. I ran competitive analysis across comparable webstores, mapped the Battlefield user journey from landing to sign-in, and partnered with Marketing to use EA's existing web presence as an acquisition channel instead of paying for net-new traffic. That combination got sign-in rate to 32%, against a 25% North Star target.</p>
        <div class="funnel">
          <div class="funnel-row"><div class="funnel-label">Battlefield landing</div><div class="funnel-track"><div class="funnel-fill" style="width:100%"></div></div><div class="funnel-pct">100%</div></div>
          <div class="funnel-row"><div class="funnel-label">Engaged with page</div><div class="funnel-track"><div class="funnel-fill" style="width:58%"></div></div><div class="funnel-pct">58%</div></div>
          <div class="funnel-row"><div class="funnel-label">Signed in</div><div class="funnel-track"><div class="funnel-fill" style="width:32%"></div></div><div class="funnel-pct">32%</div></div>
        </div>
        <div class="funnel-note">Illustrative shape only, scoped to Battlefield specifically. Not an export of real EA analytics. The confirmed number is the 32% versus 25% North Star.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Project 2: the webstore-wide path to checkout</div>
        <p class="cs-body">This one wasn't Battlefield-specific. The scope was the full EA webstore: a user landing on any storefront, all the way through to a completed purchase, across mobile and desktop. Pulling SQL and Looker data against industry benchmarks and adjacent epics surfaced a 15% conversion gap specifically on mobile. That number became the business case for a mobile optimization workstream and fed directly into next quarter's roadmap and a prioritized backlog.</p>
        <p class="cs-body">The highest-leverage part of this project was at checkout. End-to-end user journey analysis across mobile and desktop surfaced specific friction points at the final step. A/B testing fast-checkout options and improved autofill against those friction points captured $2M in additional revenue.</p>
        <div class="funnel">
          <div class="funnel-row"><div class="funnel-label">Webstore landing</div><div class="funnel-track"><div class="funnel-fill" style="width:100%"></div></div><div class="funnel-pct">100%</div></div>
          <div class="funnel-row"><div class="funnel-label">Added to cart</div><div class="funnel-track"><div class="funnel-fill" style="width:61%"></div></div><div class="funnel-pct">61%</div></div>
          <div class="funnel-row"><div class="funnel-label">Checkout started</div><div class="funnel-track"><div class="funnel-fill" style="width:47%"></div></div><div class="funnel-pct">47%</div></div>
          <div class="funnel-row"><div class="funnel-label">Checkout completed</div><div class="funnel-track"><div class="funnel-fill" style="width:38%"></div></div><div class="funnel-pct">38%</div></div>
        </div>
        <div class="funnel-note">Illustrative shape only, scoped to the whole webstore, not Battlefield. Not an export of real EA analytics. The confirmed numbers are the 15% mobile gap and the $2M captured.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Keeping five teams aligned</div>
        <p class="cs-body">The checkout and API performance decisions touched 5 cross-functional teams. PRDs plus direct technical project orchestration were what kept those teams pointed at the same roadmap instead of solving the problem five different ways.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Still open</div>
        <p class="cs-body">The mobile optimization roadmap Project 2 fed into extends past the internship, so I don't have visibility into how those next-quarter initiatives landed. What's confirmed and stated here is the internship-window impact on both projects: the 32% Battlefield sign-in result, the 15% mobile gap identified, and the $2M captured from the checkout fixes.</p>
      </div>
    `
  }
};