import { Link } from "react-router-dom";
import { Vote } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10">
        <Vote className="h-8 w-8 text-amber-400" />
      </div>
      <h1 className="text-2xl font-bold text-gray-100">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-400">
        La página que buscas no existe o fue movida. Regresa al inicio para
        explorar candidatos.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-amber-500/15 px-6 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/25"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
