"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RESUME_URL, RESUME_FILENAME } from "@/lib/resume";

function fitFramePreviews() {
  document.querySelectorAll(".frame-viewport").forEach((vp) => {
    const w = parseInt(vp.dataset.embedW, 10);
    const h = parseInt(vp.dataset.embedH, 10);
    const scale = vp.clientWidth / w;
    const iframe = vp.querySelector("iframe");
    if (iframe) {
      iframe.style.width = w + "px";
      iframe.style.height = h + "px";
      iframe.style.transform = `scale(${scale})`;
    }
  });
}

export default function Work() {
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add("content-mode");
    fitFramePreviews();
    document.querySelectorAll(".frame-viewport iframe").forEach((iframe) => {
      iframe.addEventListener("load", () => {
        const loading = iframe.parentElement.querySelector(".frame-loading");
        if (loading) loading.style.opacity = "0";
      });
    });
    window.addEventListener("resize", fitFramePreviews);
    return () => {
      document.body.classList.remove("content-mode");
      window.removeEventListener("resize", fitFramePreviews);
    };
  }, []);

  return (
    <section id="grid" className="show" style={{ display: "block" }}>
      <div className="topbar">
        <div>
          <div className="topbar-name">Keon Lee</div>
          <div className="topbar-sub mono">Product Manager &middot; Vancouver, BC</div>
        </div>
        <div className="topbar-actions">
          <a className="cta-pill cta-pill-primary" href={RESUME_URL} download={RESUME_FILENAME}>
            Resume &darr;
          </a>
          <a className="cta-pill" href="https://www.linkedin.com/in/keonnnl/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="cta-pill" href="https://github.com/Keonleebv" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="cta-pill" href="mailto:Keonlbv03@gmail.com">
            Email
          </a>
          <button className="back-btn" onClick={() => router.push("/")}>
            &larr; Back to card
          </button>
        </div>
      </div>

      <div className="intro-block">
        <div className="intro-text">
          <div className="intro-line">Welcome to my portfolio.</div>
          <div className="positioning-line">
            Chemical engineer turned product manager. Here&apos;s a mix of what I&apos;ve
            shipped, used, and I&apos;m still building, plus a few passion projects and
            features I think could be sharper. Pick one and I&apos;ll walk you through the
            thinking, since understanding the real tradeoffs underneath a feature is what
            makes the product calls sharper.
          </div>
        </div>
        <div className="intro-graphic-wrap">
          <svg className="intro-graphic" viewBox="0 0 170 95" role="img">
            <title>
              A rough sketch of the path: an early jump at Deloitte, a stagnant stretch at
              Suncor, a hard year pivoting, then a breakout at EA and continued climb at
              Hootsuite.
            </title>
            <line x1="6" y1="85" x2="158" y2="85" stroke="var(--line)" strokeWidth="1" />
            <polyline
              points="6,42 44,58 82,75 120,25 158,8"
              fill="none"
              stroke="var(--brass)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="6" cy="42" r="2.5" fill="var(--brass-soft)">
              <title>Deloitte, an early jump</title>
            </circle>
            <circle cx="44" cy="58" r="2.5" fill="var(--brass-soft)">
              <title>Suncor, a stagnant stretch</title>
            </circle>
            <circle cx="82" cy="75" r="2.5" fill="var(--brass-soft)">
              <title>A hard year, pivoting into product</title>
            </circle>
            <circle cx="120" cy="25" r="2.5" fill="var(--brass-soft)">
              <title>EA, the breakout</title>
            </circle>
            <circle cx="158" cy="8" r="3" fill="var(--brass)">
              <title>Hootsuite, still climbing</title>
            </circle>
          </svg>
        </div>
      </div>

      <div className="exp-strip">
        <div className="exp-strip-label mono">Experience</div>
        <div className="exp-row">
          <div className="exp-item">
            <div className="exp-co">Hootsuite</div>
            <div className="exp-role">PM Intern, Teams &amp; Orgs Beta</div>
            <div className="exp-divider" />
            <div className="exp-num">40%</div>
            <div className="exp-desc">of untracked drop-offs surfaced</div>
          </div>
          <div className="exp-item">
            <div className="exp-co">Electronic Arts</div>
            <div className="exp-role">PM Intern, EAX</div>
            <div className="exp-divider" />
            <div className="exp-num">$2M</div>
            <div className="exp-desc">in revenue captured via checkout fixes</div>
          </div>
          <div className="exp-item">
            <div className="exp-co">Suncor Energy</div>
            <div className="exp-role">Process Engineer &amp; Dev Intern</div>
            <div className="exp-divider" />
            <div className="exp-num">40%</div>
            <div className="exp-desc">lift in dashboard adoption, Power BI + SQL</div>
          </div>
          <div className="exp-item">
            <div className="exp-co">Deloitte</div>
            <div className="exp-role">Tech Consulting Intern, Oracle Team</div>
            <div className="exp-divider" />
            <div className="exp-num">30%</div>
            <div className="exp-desc">faster decisions across 30+ stakeholders</div>
          </div>
        </div>
      </div>

      <div className="exp-strip-label mono">Projects</div>
      <div className="bento">
        <Link href="/case/weekflow" className="proj-card" aria-label="Read Weekflow case study">
          <div className="frame">
            <div className="frame-chrome">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="frame-url mono">weekflow-delta.vercel.app</span>
            </div>
            <div className="frame-viewport" data-embed-w="1440" data-embed-h="900">
              <div className="frame-loading mono">loading preview&hellip;</div>
              <iframe
                src="https://weekflow-delta.vercel.app"
                loading="lazy"
                title="Weekflow live preview"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="proj-head">
            <div className="proj-name">Weekflow</div>
            <div className="proj-tag">Solo &middot; Live</div>
          </div>
          <div className="proj-desc">
            Notion and Google Calendar both miss the same thing: they never connect
            planning time to reflecting on it. Weekflow closes that loop, with real AI
            summaries underneath.
          </div>
          <div className="pills">
            <span className="pill">Next.js</span>
            <span className="pill">Claude API</span>
            <span className="pill">Mixpanel-style metrics</span>
          </div>
          <div className="cta-row">
            <span className="metric-mini">North star: Weekly Active Planning</span>
            <span className="cta-link">Read case study &rarr;</span>
          </div>
        </Link>

        <Link href="/case/coddle" className="proj-card" aria-label="Read Coddle case study">
          <div className="frame">
            <div className="frame-chrome">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="frame-url mono">coddle.app</span>
            </div>
            <div className="frame-viewport" data-embed-w="1440" data-embed-h="900">
              <div className="frame-loading mono">loading preview&hellip;</div>
              <iframe
                src="https://www.coddle.app"
                loading="lazy"
                title="Coddle live preview"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="proj-head">
            <div className="proj-name">Coddle</div>
            <div className="proj-tag">Co&#8209;founded &middot; Closed Beta</div>
          </div>
          <div className="proj-desc">
            An iOS app that turns what&apos;s in your fridge into AI-generated recipes,
            then guides you through cooking them. Co-founded with Eddi. Pending Apple
            review.
          </div>
          <div className="pills">
            <span className="pill">Expo / RN</span>
            <span className="pill">Claude Haiku + Sonnet</span>
            <span className="pill">Postgres</span>
          </div>
          <div className="cta-row">
            <span className="metric-mini">Stage: Closed Beta, 15 external users</span>
            <span className="cta-link">Read case study &rarr;</span>
          </div>
        </Link>
      </div>

      <div className="exp-strip-label mono" style={{ marginTop: 52 }}>Deep Dives</div>
      <div className="positioning-line" style={{ marginBottom: 24 }}>
        Two pieces of real work from Hootsuite and EA. Same honesty standard as the
        projects above, illustrative funnel reconstructions, real confirmed metrics.
      </div>
      <div className="bento">
        <Link href="/case/hootsuite" className="proj-card" aria-label="Read Hootsuite case study">
          <div className="frame">
            <div className="frame-chrome">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="frame-url mono">Mixpanel, internal beta</span>
            </div>
            <div className="brand-preview">
              <div className="brand-mark-col">
                <div className="brand-mark">Mixpanel</div>
                <div className="brand-x">&times;</div>
                <div className="brand-mark brand-mark-alt">Hootsuite</div>
              </div>
              <div className="anim-funnel" aria-hidden="true">
                <div className="af-bar" style={{ "--w": "100%", "--d": "0s" }} />
                <div className="af-bar" style={{ "--w": "74%", "--d": "0.15s" }} />
                <div className="af-bar" style={{ "--w": "52%", "--d": "0.3s" }} />
                <div className="af-bar" style={{ "--w": "34%", "--d": "0.45s" }} />
              </div>
              <div className="anim-caption mono">7 funnels &middot; 15+ new events tracked</div>
            </div>
          </div>
          <div className="proj-head">
            <div className="proj-name">Hootsuite</div>
            <div className="proj-tag">PM Intern &middot; Teams &amp; Orgs Beta</div>
          </div>
          <div className="proj-desc">
            Owned and built the measurement framework behind a stalled enterprise beta. 
            Turned a beta in an ambiguous state into clear answers on what was breaking, 
            how users felt, and what to do next across 3 development teams. Mapped 
            the entire user journey into structured Mixpanel funnels.
          </div>
          <div className="pills">
            <span className="pill">Mixpanel</span>
            <span className="pill">FullStory</span>
            <span className="pill">Confluence</span>
            <span className="pill">Jira</span>

          </div>
          <div className="cta-row">
            <span className="metric-mini">40% drop-off surfaced & fixed, 7 funnels built</span>
            <span className="cta-link">Read case study &rarr;</span>
          </div>
        </Link>

        <Link href="/case/ea" className="proj-card" aria-label="Read EA case study">
          <div className="frame">
            <div className="frame-chrome">
              <span className="dot" /><span className="dot" /><span className="dot" />
              <span className="frame-url mono">store.ea.com/battlefield</span>
            </div>
            <div className="brand-preview">
              <div className="brand-mark-col">
                <div className="brand-mark">Battlefield 6</div>
                <div className="brand-x">&times;</div>
                <div className="brand-mark brand-mark-alt">EA</div>
              </div>
              <div className="anim-funnel" aria-hidden="true">
                <div className="af-bar" style={{ "--w": "100%", "--d": "0s" }} />
                <div className="af-bar" style={{ "--w": "61%", "--d": "0.15s" }} />
                <div className="af-bar" style={{ "--w": "38%", "--d": "0.3s" }} />
              </div>
              <div className="anim-caption mono">2 workstreams &middot; landing to checkout</div>
            </div>
          </div>
          <div className="proj-head">
            <div className="proj-name">Electronic Arts</div>
            <div className="proj-tag">PM Intern &middot; EAX</div>
          </div>
          <div className="proj-desc">
            Two workstreams: Battlefield Webstore Top-of-Funnel user acquisition to a 32% sign-in rate, 
            and a Product Discovery project to optimize the Webstore-wide user journey, that found a $2M fix
            in the checkout process. 
          </div>
          <div className="pills">
            <span className="pill">Product Requirement Docs</span>
            <span className="pill">SQL</span>
            <span className="pill">Looker</span>
            <span className="pill">A/B Testing</span>
          </div>
          <div className="cta-row">
            <span className="metric-mini">32% acquisition, $2M checkout fix</span>
            <span className="cta-link">Read case study &rarr;</span>
          </div>
        </Link>
      </div>

      <div className="exp-strip-label mono" style={{ marginTop: 52 }}>References</div>
      <div className="refs-featured">
        <div className="ref-card ref-card-featured">
          <div className="ref-badge mono">Direct Manager</div>
          <p className="ref-quote">
            &quot;He took the lead on an existing product, bringing it back on track and
            significantly improving the customer experience.&quot;
          </p>
          <div className="ref-name">Brandon Hubbard</div>
          <div className="ref-title">Group Product Manager, Foundations at Hootsuite</div>
        </div>
        <div className="ref-card ref-card-featured">
          <div className="ref-badge mono">Direct Manager</div>
          <p className="ref-quote">
            &quot;Keon contributed to shaping the top-of-funnel strategy for the EA
            webstore. He consistently took feedback seriously and quickly applied it to
            improve his work.&quot;
          </p>
          <div className="ref-name">Nicolas Abou Sawan</div>
          <div className="ref-title">Product Manager, Electronic Arts</div>
        </div>
      </div>
      <div className="refs-secondary">
        <div className="ref-card ref-card-secondary">
          <p className="ref-quote">
            &quot;He demonstrated solid technical understanding of the products he worked
            on, something that can be crucial for the successful development and release
            of new features.&quot;
          </p>
          <div className="ref-name">Linden Querengesser</div>
          <div className="ref-title">Back-End Software Developer, Hootsuite</div>
        </div>
        <div className="ref-card ref-card-secondary">
          <p className="ref-quote">
            &quot;A hardworking, dedicated, initiative-taking individual. One of his
            standouts was his willingness to engage and collaborate across teams.&quot;
          </p>
          <div className="ref-name">Viral Dhruv</div>
          <div className="ref-title">Director, Deloitte Consulting</div>
        </div>
      </div>
      <div className="ref-letter-note">
        Also available:{" "}
        <a href="/Ref_Letter.pdf" target="_blank" rel="noreferrer">
          a full written reference letter
        </a>{" "}
        from my EA manager, on Electronic Arts letterhead. The other recommendations above
        are visible on my LinkedIn profile.
      </div>
    </section>
  );
}
