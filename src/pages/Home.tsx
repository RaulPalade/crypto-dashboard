import { MiniChart } from "react-ts-tradingview-widgets";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    let divsToDelete: any = document.querySelectorAll(
      "#tradingview_widget_wrapper"
    );
    let tradingViewLogosToDelete: any = document.querySelectorAll(
      ".tv-embed-widget-wrapper"
    );

    console.log(divsToDelete);
    if (divsToDelete) {
      divsToDelete.forEach((div: any) => {
        const children = div.children[1];
        if (children) {
          children.remove();
        }
      });
    }

    console.log(tradingViewLogosToDelete);
    if (tradingViewLogosToDelete) {
      tradingViewLogosToDelete.forEach((div: any) => {
        const children = div.children[1].lastChild;
        console.log(children);
        if (children) {
          children.remove();
        }
      });
    }
  });

  return (
    <section className="home-section">
      <div className="home-content">
        <div>
          <MiniChart
            colorTheme="dark"
            width="100%"
            symbol="BTC/USD"
          ></MiniChart>
          <MiniChart
            colorTheme="dark"
            width="100%"
            symbol="ETH/USD"
          ></MiniChart>
          <MiniChart
            colorTheme="dark"
            width="100%"
            symbol="BNB/USD"
          ></MiniChart>
        </div>
      </div>
    </section>
  );
}

export default Home;
