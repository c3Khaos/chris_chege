// One button, three looks. Works as <button> or <a> via the `as` prop.
// Hard-shadow style: lifts on hover, presses flat on click (see .brut-hover in portfolio.css).
const base =
  "brut-hover inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-bold " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-accent text-white",
  ghost: "bg-card text-foreground",
  outline: "bg-card text-foreground",
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