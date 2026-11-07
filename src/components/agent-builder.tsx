"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Users } from "lucide-react";

const agents = [
  { name: "Scout", color: "#64d9ff" },
  { name: "Layout", color: "#9b8cff" },
  { name: "Typeset", color: "#ff9d67" },
  { name: "Motion", color: "#f477ba" },
  { name: "QA", color: "#9bdd68" },
  { name: "Deploy", color: "#ffdb70" },
  { name: "Copy", color: "#7ce2c4" },
  { name: "Lint", color: "#ff8179" },
  { name: "Index", color: "#8bb7ff" },
  { name: "Render", color: "#f4a1f2" },
  { name: "Palette", color: "#d0e879" },
  { name: "Review", color: "#ffb96e" },
];

const MAX_ACTIVE = 6;

type ActiveBuild = {
  element: HTMLElement;
  slot: number;
  agent: (typeof agents)[number];
  elapsed: number;
  moveFromX: number;
  moveFromY: number;
  moveToX: number;
  moveToY: number;
  kind: string;
};

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOut(value: number) {
  if (value < 0.12) return 0.12 * Math.pow(value / 0.12, 2);
  if (value > 0.9) {
    const progress = (value - 0.9) / 0.1;
    return 0.9 + 0.1 * (1 - Math.pow(1 - progress, 2));
  }
  return 0.12 + ((value - 0.12) / 0.78) * 0.78;
}

function setBuilt(element: HTMLElement) {
  element.dataset.built = "true";
  delete element.dataset.buildState;
  delete element.dataset.buildProgress;
  element.style.removeProperty("--build-progress");
  element.style.removeProperty("opacity");
  element.style.removeProperty("transform");
}

