import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import BitcoinFundamentals from "./pages/BitcoinFundamentals";
import MainIndicators from "./pages/MainIndicators";
import EconomicIndicators from "./pages/EconomicIndicators";
import Transactions from "./pages/Transactions";
import Mining from "./pages/Mining";
import Arbitrage from "./pages/Arbitrage";
import News from "./pages/News";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bitcoin-fundamentals"
            element={<BitcoinFundamentals />}
          />
          <Route path="/main-indicators" element={<MainIndicators />} />
          <Route path="/economic-indicators" element={<EconomicIndicators />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/mining" element={<Mining />} />
          <Route path="/arbitrage" element={<Arbitrage />} />
          <Route path="/news" element={<News />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
