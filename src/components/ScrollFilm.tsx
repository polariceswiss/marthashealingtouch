"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
export function ScrollFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    // Download only near the hero; no timer or video decoding runs below it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !el.getAttribute("src")) {
          el.src = matchMedia("(max-width: 760px)").matches
            ? "/videos/hero-film-mobile.mp4"
            : "/videos/hero-film.mp4";
          el.load();
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const scene = el.closest(".hero-scroll");
    let target = 0;
    let scheduled = 0;
    const seek = () => {
      scheduled = 0;
      if (el.readyState < 2 || !Number.isFinite(el.duration) || el.seeking)
        return;
      const time = Math.min(target * el.duration, el.duration - 0.04);
      if (Math.abs(el.currentTime - time) > 0.035)
        el.currentTime = Math.max(0, time);
    };
    const requestSeek = () => {
      if (!scheduled) scheduled = requestAnimationFrame(seek);
    };
    const updateTarget = () => {
      if (!scene) return;
      const bounds = scene.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      target = Math.min(1, Math.max(0, -bounds.top / travel));
      requestSeek();
    };
    window.addEventListener("scroll", updateTarget, { passive: true });
    updateTarget();
    el.addEventListener("seeked", requestSeek);
    el.addEventListener("loadeddata", requestSeek);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateTarget);
      cancelAnimationFrame(scheduled);
      el.removeEventListener("seeked", requestSeek);
      el.removeEventListener("loadeddata", requestSeek);
    };
  }, [reduced]);
  if (reduced) return null;
  return (
    <video
      ref={video}
      className={`scroll-film ${ready ? "ready" : ""}`}
      muted
      playsInline
      preload="none"
      aria-hidden="true"
      disablePictureInPicture
      onLoadedData={() => setReady(true)}
      onError={() => setReady(false)}
    />
  );
}
