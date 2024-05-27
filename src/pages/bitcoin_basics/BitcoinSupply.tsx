import { useState, useEffect } from "react";
import PieCard from "../../components/PieCard";
import Description from "../../components/Description";
import Header from "../../components/Header";
import { ChartDataset } from "chart.js";
import CustomChartJS from "../../components/CustomChartJS";

function BitcoinSupply() {
  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([]);
  const labels = [
    "BTC On Exchanges",
    "Zombie Coins",
    "BTC owned by Satoshi Nakamoto",
    "BTC in Grayscale Bitcoin Trust",
    "BTC Mined Per Year",
    "BTC Used On Ethereum",
    "BTC Seized From Plus Token Scam",
    "BTC Still In Mt Gox Wallets",
    "BTC Bought By Microstrategy",
    "BTC Seized By US Authorities (Bitfinex Hack)",
    "BTC Bought By Tim Draper",
    "BTC Owned By Tesla",
    "BTC Paid For Pizza In 2010",
    "BTC In Public Lightning Channels",
    "Rest Of Supply In Circulation",
  ];
  const data = [
    2419000, 1364000, 1125000, 637000, 328500, 281000, 194775, 138000, 130000,
    94000, 30000, 10800, 10000, 5000, 12475000,
  ];

  const colors = [
    "rgba(255, 99, 71, 1)",
    "rgba(255, 213, 106, 1)",
    "rgba(0, 168, 255, 1)",
    "rgba(0, 95, 255, 1)",
    "rgba(0, 172, 0, 1)",
    "rgba(0, 172, 192, 1)",
    "rgba(255, 172, 192, 1)",
    "rgba(255, 172, 77, 1)",
    "rgba(255, 14, 77, 1)",
    "rgba(0, 59, 84, 1)",
    "rgba(255, 152, 106, 1)",
    "rgba(0, 172, 0, 1)",
    "rgba(0, 172, 192, 1)",
    "rgba(0, 168, 120, 1)",
    "rgba(105, 195, 255, 1)",
  ];

  useEffect(() => {
    createChartDatasets(data, colors);
  }, []);

  function createChartDatasets(data: number[], colors: string[]) {
    const datasets: any[] = [];

    datasets.push({
      label: "BTC Supply",
      data: data,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
      showLine: false,
      pointRadius: 0,
    });

    setChartDatasets(datasets);
  }
  return (
    <section className="home-section">
      <div className="home-content flex w-full flex-col">
        <div>
          <div className="mr-11 space-y-6">
            <Header text="Bitcoin Supply" />
            <Description
              text={
                <>
                  <b>BTC On Exchanges:</b> Coins in Cold Storage from Huobi,
                  Binance, BitMex, Bitfinex Coinbase & Co.
                  <b>Zombie Coins (Without Sathosi Stash):</b> Zombie Coins that
                  haven't moved since 2010. Excludes Satoshi Nakamoto's Coins.
                  <br></br>
                  <br></br>
                  <b>BTC Owned By Satoshi Nakamoto:</b> The amount of Bitcoin
                  Satoshi Nakamoto likely still has<br></br>
                  <br></br>
                  <b>BTC in Grayscale Bitcoin Trust:</b> The biggest investment
                  fund that holds physical Bitcoin.<br></br>
                  <br></br>
                  <b>BTC Mined Per Year:</b> The number of new Bitcoins that get
                  mined each year until the halving in 2024.<br></br>
                  <br></br>
                  <b>BTC Used On Ethereum:</b> Number of Bitcoins used on
                  Ethereum as WBTC, renBTC...<br></br>
                  <br></br>
                  <b>BTC Seized From Plus Token Scam:</b> Number of Bitcoins the
                  Chinese government seized from the Plus Token Ponzi Scam.
                  <br></br>
                  <br></br>
                  <b>BTC Still In Mt Gox Wallets:</b> Number of remaining
                  Bitcoins in Mt. Gox trustee wallets.<br></br>
                  <br></br>
                  <b>BTC Bought By Microstrategy</b> Bitcoins bought by Michael
                  Saylor for Nasdaq listed Microstrategy as part of their asset
                  reserve.<br></br>
                  <br></br>
                  <b>BTC Seized By US Authorities (Bitfinex Hack):</b>Number of
                  Bitcoins the Department of Justice seized from the Bitfinex
                  Hackers.<br></br>
                  <br></br>
                  <b>BTC Bought By Tim Draper:</b> Bitcoins bought by Tim Draper
                  in 2014 in a US Marshals auction. The Bitcoins originated from
                  The Silk Road.<br></br>
                  <br></br>
                  <b>BTC Owned By Tesla:</b> Bitcoins bought by Tesla Motors.
                  <br></br>
                  <br></br>
                  <b>BTC Paid For Pizza In 2010:</b> The price for two pizzas,
                  paid by Laszlo Hanyecz in one of the first real world Bitcoin
                  transactions in 2010.<br></br>
                  <br></br>
                  <b>BTC In Public Lightning Channels:</b> Number of coins that
                  are locked in public Lightning Channels and can be used in the
                  Lightning Network.<br></br>
                  <br></br>
                  <b>Rest Of Supply In Circulation:</b> Bitcoins still in
                  circulation.<br></br>
                  <br></br>
                </>
              }
            />
          </div>
          <div className="mt-10">
            <PieCard>
              <div className="pie-chart-container flex items-center justify-center">
                <CustomChartJS
                  labels={labels}
                  datasets={chartDatasets}
                  config={{
                    type: "pie",
                    scale: "linear",
                  }}
                />
              </div>
            </PieCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BitcoinSupply;
