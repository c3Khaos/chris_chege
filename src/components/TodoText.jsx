import { isTodo } from "../lib/utils";

// Renders real copy normally. Unfinished copy (starts with "TODO") gets a loud
// badge so it can't slip into production unnoticed.
const TodoText = ({ text, className = "" }) => {
  if (!isTodo(text)) return <span className={className}>{text}</span>;
  const prompt = (text || "").replace(/^\s*TODO:?\s*/i, "") || "Write this.";
  return (
    <span className={className}>
      <span className="mr-2 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-600">
        Todo
      </span>
      <span className="italic text-muted-foreground">{prompt}</span>
    </span>
  );
};

export default TodoText;
