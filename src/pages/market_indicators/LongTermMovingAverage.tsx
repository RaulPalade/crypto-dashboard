import { useState, useEffect } from 'react'
import CryptoCompareApi from '../../api/CryptoCompareApi'
import ChartCard from '../../components/ChartCard'
import Description from '../../components/Description'
import Header from '../../components/Header'
import ChartNoDropdownsContainer from '../../components/ChartNoDropdownsContainer'
import { ChartDataset } from 'chart.js'
import { ChartData } from '../../components/CustomChartJS'

function LongTermMovingAverage() {
  const [chartLabels, setChartLabels] = useState<string[]>([])

  const [bitcoinPriceChart, setBitcoinPriceChart] = useState<ChartData>({
    values: [],
    labels: [],
    legendLabel: '',
  })
  const [btcLongTermMovingAvg, setBtcLongTermMovingAvg] = useState<ChartData>({
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
    createChartDatasets(bitcoinPriceChart, btcLongTermMovingAvg)
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
      const processedMovingAverage: ChartData = {
        values: calculateMovingAverage(data.values, 200),
        labels: data.labels,
        legendLabel: '200 days MA',
      }

      setChartLabels(data.labels.slice(1000))
      setBitcoinPriceChart(data)
      setBtcLongTermMovingAvg(processedMovingAverage)
      createChartDatasets(data, processedMovingAverage)
    } catch (error) {
      console.log(error)
    }
  }

  function calculateMovingAverage(prices: number[], windowSize: number) {
    const movingAverages = []
    let sum = 0

    for (let i = 0; i < prices.length; i++) {
      sum += prices[i]

      if (i >= windowSize) {
        sum -= prices[i - windowSize]
        const average = sum / windowSize
        movingAverages.push(average)
      } else {
        movingAverages.push(0)
      }
    }

    return movingAverages
  }

  function createChartDatasets(
    data: ChartData,
    btcLongTermMovingAvg: ChartData,
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
      label: btcLongTermMovingAvg.legendLabel,
      data: btcLongTermMovingAvg.values.slice(1000),
      backgroundColor: 'rgba(41, 115, 115, 1)',
      borderColor: 'rgba(41, 115, 115, 1)',
      borderWidth: 1,
      pointBackgroundColor: '#fff',
      pointRadius: 0,
    })

    setChartDatasets(datasets)
  }
  return (
    <section className="home-section">
      <div className="home-content flex flex-col items-start p-8">
        <Header text="BTC Long Term Moving Average" />
        <div className="mt-8 flex flex-col lg:flex-row">
          <div className="mb-5 lg:mr-6 lg:mb-0 lg:w-1/3">
            <Description
              text={
                <>
                  The long-term moving average is a technical analysis tool used
                  to smooth out price fluctuations and identify the overall
                  trend of an asset over an extended period. It is calculated by
                  averaging the closing prices of an asset over a specified
                  number of days, such as 50 or 200.
                  <br></br>
                  <br></br>
                  The long-term moving average helps traders and investors
                  identify the broader direction of the asset's price movement
                  and provides support and resistance levels.
                  <br></br>
                  <br></br>
                  By comparing the current price to the long-term moving
                  average, market participants can gain insights into potential
                  trend reversals or confirmations of the prevailing trend.
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

export default LongTermMovingAverage
