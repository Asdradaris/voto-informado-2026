import { Link, useLocation } from "react-router-dom";
import { Vote, GitCompareArrows, Trophy, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/", label: "Candidatos", icon: Vote },
  { path: "/encuesta", label: "Encuesta", icon: BarChart3 },
  { path: "/compare", label: "Comparar", icon: GitCompareArrows },
  { path: "/ranking", label: "Ranking", icon: Trophy },
  { path: "/methodology", label: "Info", icon: BookOpen },
];

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-[#06060F]/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] transition-colors sm:gap-1 sm:px-3 sm:py-1.5 sm:text-xs",
              location.pathname === item.path
                ? "text-amber-400"
                : "text-gray-500"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
