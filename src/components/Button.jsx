// One button, three looks. Works as <button> or <a> via the `as` prop.
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all duration-300 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent " +
  "motion-reduce:transition-none motion-reduce:transform-none disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-accent text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl",
  ghost: "border border-white/30 bg-white/10 text-white hover:bg-white/20",
  outline: "border border-border bg-card text-foreground hover:bg-secondary",
};

const Button = ({ as: Tag = "button", variant = "primary", className = "", ...props }) => {
  const typeProp = Tag === "button" && !props.type ? { type: "button" } : {};
  return (
    <Tag
      className={`${base} ${variants[variant]} ${className}`}
      {...typeProp}
      {...props}
    />
  );
};

export default Button;
