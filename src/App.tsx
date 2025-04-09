
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Market from "./pages/Market";
import Properties from "./pages/Properties";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import Calculator from "./pages/Calculator";
import Neighborhoods from "./pages/Neighborhoods";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./App.css";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow py-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/market" element={<Market />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/neighborhoods" element={<Neighborhoods />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </LanguageProvider>
  );
}

export default App;
