import "../styles/Button.css";

export default function Button({
  label,
  variant = "primary",
  fullWidth = false,
  onClick,
  disabled = false,
  type = "button",
}) {
  const classes = `chem-btn chem-btn-${variant} ${
    fullWidth ? "full-width" : ""
  }`;

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
}

