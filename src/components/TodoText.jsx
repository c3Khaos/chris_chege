import { IS_PROD, isTodo, publicText } from "../lib/utils";

// Real copy renders normally. From a "TODO:" marker onward, the text becomes an
// amber-badged prompt in dev, so half-finished copy shows exactly where the gap is.
// In a production build the TODO part is never rendered: visitors only see real copy.
const TodoText = ({ text, className = "" }) => {
  if (IS_PROD) {
    const real = publicText(text);
    return real ? <span className={className}>{real}</span> : null;
  }
  if (!isTodo(text)) return <span className={className}>{text}</span>;

  const source = text || "";
  const at = source.search(/\bTODO\b/);
  const done = at > 0 ? source.slice(0, at).trim() : "";
  const prompt =
    (at >= 0 ? source.slice(at) : source).replace(/^\s*TODO:?\s*/, "") || "Write this.";

  return (
    <span className={className}>
      {done && <>{done} </>}
      <span className="mr-2 rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-background">
        Todo
      </span>
      <span className="italic text-foreground/70">{prompt}</span>
    </span>
  );
};

export default TodoText;