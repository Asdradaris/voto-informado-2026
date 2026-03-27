import { Link, useLocation } from "react-router-dom";
import { Vote, GitCompareArrows, Trophy, BookOpen, BarChart3 } from "lucide-react";
import { CountdownTimer } from "../ui/CountdownTimer";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/", label: "Candidatos", icon: Vote },
  { path: "/encuesta", label: "Encuesta", icon: BarChart3 },
  { path: "/compare", label: "Comparar", icon: GitCompareArrows },
  { path: "/ranking", label: "Mi Ranking", icon: Trophy },
  { path: "/methodology", label: "Metodología", icon: BookOpen },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#06060F]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15">
            <Vote className="h-5 w-5 text-amber-400" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-bold tracking-wide text-gray-100">
              VOTO INFORMADO
            </h1>
            <p className="text-[10px] font-medium tracking-widest text-amber-500/70">
              ELECCIONES 2026
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-amber-500/10 text-amber-400"
                  : "text-gray-400 hover:bg-white/[0.05] hover:text-gray-200"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CountdownTimer />
        </div>
      </div>
    </header>
  );
}
