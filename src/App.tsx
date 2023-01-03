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
import Bitcoin2YearMa from "./pages/bitcoin_basics/Bitcoin2YearMA";
import Bitcoin200WeekMAHeatmap from "./pages/bitcoin_basics/Bitcoin200WeekMAHeatmap";
import BitcoinFearAndGreedIndex from "./pages/bitcoin_basics/BitcoinFearAndGreedIndex";
import BitcoinPiCycleTop from "./pages/bitcoin_basics/BitcoinPiCycleTop";

function App() {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bitcoin-basics" element={<BitcoinBasics />} />
          <Route
            path="/bitcoin-basics/bitcoin-2-year-ma"
            element={<Bitcoin2YearMa />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-200-week-ma"
            element={<Bitcoin200WeekMAHeatmap />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-fear-and-greed"
            element={<BitcoinFearAndGreedIndex />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-pi-cycle-top"
            element={<BitcoinPiCycleTop />}
          />
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
