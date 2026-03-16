import { DISCLAIMER } from "../../config/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#06060F] pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-xs leading-relaxed text-gray-500">{DISCLAIMER}</p>
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
          <span>Proyecto ciudadano independiente</span>
          <span>&middot;</span>
          <span>Datos de fuentes públicas</span>
          <span>&middot;</span>
          <span>Código abierto</span>
        </div>
      </div>
    </footer>
  );
}
