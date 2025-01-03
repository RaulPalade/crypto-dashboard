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
import BitcoinRainbowChart from "./pages/bitcoin_basics/BitcoinRainbowChart";
import BitcoinSupply from "./pages/bitcoin_basics/BitcoinSupply";
import BitcoinHalving from "./pages/bitcoin_basics/BitcoinHalving";
import BitcoinBalanceDistribution from "./pages/bitcoin_basics/BitcoinBalanceDistribution";

// Market Indicators
import RunningROI from "./pages/market_indicators/RunningROI";
import BitcoinBullMarketSupportBands from "./pages/market_indicators/BitcoinBullMarketSupportBands";
import MonthlyReturns from "./pages/market_indicators/MonthlyReturns";
import LongTermMovingAverage from "./pages/market_indicators/LongTermMovingAverage";
import BtcPriceDrawdown from "./pages/market_indicators/BTCPriceDrawdown";

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
          <Route
            path="/bitcoin-basics/bitcoin-rainbow-chart"
            element={<BitcoinRainbowChart />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-supply"
            element={<BitcoinSupply />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-halving"
            element={<BitcoinHalving />}
          />
          <Route
            path="/bitcoin-basics/bitcoin-balance-distribution"
            element={<BitcoinBalanceDistribution />}
          />

          <Route path="/market-indicators" element={<MarketIndicators />} />
          <Route
            path="/market-indicators/running-roi"
            element={<RunningROI />}
          />
          <Route
            path="/market-indicators/bull-market-support-bands"
            element={<BitcoinBullMarketSupportBands />}
          />

          <Route
            path="/market-indicators/monthly-returns"
            element={<MonthlyReturns />}
          />

          <Route
            path="/market-indicators/long-term-moving-average"
            element={<LongTermMovingAverage />}
          />

          <Route
            path="/market-indicators/drawdown-from-ath"
            element={<BtcPriceDrawdown />}
          />
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