export default function AgentBuilder() {
  const [agentsEnabled, setAgentsEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [tourRunning, setTourRunning] = useState(false);
  const [booting, setBooting] = useState(true);
  const cursorRefs = useRef<Array<HTMLDivElement | null>>([]);
  const boxRefs = useRef<Array<HTMLDivElement | null>>([]);
  const enabledRef = useRef(false);
  const pausedRef = useRef(false);
  const tourRunningRef = useRef(false);
  const tourPendingRef = useRef(false);
  const tourStartRef = useRef(0);
  const tourFromRef = useRef(0);
  const tourToRef = useRef(0);
  const expectedScrollRef = useRef(0);
  const observedRef = useRef<HTMLElement[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const enabled = document.documentElement.dataset.agents === "on";
    setAgentsEnabled(enabled);
    enabledRef.current = enabled;
    setBooting(enabled);
    pausedRef.current = false;
    if (!enabled) {
      document.querySelectorAll<HTMLElement>("[data-build]").forEach(setBuilt);
      setBooting(false);
    }

    const wasTouring = sessionStorage.getItem("portfolio-tour") === "1";
    if (wasTouring) {
      sessionStorage.removeItem("portfolio-tour");
      tourPendingRef.current = true;
    }
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-build]"));
    observedRef.current = targets;
    let frame = 0;
    let bootTimer = 0;
    let sequence = 0;
    const visible = new Set<HTMLElement>();
    const waiting = new Set<HTMLElement>();
    const active: ActiveBuild[] = [];
    let lastFrame = 0;

    const hideCursors = () => {
      cursorRefs.current.forEach((cursor) => {
        if (cursor) cursor.style.opacity = "0";
      });
      boxRefs.current.forEach((box) => {
        if (box) box.style.opacity = "0";
      });
    };

    const positionCursor = (slot: number, x: number, y: number, opacity: number) => {
      const cursor = cursorRefs.current[slot];
      if (!cursor) return;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      cursor.style.opacity = String(opacity);
    };

    const showBlueprint = (task: ActiveBuild, progress: number) => {
      const box = boxRefs.current[task.slot];
      if (!box) return;
      const rect = task.element.getBoundingClientRect();
      box.style.left = `${rect.left - 4}px`;
      box.style.top = `${rect.top - 4}px`;
      box.style.width = `${Math.max(rect.width + 8, 24)}px`;
      box.style.height = `${Math.max(rect.height + 8, 24)}px`;
      box.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
      box.style.opacity = "1";
    };

    const addToQueue = (element: HTMLElement) => {
      if (element.dataset.built === "true" || active.some((task) => task.element === element)) return;
      visible.add(element);
      waiting.add(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (element.dataset.built === "true") continue;
          if (entry.isIntersecting) addToQueue(element);
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );
    observerRef.current = observer;

    const instantBuildPast = () => {
      for (const element of targets) {
        if (element.dataset.built === "true") continue;
        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0) {
          setBuilt(element);
          visible.delete(element);
          waiting.delete(element);
          const taskIndex = active.findIndex((task) => task.element === element);
          if (taskIndex >= 0) {
            const task = active[taskIndex];
            const box = boxRefs.current[task.slot];
            if (box) box.style.opacity = "0";
            positionCursor(task.slot, task.moveToX, task.moveToY, 0);
            active.splice(taskIndex, 1);
          }
        }
      }
    };

    const scanVisibleTargets = () => {
      for (const element of targets) {
        if (element.dataset.built === "true" || active.some((task) => task.element === element)) continue;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          setBuilt(element);
          visible.delete(element);
          waiting.delete(element);
          continue;
        }
        if (
          rect.bottom > 0 &&
          rect.top < window.innerHeight &&
          rect.right > 0 &&
          rect.left < window.innerWidth
        ) {
          addToQueue(element);
        } else {
          visible.delete(element);
        }
      }
    };

    const startAvailableBuilds = () => {
      while (active.length < MAX_ACTIVE) {
        const element = targets.find((target) => waiting.has(target) && visible.has(target));
        if (!element) break;
        waiting.delete(element);
        const slot = Array.from({ length: MAX_ACTIVE }, (_, index) => index)
          .find((index) => !active.some((task) => task.slot === index));
        if (slot === undefined) break;
        const rect = element.getBoundingClientRect();
        const cursor = cursorRefs.current[slot];
        const current = cursor?.style.transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px/) ?? null;
        const fromX = current ? Number(current[1]) : window.innerWidth - 68 - slot * 18;
        const fromY = current ? Number(current[2]) : window.innerHeight - 80;
        const agent = agents[sequence % agents.length];
        sequence += 1;
        active.push({
          element,
          slot,
          agent,
          elapsed: 0,
          moveFromX: fromX,
          moveFromY: fromY,
          moveToX: rect.left + Math.min(rect.width * 0.68, 160),
          moveToY: rect.top + Math.min(rect.height * 0.5, 28),
          kind: element.dataset.build ?? "type",
        });
        if (cursor) {
          cursor.dataset.agent = agent.name;
          cursor.style.setProperty("--agent-color", agent.color);
          cursor.style.opacity = "1";
          const label = cursor.querySelector<HTMLElement>(".agent-name");
          if (label) label.textContent = agent.name;
        }
        const blueprint = boxRefs.current[slot];
        if (blueprint) {
          blueprint.dataset.agent = agent.name;
          const label = blueprint.querySelector<HTMLElement>(".blueprint-label");
          if (label) label.textContent = agent.name;
        }
      }
    };

    const heroIsBuilt = () =>
      Array.from(document.querySelectorAll<HTMLElement>("#top [data-build]"))
        .every((element) => {
          const rect = element.getBoundingClientRect();
          return element.dataset.built === "true" || rect.width === 0 || rect.height === 0;
        });

    const stopTour = () => {
      tourPendingRef.current = false;
      tourRunningRef.current = false;
      document.documentElement.style.scrollBehavior = "";
      setTourRunning(false);
    };

    const beginTour = (now: number) => {
      tourPendingRef.current = false;
      tourRunningRef.current = true;
      tourStartRef.current = now;
      tourFromRef.current = window.scrollY;
      tourToRef.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      expectedScrollRef.current = window.scrollY;
      document.documentElement.style.scrollBehavior = "auto";
      setTourRunning(true);
    };

    const tick = (now: number) => {
      if (!enabledRef.current && !tourPendingRef.current && !tourRunningRef.current) {
        frame = 0;
        return;
      }
      const delta = lastFrame === 0 ? 16 : Math.min(now - lastFrame, 50);
      lastFrame = now;

      if (!pausedRef.current && enabledRef.current) {
        scanVisibleTargets();
        startAvailableBuilds();
        for (let index = active.length - 1; index >= 0; index -= 1) {
          const task = active[index];
          task.elapsed += delta;
          const cursor = cursorRefs.current[task.slot];
          const box = boxRefs.current[task.slot];
          if (task.elapsed <= 540) {
            const progress = easeOutCubic(task.elapsed / 540);
            const x = task.moveFromX + (task.moveToX - task.moveFromX) * progress;
            const y = task.moveFromY + (task.moveToY - task.moveFromY) * progress;
            positionCursor(task.slot, x, y, 1);
            if (cursor) cursor.style.setProperty("--agent-color", task.agent.color);
          } else if (task.elapsed <= 850) {
            positionCursor(task.slot, task.moveToX, task.moveToY, 1);
            if (cursor) cursor.style.setProperty("--agent-color", task.agent.color);
            showBlueprint(task, easeOutCubic((task.elapsed - 540) / 310));
          } else {
            const textLength = Math.max(14, (task.element.textContent ?? "").trim().length);
            const duration = task.kind === "type" ? Math.min(1_600, Math.max(720, textLength * 22)) : 720;
            const progress = easeOutCubic((task.elapsed - 850) / duration);
            const rect = task.element.getBoundingClientRect();
            task.moveToX = rect.left + Math.min(rect.width * 0.68, 160);
            task.moveToY = rect.top + Math.min(rect.height * 0.5, 28);
            positionCursor(task.slot, task.moveToX, task.moveToY, 1);
            if (cursor) cursor.style.setProperty("--agent-color", task.agent.color);
            task.element.dataset.buildState = "reveal";
            task.element.dataset.buildProgress = `${progress * 100}%`;
            task.element.style.setProperty("--build-progress", `${progress * 100}%`);
            if (task.kind === "pop") {
              task.element.style.opacity = String(progress);
              task.element.style.transform = `scale(${0.92 + progress * 0.08})`;
            }
            showBlueprint(task, 1);
            if (progress >= 1) {
              setBuilt(task.element);
              visible.delete(task.element);
              if (box) box.style.opacity = "0";
              positionCursor(task.slot, task.moveToX, task.moveToY, 0);
              active.splice(index, 1);
            }
          }
        }

      }

      if (!pausedRef.current && tourPendingRef.current && heroIsBuilt()) beginTour(now);
      if (!pausedRef.current && tourRunningRef.current) {
        const duration = 34_000;
        const progress = Math.min(1, (now - tourStartRef.current) / duration);
        const eased = easeInOut(progress);
        const position = tourFromRef.current + (tourToRef.current - tourFromRef.current) * eased;
        expectedScrollRef.current = position;
        window.scrollTo(0, position);
        if (progress >= 1) stopTour();
      }

      frame = window.requestAnimationFrame(tick);
    };

    const onScroll = () => {
      instantBuildPast();
      scanVisibleTargets();
      if (tourRunningRef.current && Math.abs(window.scrollY - expectedScrollRef.current) > 4) {
        stopTour();
      }
    };

    const onUserScrollIntent = () => {
      if (tourRunningRef.current) stopTour();
    };

    const toggleAgents = () => {
      const next = !enabledRef.current;
      enabledRef.current = next;
      setAgentsEnabled(next);
      document.documentElement.dataset.agents = next ? "on" : "off";
      if (next) {
        try {
          localStorage.setItem("portfolio-agents", "on");
        } catch {}
        document.documentElement.classList.add("build-mode");
        targets.forEach((element) => {
          delete element.dataset.built;
          delete element.dataset.buildState;
          delete element.dataset.buildProgress;
          element.style.removeProperty("--build-progress");
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
          if (element.getBoundingClientRect().bottom < 0) setBuilt(element);
          else observer.observe(element);
        });
        instantBuildPast();
        scanVisibleTargets();
        setBooting(false);
        if (!frame) frame = window.requestAnimationFrame(tick);
      } else {
        try {
          localStorage.setItem("portfolio-agents", "off");
        } catch {}
        document.documentElement.classList.remove("build-mode");
        targets.forEach(setBuilt);
        visible.clear();
        waiting.clear();
        active.length = 0;
        hideCursors();
      }
    };

    const startTour = () => {
      if (tourRunningRef.current || tourPendingRef.current) {
        stopTour();
        return;
      }
      try {
        sessionStorage.setItem("portfolio-tour", "1");
      } catch {
        tourPendingRef.current = true;
        if (!frame) frame = window.requestAnimationFrame(tick);
        return;
      }
      window.location.reload();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stopTour();
        return;
      }
      if (event.target instanceof HTMLElement && /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
      if (event.key.toLowerCase() === "t") startTour();
      if (event.key.toLowerCase() === "a") toggleAgents();
      if (event.key.toLowerCase() === "p") {
        pausedRef.current = !pausedRef.current;
        setPaused(pausedRef.current);
      }
    };

    const onPause = () => {
      pausedRef.current = !pausedRef.current;
      setPaused(pausedRef.current);
    };

    const onTourClick = () => startTour();
    const onAgentsClick = () => toggleAgents();
    const onVisibilityChange = () => {
      if (document.hidden) lastFrame = 0;
    };

    if (enabledRef.current) {
      targets.forEach((element) => {
        delete element.dataset.built;
      });
      bootTimer = window.setTimeout(() => {
        setBooting(false);
        targets.forEach((element) => observer.observe(element));
        instantBuildPast();
        scanVisibleTargets();
        frame = window.requestAnimationFrame(tick);
      }, 620);
      hideCursors();
    } else {
      targets.forEach(setBuilt);
      setBooting(false);
      if (tourPendingRef.current) frame = window.requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onUserScrollIntent, { passive: true });
    window.addEventListener("touchstart", onUserScrollIntent, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.querySelector("[data-agent-pause]")?.addEventListener("click", onPause);
    document.querySelector("[data-agent-toggle]")?.addEventListener("click", onAgentsClick);
    document.querySelector("[data-agent-tour]")?.addEventListener("click", onTourClick);

    return () => {
      window.clearTimeout(bootTimer);
      if (frame) window.cancelAnimationFrame(frame);
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onUserScrollIntent);
      window.removeEventListener("touchstart", onUserScrollIntent);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.querySelector("[data-agent-pause]")?.removeEventListener("click", onPause);
      document.querySelector("[data-agent-toggle]")?.removeEventListener("click", onAgentsClick);
      document.querySelector("[data-agent-tour]")?.removeEventListener("click", onTourClick);
    };
  }, []);

  useEffect(() => {
    enabledRef.current = agentsEnabled;
    pausedRef.current = paused;
    tourRunningRef.current = tourRunning;
  }, [agentsEnabled, paused, tourRunning]);

  return (
    <>
      <div className="boot-loader" data-boot={booting ? "true" : "false"} aria-hidden="true">
        <span className="boot-mark">GH<span>.</span></span>
        <span className="boot-status">ASSEMBLING PORTFOLIO</span>
        <span className="boot-progress"><i /></span>
      </div>

      <div className="agent-layer" aria-hidden="true">
        {Array.from({ length: MAX_ACTIVE }, (_, index) => (
          <div
            className="agent-pointer"
            key={index}
            ref={(node) => { cursorRefs.current[index] = node; }}
          >
            <svg className="pointer-arrow" viewBox="0 0 22 28" fill="none">
              <path d="M2 2L19 17L11.8 18.3L15.4 25.2L11.8 27L8.4 20.1L3.5 25.3L2 2Z" />
            </svg>
            <span className="agent-tag">
              <span className="robot-head">
                <i className="robot-antenna" />
                <i className="robot-eye robot-eye-left" />
                <i className="robot-eye robot-eye-right" />
              </span>
              <span className="agent-name" />
            </span>
          </div>
        ))}
        {Array.from({ length: MAX_ACTIVE }, (_, index) => (
          <div
            className="blueprint-box"
            key={index}
            ref={(node) => { boxRefs.current[index] = node; }}
          >
            <i className="corner top-left" />
            <i className="corner top-right" />
            <i className="corner bottom-left" />
            <i className="corner bottom-right" />
            <span className="blueprint-label" />
          </div>
        ))}
      </div>

      <div className="agent-dock" aria-label="Animation controls">
        <button
          type="button"
          className="dock-button"
          data-agent-pause
          aria-label={paused ? "Resume building" : "Pause building"}
          title={paused ? "Resume (P)" : "Pause (P)"}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          <span>{paused ? "Resume" : "Pause"}</span>
        </button>
        <button
          type="button"
          className={`dock-button ${agentsEnabled ? "dock-active" : ""}`}
          data-agent-toggle
          aria-pressed={agentsEnabled}
          aria-label={`${agentsEnabled ? "Turn off" : "Turn on"} building agents`}
          title="Toggle agents (A)"
        >
          <Users size={14} aria-hidden="true" />
          <span>Agents {agentsEnabled ? "on" : "off"}</span>
        </button>
        <button
          type="button"
          className={`dock-button ${tourRunning ? "dock-active" : ""}`}
          data-agent-tour
          aria-label={tourRunning ? "Stop site tour" : "Start site tour"}
          title={tourRunning ? "Stop tour (Esc)" : "Tour (T)"}
        >
          {tourRunning ? <Pause size={14} aria-hidden="true" /> : <RotateCcw size={14} aria-hidden="true" />}
          <span>{tourRunning ? "Stop tour" : "Tour"}</span>
        </button>
        <span className="dock-shortcuts" aria-hidden="true">T / A / P</span>
      </div>
    </>
  );
}
