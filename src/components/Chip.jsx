const sizes = {
  md: "px-3.5 py-1.5 text-sm",
  sm: "px-2.5 py-1 text-xs",
};

// Toggle chip used for skill filters. `count` shows how many projects back the skill.
// Pressed chips sit flat and turn ink (see .brut-chip in portfolio.css).
const Chip = ({ active = false, size = "md", count, onClick, children }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`brut-chip rounded-full font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${sizes[size]} ${
      active ? "bg-foreground text-background" : "bg-card text-card-foreground"
    }`}
  >
    {children}
    {typeof count === "number" && (
      <span
        className={`ml-1.5 rounded-full px-1.5 font-mono text-xs ${
          active ? "bg-background/20" : "bg-secondary text-foreground"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

export default Chip;