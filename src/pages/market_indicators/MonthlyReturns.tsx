import CryptoCompareApi from "../../api/CryptoCompareApi";
import { useEffect, useState } from "react";
import { ChartData } from "../../components/CustomChartJS";
import Header from "../../components/Header";
import TableMonthlyReturns from "../../components/table_monthly_returns/TableMonthlyReturns";

export interface MonthlyReturnsTableColumns {
  label: string;
  accessor: string;
}

function MonthlyReturns() {
  const [bitcointReturns, setBitcointReturns] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: "",
  });
  const [tableData, setTableData] = useState<Map<number, number[]>>();

  const columns: String[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octomber",
    "November",
    "December",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        "BTC",
        "USD",
        1500,
        2
      );

      setBitcointReturns(data);
      console.log(data);

      let returns = calculateMonthlyReturns(data);
      console.log(returns);

      setTableData(returns);
    } catch (error) {
      console.log(error);
    }
  };

  function calculateMonthlyReturn(
    currentValue: number,
    previousValue: number
  ): number {
    return ((currentValue - previousValue) / previousValue) * 100;
  }

  function calculateMonthlyReturns(data: ChartData): Map<number, number[]> {
    const monthlyReturnsMap: Map<number, number[]> = new Map();
    const groupedData: { [year: number]: { [month: number]: number[] } } = {};

    for (let i = 0; i < data.labels.length; i++) {
      const labelParts = data.labels[i].split("/");
      const year = parseInt(labelParts[2], 10);
      const month = parseInt(labelParts[1], 10);
      const value = data.values[i];

      if (!groupedData[year]) {
        groupedData[year] = {};
      }

      if (!groupedData[year][month]) {
        groupedData[year][month] = [];
      }

      groupedData[year][month].push(value);
    }

    for (const year in groupedData) {
      const monthlyReturns: number[] = [];

      for (let month = 1; month <= 12; month++) {
        const values = groupedData[year][month];
        let monthlyReturn = 0;

        if (values && values.length > 1) {
          for (let i = 1; i < values.length; i++) {
            monthlyReturn += calculateMonthlyReturn(values[i], values[i - 1]);
          }
          monthlyReturn /= values.length - 1;
        }

        monthlyReturns.push(monthlyReturn);
      }

      monthlyReturnsMap.set(parseInt(year, 10), monthlyReturns);
    }

    return monthlyReturnsMap;
  }

  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-center p-8">
        <div>
          <Header text="Monthly Returns" />
        </div>
        <div className="mt-8">
          <TableMonthlyReturns
            columns={columns}
            data={tableData ?? new Map<number, number[]>()}
          />
        </div>
      </div>
    </section>
  );
}

export default MonthlyReturns;
