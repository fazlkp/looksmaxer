import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import { ScrollProgressBar, ScrollToTopButton } from "./components/ScrollProgress";
import { AuthProvider } from "./context/AuthContext";

const Home          = lazy(() => import("./pages/Home"));
const Female        = lazy(() => import("./pages/Female"));
const About         = lazy(() => import("./pages/About"));
const FaceAnalysis  = lazy(() => import("./pages/FaceAnalysis"));
const VoiceAnalysis = lazy(() => import("./pages/VoiceAnalysis"));
const BodyAnalysis  = lazy(() => import("./pages/BodyAnalysis"));
const Register      = lazy(() => import("./pages/Register"));
const Login         = lazy(() => import("./pages/Login"));
const Payment       = lazy(() => import("./pages/Payment"));
const Profile       = lazy(() => import("./pages/Profile"));
const NotFound      = lazy(() => import("./pages/NotFound"));

import { initRevealObserver } from "./utils";

function RouteChangeHandler() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setTimeout(initRevealObserver, 150);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  return null;
}

function Layout({ children, showFooter = true }) {
  return (
    <>
      <Navbar />
      <main className="pt-[56px]">{children}</main>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteChangeHandler />
        <ScrollProgressBar />
        <ScrollToTopButton />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/female" element={<Layout><Female /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/face-analysis" element={<Layout><FaceAnalysis /></Layout>} />
            <Route path="/voice-analysis" element={<Layout><VoiceAnalysis /></Layout>} />
            <Route path="/body-analysis" element={<Layout><BodyAnalysis /></Layout>} />
            <Route path="/register" element={<Layout showFooter={false}><Register /></Layout>} />
            <Route path="/login" element={<Layout showFooter={false}><Login /></Layout>} />
            <Route path="/payment" element={<Layout showFooter={false}><Payment /></Layout>} />
            <Route path="/profile" element={<Layout showFooter={false}><Profile /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}