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
      "One decision, real ISO calendar dates instead of a fake week, unlocked recurring blocks, carryover, and real streaks at once",
      "Added real cross-device sync and a live Google Calendar overlay without touching the rest of the app",
      "Verified with real browser tests, not just reasoning about it. That caught three real bugs before they shipped"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">The gap</div>
        <p class="cs-body">Notion could track my time, but I had to rebuild the same rollups every week just to see it. Google Calendar was fast, but knew nothing about a goal or a reflection. So I built Weekflow: a planner that still means something after the week is over.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">What I built</div>
        <p class="cs-body">Two competing mockups, a dense 7-day grid and a single-day view, merged into one app with a Week/Day toggle instead of shipping as two products. Underneath, everything runs on real calendar dates instead of a fake day-index. That single change is what made recurring blocks, task carryover, and real cross-week streaks possible instead of three separate hard problems.</p>
        <p class="cs-body">On top of the planner sits a Journal. I tested two writing styles live, per-block notes versus one freeform page, until it was obvious the per-block version already covered reflection and the second mode was redundant. Cut it.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Making it real</div>
        <p class="cs-body">A planner only I can use isn't worth much, so I added real sync: Google auth, Row Level Security, live updates across devices. Google Calendar overlays in, read-only, on purpose, it should never be able to touch your actual calendar. The one endpoint that costs money, AI summaries, is rate-limited and capped so a bug can't turn into a bill.</p>
        <div class="callout">Instead of assuming any of that worked, I ran real headless browser tests against it. That caught a cascading delete bug, a session bug that could've wiped a user's local data, and a cross-account data leak, all before they shipped.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">What competitors get wrong</div>
        <table class="cs-table">
          <tr><th>Tool</th><th>Model</th><th>Reflection</th></tr>
          <tr><td>Reclaim.ai</td><td>AI auto-schedules into calendar gaps</td><td>None</td></tr>
          <tr><td>Sunsama</td><td>Guided manual planning ritual</td><td>Time tracking, not qualitative</td></tr>
          <tr><td>Motion</td><td>AI scheduler + full PM suite</td><td>None</td></tr>
          <tr><td>Obsidian + Day Planner</td><td>Manual, markdown, DIY plugins</td><td>Strong, but a 4&ndash;5 plugin stack to get there</td></tr>
        </table>
        <p class="cs-body">None of them tie a specific time block to a written reflection. Obsidian gets closest, but only if you're willing to become your own systems integrator across several plugins. That's the exact gap I built into.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where I land on it</div>
        <p class="cs-body">My honest read: the reflection loop is the actual bet, not the scheduling. Anyone can build a calendar. Nobody's shipped "did this time actually work" as a first-class feature next to it. I don't have market research behind that, I have months of fighting Notion myself, and Sunsama staying alive on $20+/mo with zero free tier since 2022 as the closest real signal that people pay for this specific thing.</p>
        <p class="cs-body">Right now it's an N=1 tool, and I'd rather say that plainly than dress it up. The next real step isn't a bigger roadmap. It's a handful of actual users and watching where they get stuck.</p>
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
      "0 users on the current build. An earlier pre-rebrand version reached about 5 testers and 200+ recipes generated",
      "Split models by job, a cheap model for recipe generation, a vision model only for the paid fridge scan, to control cost per user",
      "Pricing is undecided, and that's a real risk: every generation is a paid API call with no spend cap yet"
    ],
    body: `
      <div class="cs-section">
        <div class="cs-h">The idea</div>
        <p class="cs-body">Most recipe apps make you pick a dish first and shop second. Coddle starts from what's already in your kitchen: scan or type your inventory, generate three recipes that fit it, get guided through cooking one.</p>
        <div class="callout">This is the product's working hypothesis, not validated demand. I haven't run a formal problem-validation exercise, and I'd rather say that than dress it up.</div>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where it actually is</div>
        <p class="cs-body">Build 5 is in Apple's review, a 27-person waitlist is ready to import, and zero external users have touched this build. An earlier, simpler pre-rebrand version did reach about 5 testers and generated 200+ recipes. That's real signal, just from a different, earlier app, and I'm keeping the two apart rather than borrowing one's traction for the other.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">What I built, and how</div>
        <p class="cs-body">Kitchen inventory with fuzzy autocomplete and camera scanning, recipe generation streamed from a single Claude call, guided cooking with timers, and a cookbook whose state is derived from activity events rather than a stored status field. Built on Expo/React Native with a Postgres backend. Two Claude models split by job: Haiku for generation, Sonnet reserved only for the paid vision scan. Analytics and session replay are verified end to end, even with no real traffic yet to look at.</p>
        <p class="cs-body">Founder dogfooding on the real build already caught real bugs: a returning user could get permanently trapped in onboarding, and a confirmation dialog once rendered with blank buttons. Both fixed before anyone outside the founders saw them.</p>
      </div>

      <div class="cs-section">
        <div class="cs-h">Where I land on it</div>
        <p class="cs-body">The real bet is whether inventory plus generation plus guided cooking, as one loop, is worth more than the sum of its parts, or whether it's just table stakes people will eventually get from ChatGPT directly. I don't know yet. What I do know: every generation costs real money with no per-user spend cap in place, which is exactly why the first cohort is capped small on purpose. Pricing isn't decided. The honest state of this project is pre-launch, not proven.</p>
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