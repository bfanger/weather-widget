import { cn } from "@/services/cn";

interface Props {
  x: number;
  y: number;
  value: string | number;
  digits?: number;
  signed?: boolean;
}
export default function DashboardValue({
  x,
  y,
  value,
  digits = 0,
  signed = false,
}: Props) {
  const display =
    typeof value === "number"
      ? Math.abs(value).toString().padStart(digits, "0")
      : value;
  const sign =
    typeof value === "number" && signed ? (
      <span className={value >= 0 ? "opacity-20" : ""}>
        {value > 0 ? "+" : "-"}
      </span>
    ) : null;

  return (
    <div
      className={cn(
        "absolute rounded-xs border-b border-l border-slate-500 bg-slate-950 px-2 py-1 font-dseg14 leading-none font-bold shadow-[inset_0_0.2em_0.4em_rgba(0,0,0,0.9)]",
      )}
      style={{ left: `${x}em`, top: `${y}em` }}
    >
      {typeof value === "number" && (
        <div className="absolute top-1 right-2 -skew-x-6 text-[3.4em] opacity-10">
          {"0".repeat(display.length)}
        </div>
      )}
      <div className="-skew-x-6 text-[3.4em] blur-xs">
        {sign}
        {display}
      </div>
      <div
        className="absolute top-1 -skew-x-6 text-[3.4em] opacity-80"
        data-testid="dashboard-value"
      >
        {sign}
        {display}
      </div>
    </div>
  );
}
