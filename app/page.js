"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { animate } from "motion";

export default function Landing() {
  const router = useRouter();
  const cardRef = useRef(null);
  const sheenRef = useRef(null);
  const landingRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMouseMove = useCallback(
    (e) => {
      if (reduceMotion || !cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      const rotY = (x / r.width) * 14;
      const rotX = -(y / r.height) * 14;
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if (sheenRef.current) {
        sheenRef.current.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        sheenRef.current.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }
    },
    [reduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  }, []);

  const enterPortfolio = useCallback(() => {
    const opts = reduceMotion
      ? { duration: 0 }
      : { duration: 0.55, ease: [0.16, 1, 0.3, 1] };
    animate(
      cardRef.current,
      { scale: 1.05, y: -30, opacity: 0, filter: ["blur(0px)", "blur(6px)"] },
      opts
    ).then(() => {
      router.push("/work");
    });
  }, [reduceMotion, router]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        enterPortfolio();
      }
    },
    [enterPortfolio]
  );

  return (
    <>
      <div className="page-shader" />
      <section id="landing" ref={landingRef}>
        <div className="landing-glow" />
        <div className="stage">
          <div className="card-shadow-pool" />
          <div
            className="card"
            ref={cardRef}
            role="button"
            tabIndex={0}
            aria-label="Enter portfolio: Keon Lee, Product Manager"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={enterPortfolio}
            onKeyDown={handleKeyDown}
          >
            <div className="card-shader" />
            <div className="sheen" ref={sheenRef} />
            <div className="card-top">
              <div className="card-name serif">Keon Lee</div>
              <div className="badge mono">Product Manager</div>
            </div>
            <div className="card-mid">
              <div className="l1">Ex&#8209;Hootsuite &middot; EA &middot; Suncor &middot; Deloitte</div>
              <div className="l2">Co&#8209;founder, Coddle &middot; B.A.Sc Chem Eng, UBC</div>
            </div>
            <div className="card-bottom">
              <div className="left mono">Vancouver, BC</div>
              <div className="right pulse">Click to enter &rarr;</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
