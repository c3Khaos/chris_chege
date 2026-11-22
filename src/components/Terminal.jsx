import { useEffect, useRef, useState } from "react";
import { runCommand, COMMAND_NAMES } from "../lib/commands";
import { projects } from "../data/profile";
import { prefersReducedMotion } from "../lib/utils";

const QUICK = ["help", "whoami", "projects", "skills"];
const MAX_LINES = 200;

const lineStyle = {
  cmd: "text-neutral-100",
  out: "text-neutral-300",
  ok: "text-emerald-400",
  err: "text-red-400",
  boot: "text-neutral-500",
};

const BOOT = [
  { kind: "boot", text: "[ ok ] profile loaded" },
  { kind: "boot", text: `[ ok ] ${projects.length} projects loaded` },
  { kind: "boot", text: "[ ok ] ready. type 'help', or use the buttons below." },
];

// What the terminal shows after the boot lines, so it is never an empty box.
const introLines = (handlers) => [
  { kind: "cmd", text: "whoami" },
  ...runCommand("whoami", handlers),
  { kind: "cmd", text: "projects" },
  ...runCommand("projects", handlers),
];

// Cheap syntax highlighting for output lines.
const TOKENS = /(\[ ok \]|\[x\]|\[ \]|https?:\/\/\S+|'[^']+'|^\d+(?=\s))/;
const Highlight = ({ text }) =>
  text.split(TOKENS).map((part, i) => {
    if (!part) return null;
    if (part === "[ ok ]" || part === "[x]")
      return <span key={i} className="text-emerald-400">{part}</span>;
    if (part === "[ ]") return <span key={i} className="text-neutral-600">{part}</span>;
    if (/^https?:/.test(part))
      return <span key={i} className="text-sky-400 underline decoration-sky-400/40">{part}</span>;
    if (part.startsWith("'") && part.endsWith("'"))
      return <span key={i} className="text-amber-300">{part}</span>;
    if (/^\d+$/.test(part))
      return <span key={i} className="font-bold text-accent">{part}</span>;
    return part;
  });

const Prompt = () => (
  <span className="mr-2 select-none">
    <span className="text-emerald-400">guest</span>
    <span className="text-neutral-500">@</span>
    <span className="text-accent">nairobi</span>
    <span className="text-neutral-500">:~$</span>
  </span>
);

const nairobiTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

const Terminal = ({ onGoto, onFilter, onOpen }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(true); // true while the intro animation owns the input
  const [busy, setBusy] = useState(false); // true while output is still streaming in
  const [time, setTime] = useState(nairobiTime);
  const autoRef = useRef(true);
  const historyRef = useRef([]);
  const cursorRef = useRef(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  const handlers = { onGoto, onFilter, onOpen };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // Live Nairobi clock in the title bar.
  useEffect(() => {
    const id = setInterval(() => setTime(nairobiTime()), 15000);
    return () => clearInterval(id);
  }, []);

  // Print lines one after another, like a real process writing to stdout.
  const stream = (arr, delay = 55) => {
    if (!arr.length) return;
    if (prefersReducedMotion()) {
      setLines((l) => [...l, ...arr].slice(-MAX_LINES));
      return;
    }
    setBusy(true);
    arr.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => {
          setLines((l) => [...l, line].slice(-MAX_LINES));
          if (i === arr.length - 1) setBusy(false);
        }, i * delay)
      );
    });
  };

  const stopAuto = () => {
    if (!autoRef.current) return;
    autoRef.current = false;
    setTyping(false);
    setInput("");
  };

  const execute = (raw) => {
    const text = raw.trim();
    const echo = { kind: "cmd", text: raw };
    if (!text) {
      setLines((l) => [...l, echo].slice(-MAX_LINES));
      return;
    }
    historyRef.current.push(text);
    cursorRef.current = -1;
    const result = runCommand(text, handlers);
    if (result === null) {
      clearTimers();
      setBusy(false);
      setLines([]);
      return;
    }
    stream([echo, ...result]);
  };

  // Intro: boot lines, then type "whoami" once so the terminal visibly does something.
  // Any interaction cancels the typing. Reduced-motion users get everything instantly.
  useEffect(() => {
    if (!autoRef.current) return undefined;

    if (prefersReducedMotion()) {
      autoRef.current = false;
      setTyping(false);
      setLines([...BOOT, ...introLines(handlers)]);
      return undefined;
    }

    stream(BOOT, 170);

    const word = "whoami";
    let i = 0;
    let timer;
    const step = () => {
      if (!autoRef.current) return;
      if (i < word.length) {
        i += 1;
        setInput(word.slice(0, i));
        timer = setTimeout(step, 90);
      } else {
        timer = setTimeout(() => {
          if (!autoRef.current) return;
          autoRef.current = false;
          setTyping(false);
          setInput("");
          stream(introLines(handlers), 45);
        }, 350);
      }
    };
    timer = setTimeout(step, 1100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest line in view without scrolling the page itself.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const focusInput = () => {
    if (window.getSelection()?.toString()) return; // don't steal focus from a text selection
    inputRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e) => {
    const history = historyRef.current;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      cursorRef.current = Math.min(cursorRef.current + 1, history.length - 1);
      setInput(history[history.length - 1 - cursorRef.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursorRef.current = Math.max(cursorRef.current - 1, -1);
      setInput(
        cursorRef.current === -1 ? "" : history[history.length - 1 - cursorRef.current]
      );
    } else if (e.key === "Tab") {
      const value = input.trimStart().toLowerCase();
      if (value && !value.includes(" ")) {
        const matches = COMMAND_NAMES.filter((c) => c.startsWith(value));
        if (matches.length === 1) {
          e.preventDefault();
          setInput(`${matches[0]} `);
        }
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clearTimers();
      setBusy(false);
      setLines([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (typing || busy) return;
    execute(input);
    setInput("");
  };

  // A soft light follows the cursor across the glass.
  const onPointerMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onPointerMove={onPointerMove}
      className="term-glow term-scan group/term relative overflow-hidden rounded-xl border border-accent/30 bg-neutral-950 text-left font-mono text-sm"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover/term:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 25%), color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%)",
        }}
      />

      <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-3" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-neutral-500">guest@nairobi: ~</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-neutral-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Nairobi {time}
        </span>
      </div>

      <div
        ref={bodyRef}
        onClick={focusInput}
        className="relative h-80 cursor-text overflow-y-auto px-4 py-3 md:h-[26rem]"
      >
        <div role="log" aria-live="polite">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words leading-relaxed ${lineStyle[line.kind]}`}
            >
              {line.kind === "cmd" ? (
                <>
                  <Prompt />
                  {line.text}
                </>
              ) : (
                <Highlight text={line.text} />
              )}
            </p>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex items-center">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <Prompt />
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            readOnly={typing}
            onChange={(e) => setInput(e.target.value)}
            onFocus={stopAuto}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={typing || busy ? "" : "type a command"}
            className="min-w-0 flex-1 bg-transparent text-base text-neutral-100 caret-accent outline-none placeholder:text-neutral-600 md:text-sm"
          />
        </form>
      </div>

      <div className="relative flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
        <span className="text-xs text-neutral-500">try:</span>
        {QUICK.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              if (busy) return;
              stopAuto();
              execute(cmd);
            }}
            className="rounded border border-white/15 px-2 py-1 text-xs text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-[0_0_14px_-2px] hover:shadow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;