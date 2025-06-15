import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Market from "./pages/Market";
import Properties from "./pages/Properties";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Calculator from "./pages/Calculator";
import Neighborhoods from "./pages/Neighborhoods";
import Auth from "./pages/Auth";
import SAAS from './pages/SAAS';
import { LanguageProvider } from "./contexts/LanguageContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DarkModeProvider>
          <LanguageProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/market" element={<Market />} />
                  <Route path="/analysis" element={<Analysis />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/neighborhoods" element={<Neighborhoods />} />
                  <Route path="/calculator" element={<Calculator />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/saas" element={<SAAS />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </LanguageProvider>
        </DarkModeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
