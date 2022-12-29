import {
  MiniChart,
  AdvancedRealTimeChart,
  EconomicCalendar,
  CryptoCurrencyMarket,
} from "react-ts-tradingview-widgets";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    let divsToDelete: any = document.querySelectorAll(
      "#tradingview_widget_wrapper"
    );

    if (divsToDelete) {
      divsToDelete.forEach((div: any) => {
        const children = div.children[1];
        if (children) {
          children.remove();
        }
      });
    }
  });

  return (
    <section className="home-section">
      <div className="home-content flex w-full flex-col">
        <div className="mx-auto grid w-full grid-cols-1 gap-4 p-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-10">
          <MiniChart colorTheme="dark" symbol="BTC/USD" autosize></MiniChart>
          <MiniChart colorTheme="dark" symbol="ETH/USD" autosize></MiniChart>
          <MiniChart colorTheme="dark" symbol="BNB/USD" autosize></MiniChart>
          <MiniChart colorTheme="dark" symbol="MATIC/USD" autosize></MiniChart>
        </div>
        <div className="mx-auto w-full pl-8 pr-8">
          <AdvancedRealTimeChart
            theme="dark"
            width="100%"
            symbol="BTC/USD"
            height={550}></AdvancedRealTimeChart>
        </div>
        <div className="mx-auto grid w-full grid-cols-1 gap-4 p-8 xl:grid-cols-3 xl:gap-10">
          <div className="xl:col-span-1">
            <EconomicCalendar
              colorTheme="dark"
              width="100%"
              height={600}></EconomicCalendar>
          </div>
          <div className="xl:col-span-2">
            <CryptoCurrencyMarket
              colorTheme="dark"
              width="100%"
              height={600}></CryptoCurrencyMarket>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
