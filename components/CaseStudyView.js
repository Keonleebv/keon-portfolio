"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, stagger, inView } from "motion";

export default function CaseStudyView({ caseData }) {
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("content-mode");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function safeAnimate(targets, keyframes, opts = {}) {
      if (reduceMotion) {
        const o = { ...opts };
        delete o.delay;
        o.duration = 0;
        return animate(targets, keyframes, o);
      }
      return animate(targets, keyframes, opts);
    }

    window.scrollTo(0, 0);

    safeAnimate(
      "#cs-root .cs-eyebrow, #cs-root .cs-title, #cs-root .cs-dek, #cs-root .tldr",
      { opacity: [0, 1], y: [12, 0] },
      { delay: stagger(0.08), duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    );

    const sections = document.querySelectorAll("#cs-root .cs-section, #cs-root .cs-meta");
    sections.forEach((el) => {
      el.style.opacity = 0;
    });
    const stopInView = inView(
      "#cs-root .cs-section, #cs-root .cs-meta",
      (el) => {
        safeAnimate(el, { opacity: [0, 1], y: [16, 0] }, { duration: 0.55, ease: [0.16, 1, 0.3, 1] });
      },
      { margin: "0px 0px -10% 0px", amount: 0.2 }
    );

    function onScroll() {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (window.scrollY / h) * 100 : 0;
      const bar = document.getElementById("progressBar");
      if (bar) bar.style.width = p + "%";
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.body.classList.remove("content-mode");
      window.removeEventListener("scroll", onScroll);
      if (typeof stopInView === "function") stopInView();
    };
  }, []);

  return (
    <>
      <div className="progress" id="progressBar" />
      <section id="casestudy" className="show" style={{ display: "block" }}>
        <div className="cs-nav">
          <Link href="/work" className="back-btn">
            &larr; Back to work
          </Link>
          <div className="cs-kicker mono">{caseData.kicker}</div>
        </div>
        <div className="cs-inner" id="cs-root" ref={contentRef}>
          <div className="cs-eyebrow mono">{caseData.kicker}</div>
          <h1 className="cs-title">{caseData.title}</h1>
          <p className="cs-dek">{caseData.dek}</p>
          {caseData.liveUrl && (
            <a
              href={caseData.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill cta-pill-primary"
              style={{ display: "inline-block", marginBottom: 32 }}
            >
              Give it a try &rarr;
            </a>
          )}
          <div className="tldr">
            <div className="tldr-label mono">TL;DR</div>
            <ul>
              {caseData.tldr.map((t, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </ul>
          </div>
          <div className="cs-meta">
            {caseData.meta.map((m, i) => (
              <div className="cs-meta-row" key={i}>
                <div className="k mono">{m[0]}</div>
                <div className="v" dangerouslySetInnerHTML={{ __html: m[1] }} />
              </div>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: caseData.body }} />
          <div className="cs-footer mono">
            <span>Keon Lee &middot; Portfolio V1</span>
            <Link href="/work">&larr; Back to work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
