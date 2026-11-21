import { useEffect, useRef, useState } from "react";
import { runCommand, COMMAND_NAMES } from "../lib/commands";
import { prefersReducedMotion } from "../lib/utils";

const PROMPT = "guest:~$";
const QUICK = ["help", "whoami", "projects", "skills"];
const MAX_LINES = 200;

const lineStyle = {
  cmd: "text-neutral-100",
  out: "text-neutral-300",
  ok: "text-emerald-400",
  err: "text-red-400",
};

const Terminal = ({ onGoto, onFilter, onOpen }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(true); // true while the intro animation owns the input
  const autoRef = useRef(true);
  const historyRef = useRef([]);
  const cursorRef = useRef(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  const handlers = { onGoto, onFilter, onOpen };

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
      setLines([]);
      return;
    }
    setLines((l) => [...l, echo, ...result].slice(-MAX_LINES));
  };

  // Intro: type "whoami" once so the terminal visibly does something.
  // Any interaction cancels it. Reduced-motion users get the output instantly.
  useEffect(() => {
    if (!autoRef.current) return undefined;
    const word = "whoami";

    if (prefersReducedMotion()) {
      autoRef.current = false;
      setTyping(false);
      setLines([{ kind: "cmd", text: word }, ...runCommand(word, handlers)]);
      return undefined;
    }

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
          setLines([{ kind: "cmd", text: word }, ...runCommand(word, handlers)]);
        }, 350);
      }
    };
    timer = setTimeout(step, 600);
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
      setLines([]);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (typing) return;
    execute(input);
    setInput("");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950 text-left font-mono text-sm shadow-2xl">
      <div
        className="flex items-center gap-2 border-b border-white/10 px-4 py-3"
        aria-hidden="true"
      >
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-3 text-xs text-neutral-500">guest@portfolio: ~</span>
      </div>

      <div
        ref={bodyRef}
        onClick={focusInput}
        className="h-72 cursor-text overflow-y-auto px-4 py-3 md:h-80"
      >
        <div role="log" aria-live="polite">
          {lines.map((line, i) => (
            <p
              key={i}
              className={`whitespace-pre-wrap break-words leading-relaxed ${lineStyle[line.kind]}`}
            >
              {line.kind === "cmd" && (
                <span className="mr-2 select-none text-accent">{PROMPT}</span>
              )}
              {line.text}
            </p>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex items-center">
          <label htmlFor="terminal-input" className="sr-only">
            Terminal command
          </label>
          <span className="mr-2 select-none text-accent">{PROMPT}</span>
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
            placeholder={typing ? "" : "type a command"}
            className="min-w-0 flex-1 bg-transparent text-base text-neutral-100 caret-accent outline-none placeholder:text-neutral-600 md:text-sm"
          />
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
        <span className="text-xs text-neutral-500">try:</span>
        {QUICK.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => {
              stopAuto();
              execute(cmd);
            }}
            className="rounded border border-white/15 px-2 py-1 text-xs text-neutral-300 transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
