import { isTodo } from "../lib/utils";

// Real copy renders normally. From a "TODO:" marker onward, the text becomes an
// amber-badged prompt, so half-finished copy shows exactly where the gap is and
// can't slip into production unnoticed.
const TodoText = ({ text, className = "" }) => {
  if (!isTodo(text)) return <span className={className}>{text}</span>;

  const source = text || "";
  const at = source.search(/\bTODO\b/);
  const done = at > 0 ? source.slice(0, at).trim() : "";
  const prompt =
    (at >= 0 ? source.slice(at) : source).replace(/^\s*TODO:?\s*/, "") || "Write this.";

  return (
    <span className={className}>
      {done && <>{done} </>}
      <span className="mr-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600">
        Todo
      </span>
      <span className="italic text-muted-foreground">{prompt}</span>
    </span>
  );
};

export default TodoText;