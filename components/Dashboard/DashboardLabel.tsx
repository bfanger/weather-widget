interface Props {
  x: number;
  y: number;
  label: string;
  variant?: "default" | "black";
}

export default function DashboardLabel({
  x,
  y,
  label,
  variant = "default",
}: Props) {
  return (
    <span
      className={`absolute border-t border-r px-2 py-px font-saira font-semibold tracking-wider uppercase shadow-[-2px_0em_2px_0px_rgba(0,0,0,0.6)] ${
        variant === "black"
          ? "border-slate-700/50 bg-neutral-950/90 text-gray-400"
          : "border-rose-900/50 bg-rose-950/90 text-slate-300"
      }`}
      style={{ left: `${x}em`, top: `${y}em` }}
    >
      {label}
    </span>
  );
}
