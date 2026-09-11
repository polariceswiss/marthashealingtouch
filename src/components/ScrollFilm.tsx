"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
export function ScrollFilm({ desktop = "/videos/hero-film-v2.mp4", mobile = "/videos/hero-film-v2-mobile.mp4" }: { desktop?: string; mobile?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = video.current;
    if (!el || reduced) return;
    // Download only near the hero; no timer or video decoding runs below it.
    let tracking = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !el.getAttribute("src")) {
          el.src = matchMedia("(max-width: 760px)").matches ? mobile : desktop;
          el.load();
        }
        if (entries[0].isIntersecting && !tracking) tracking = requestAnimationFrame(track);
        if (!entries[0].isIntersecting && tracking) {
          cancelAnimationFrame(tracking);
          tracking = 0;
        }
      },
      { rootMargin: "100px" },
    );
    observer.observe(el);
    const scene = el.closest(".mht-hero, .hero-scroll");
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
    const track = () => {
      updateTarget();
      tracking = requestAnimationFrame(track);
    };
    window.addEventListener("scroll", updateTarget, { passive: true });
    updateTarget();
    el.addEventListener("seeked", requestSeek);
    el.addEventListener("loadeddata", requestSeek);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateTarget);
      cancelAnimationFrame(scheduled);
      cancelAnimationFrame(tracking);
      el.removeEventListener("seeked", requestSeek);
      el.removeEventListener("loadeddata", requestSeek);
    };
  }, [desktop, mobile, reduced]);
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
