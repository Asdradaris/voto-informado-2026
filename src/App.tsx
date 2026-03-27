import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { MobileNav } from "./components/layout/MobileNav";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { Home } from "./pages/Home";
import { NotFoundPage } from "./pages/NotFoundPage";

const CandidatePage = lazy(() =>
  import("./pages/CandidatePage").then((m) => ({ default: m.CandidatePage }))
);
const ComparePage = lazy(() =>
  import("./pages/ComparePage").then((m) => ({ default: m.ComparePage }))
);
const RankingPage = lazy(() =>
  import("./pages/RankingPage").then((m) => ({ default: m.RankingPage }))
);
const MethodologyPage = lazy(() =>
  import("./pages/MethodologyPage").then((m) => ({
    default: m.MethodologyPage,
  }))
);
const VotePage = lazy(() =>
  import("./pages/VotePage").then((m) => ({ default: m.VotePage }))
);
const ResultsPage = lazy(() =>
  import("./pages/ResultsPage").then((m) => ({ default: m.ResultsPage }))
);

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500/30 border-t-amber-500" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-[#06060F] text-gray-100">
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/candidate/:id" element={<CandidatePage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
              <Route path="/encuesta" element={<VotePage />} />
              <Route path="/resultados" element={<ResultsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <MobileNav />
      </div>
    </BrowserRouter>
  );
}
