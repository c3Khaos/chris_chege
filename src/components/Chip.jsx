const sizes = {
  md: "px-3 py-1.5 text-sm",
  sm: "px-2 py-1 text-xs",
};

// Toggle chip used for skill filters. `count` shows how many projects back the skill.
const Chip = ({ active = false, size = "md", count, onClick, children }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none ${sizes[size]} ${
      active
        ? "bg-accent text-white"
        : "border border-border bg-card text-card-foreground hover:border-accent hover:text-accent"
    }`}
  >
    {children}
    {typeof count === "number" && (
      <span
        className={`ml-1.5 rounded px-1 text-xs ${
          active ? "bg-white/20" : "bg-secondary text-muted-foreground"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

export default Chip;
