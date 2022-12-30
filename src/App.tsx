import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import BitcoinBasics from "./pages/BitcoinBasics";
import MarketIndicators from "./pages/MarketIndicators";
import EconomicIndicators from "./pages/EconomicIndicators";
import Transactions from "./pages/Transactions";
import Mining from "./pages/Mining";
import Arbitrage from "./pages/Arbitrage";
import News from "./pages/News";
import Settings from "./pages/Settings";
import OnChainIndicators from "./pages/OnChainIndicators";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bitcoin-basics" element={<BitcoinBasics />} />
          <Route path="/market-indicators" element={<MarketIndicators />} />
          <Route path="/on-chain-indicators" element={<OnChainIndicators />} />
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
