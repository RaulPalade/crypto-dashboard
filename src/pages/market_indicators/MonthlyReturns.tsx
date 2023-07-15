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
      let returns = getMonthlyReturns(data);
      setTableData(returns);
    } catch (error) {
      console.log(error);
    }
  };

  // Funzione per ottenere la mappa dei rendimenti mensili (in percentuale) per ogni anno
  function getMonthlyReturns(data: ChartData): Map<number, number[]> {
    // Verifica che il numero di valori e di etichette sia lo stesso
    if (data.values.length !== data.labels.length) {
      throw new Error("Numero di valori e etichette diversi");
    }

    // Mappa per contenere i rendimenti mensili (in percentuale) per ogni anno
    const yearlyReturnsMap: Map<number, number[]> = new Map();

    // Ciclo attraverso i dati forniti
    for (let i = 1; i < data.labels.length; i++) {
      const currentLabel = data.labels[i];
      const currentValue = data.values[i];
      const prevLabel = data.labels[i - 1];
      const prevValue = data.values[i - 1];

      // Analizza le date dalle etichette correnti e precedenti
      const [currentDay, currentMonth, currentYear] = currentLabel
        .split("/")
        .map(Number);
      const [prevDay, prevMonth, prevYear] = prevLabel.split("/").map(Number);

      // Verifica se l'anno è lo stesso tra le etichette correnti e precedenti
      const isSameYear = currentYear === prevYear;

      // Verifica se il mese è cambiato rispetto al mese precedente
      const isSameMonth = currentMonth === prevMonth;

      // Calcola il rendimento mensile come percentuale tra l'ultimo giorno del mese corrente
      // e l'ultimo giorno del mese precedente
      if (isSameYear && !isSameMonth) {
        const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
        const monthlyReturn = ((currentValue - prevValue) / prevValue) * 100;

        // Verifica se l'anno esiste nella mappa e aggiungi il rendimento mensile per il mese corrente
        if (yearlyReturnsMap.has(currentYear)) {
          yearlyReturnsMap.get(currentYear)!.push(monthlyReturn);
        } else {
          yearlyReturnsMap.set(currentYear, [monthlyReturn]);
        }
      }
    }

    return yearlyReturnsMap;
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
