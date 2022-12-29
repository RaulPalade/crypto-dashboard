import ChartCard from "../components/ChartCard";
import ChartToolbar from "../components/ChartToolbar";
import CustomChart from "../components/CustomChart";

function MainIndicators() {
  const chartData = {
    values: [1, 3, 1, 2, 6, 1],
    labels: ["1", "3", "1", "2", "6", "1"],
  };

  return (
    <section className="home-section">
      <div className="home-content">
        <ChartCard>
          <ChartToolbar />
          <CustomChart {...chartData} />
        </ChartCard>
      </div>
    </section>
  );
}

export default MainIndicators;
