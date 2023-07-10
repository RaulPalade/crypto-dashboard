import { useState, useEffect } from 'react'
import CryptoCompareApi from '../../api/CryptoCompareApi'
import ChartCard from '../../components/ChartCard'
import Description from '../../components/Description'
import Header from '../../components/Header'
import ChartNoDropdownsContainer from '../../components/ChartNoDropdownsContainer'
import { ChartDataset } from 'chart.js'
import { ChartData } from '../../components/CustomChartJS'

function BitcoinBullMarketSupportBands() {
  const [chartLabels, setChartLabels] = useState<string[]>([])

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: '',
  })
  const [bitcoin20SMAChart, setBitcoin20SMAChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: '',
  })
  const [bitcoin21EMAChart, setBitcoin21EMAChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: '',
  })

  const [chartDatasets, setChartDatasets] = useState<ChartDataset[]>([])

  const [viewingOption, setViewingOption] = useState(0)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    createChartDatasets(bitcoinPriceChart, bitcoin20SMAChart, bitcoin21EMAChart)
  }, [viewingOption])

  function onViewingOptionChanged(value: number) {
    setViewingOption(value)
  }

  const fetchData = async () => {
    try {
      const data: ChartData = await CryptoCompareApi.getDailyPairOHLCV(
        'BTC',
        'USD',
        1500,
        2,
      )
      const processedChartData20SMA: ChartData = {
        values: calculate20WSMA(data.values),
        labels: data.labels,
        legendLabel: '20W SMA',
      }

      const processedChartData21EMA: ChartData = {
        values: calculate21WEMA(data.values),
        labels: data.labels,
        legendLabel: '21W EMA',
      }
      setChartLabels(data.labels.slice(1000))
      setBitcoinPriceChart(data)
      setBitcoin20SMAChart(processedChartData20SMA)
      setBitcoin21EMAChart(processedChartData21EMA)
      createChartDatasets(
        data,
        processedChartData20SMA,
        processedChartData21EMA,
      )
    } catch (error) {
      console.log(error)
    }
  }

  function calculate20WSMA(prices: number[]) {
    const sma20 = []

    for (let i = 0; i < prices.length; i++) {
      const sum = prices
        .slice(i - 139, i + 1)
        .reduce((acc, price) => acc + price, 0)
      const average = sum / 140
      sma20.push(average)
    }
    return sma20
  }

  function calculate21WEMA(prices: number[]) {
    const ema21 = []
    const multiplier = 2 / (147 + 1)
    let ema = prices[146]

    for (let i = 0; i < prices.length; i++) {
      ema = (prices[i] - ema) * multiplier + ema
      ema21.push(ema)
    }

    return ema21
  }

  function createChartDatasets(
    data: ChartData,
    processedChartData2MA: ChartData,
    processedChartData2MAx5: ChartData,
  ) {
    const datasets: ChartDataset[] = []
    datasets.push({
      label: 'BTC Price',
      data: data.values.slice(1000),
      backgroundColor: 'rgba(30, 34, 45, 1)',
      borderColor: 'rgba(30, 34, 45, 1)',
      borderWidth: 1,
      pointBackgroundColor: '#fff',
      showLine: viewingOption === 0 || viewingOption === 2,
      pointRadius: viewingOption === 1 || viewingOption === 2 ? 1.5 : 0,
    })

    datasets.push({
      label: processedChartData2MA.legendLabel,
      data: processedChartData2MA.values.slice(1000),
      backgroundColor: 'rgba(41, 115, 115, 1)',
      borderColor: 'rgba(41, 115, 115, 1)',
      borderWidth: 1,
      pointBackgroundColor: '#fff',
      pointRadius: 0,
    })

    datasets.push({
      label: processedChartData2MAx5.legendLabel,
      data: processedChartData2MAx5.values.slice(1000),
      backgroundColor: 'rgba(220, 0, 0, 1)',
      borderColor: 'rgba(220, 0, 0, 1)',
      borderWidth: 1,
      pointBackgroundColor: '#fff',
      pointRadius: 0,
    })

    setChartDatasets(datasets)
  }
  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="2-Year MA Multiplier" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  The 2-Year MA Multiplier is a tool that helps with long-term
                  investment in Bitcoin. It shows periods when buying or selling
                  Bitcoin would have been a good idea based on past performance.
                  <br></br>
                  To do this, it uses a moving average line (MA) - in this case,
                  the 2-year MA - and also multiplies that line by 5. <br></br>
                  <br></br>
                  It's important to note that this multiplication is applied to
                  the price values, not the time period, of the 2-year MA. In
                  the past, buying Bitcoin when the price goes below the 2-year
                  MA (green line) has typically resulted in above-average
                  returns. On the other hand, selling Bitcoin when the price
                  goes above the multiplied 2-year MA (red line) has
                  historically been a good way to take profits.
                </>
              }
            />
          </div>
          <div className="lg:flex-grow-3 mt-5 lg:ml-6 lg:mt-0 lg:w-2/3">
            <ChartCard>
              <ChartNoDropdownsContainer
                type="line"
                labels={chartLabels}
                datasets={chartDatasets}
                viewingOptionCallback={onViewingOptionChanged}
              />
            </ChartCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BitcoinBullMarketSupportBands
