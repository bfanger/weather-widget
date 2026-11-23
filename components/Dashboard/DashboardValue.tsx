import { cn } from "@/services/cn";

interface Props {
  x: number;
  y: number;
  value: string | number;
  variant: "orange" | "green" | "yellow";
  digits?: number;
  signed?: boolean;
}

export default function DashboardValue({
  x,
  y,
  value,
  variant,
  digits = 0,
  signed = false,
}: Props) {
  const padded =
    typeof value === "number" ? value.toString().padStart(digits, "0") : value;
  const display = padded;
  const sign = signed ? <span className="opacity-20">+</span> : null;

  return (
    <div
      className={cn(
        "absolute rounded-xs border-b border-l border-slate-500 bg-slate-950 px-2 py-1 font-dseg14 leading-none font-bold shadow-[inset_0_0.2em_0.4em_rgba(0,0,0,0.9)]",
        variant === "orange" && "text-orange-500",
        variant === "green" && "text-green-500",
        variant === "yellow" && "text-yellow-400",
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
      <div className="absolute top-1 -skew-x-6 text-[3.4em] opacity-80">
        {sign}
        {display}
      </div>
    </div>
  );
}
