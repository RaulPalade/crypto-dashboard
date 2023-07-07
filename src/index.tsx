import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style/page_structure.css";
import "./style/sidebar.css";
import "./style/table.css";
import "./style/chart.css";
import "./style/modal_coin_list.css";
import "./style/arbitrage_card.css";
import "./style/mining_card.css";
import "./style/style_news.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
