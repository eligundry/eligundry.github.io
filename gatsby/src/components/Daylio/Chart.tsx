import React from 'react'
import { Line } from 'react-chartjs-2'
import subMonths from 'date-fns/subMonths'

import useFeelings from './useFeelings'
import { DaylioVariants, MoodMapping } from './types'

const DaylioChart: React.FC = () => {
  const { isFetching, entries } = useFeelings(DaylioVariants.list)

  if (isFetching && !entries) {
    return null
  }

  const timeWindow = subMonths(new Date(), 1)

  return (
    <Line
      height={50}
      data={{
        labels: Object.values(MoodMapping).map((_, i) => i),
        datasets: [
          {
            data: entries
              .filter(entry => entry.time >= timeWindow)
              .map(entry => ({
                x: entry.time,
                y: Object.keys(MoodMapping).findIndex(m => m === entry.mood),
              })),
            backgroundColor: 'transparent',
            pointStyle: 'rect',
            borderColor: 'rgb(184, 50, 128)',
            pointBorderColor: 'rgb(56, 178, 172)',
            pointBackgroundColor: 'rgb(56, 178, 172)',
            radius: 5,
          },
        ],
      }}
      options={{
        legend: {
          display: false,
        },
        tooltips: {
          displayColors: false,
          backgroundColor: 'white',
          titleFontColor: 'black',
          titleFontSize: 14,
          bodyFontColor: 'black',
          bodyFontSize: 14,
          borderWidth: 1,
          borderColor: 'rgb(226 232 240)',
          callbacks: {
            title: (item, _) => item[0].xLabel.toString(),
            label: (item, _) => Object.keys(MoodMapping)[item.yLabel.valueOf()],
          },
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month',
              },
              ticks: {
                min: timeWindow,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                callback: value => Object.values(MoodMapping)[value],
                min: 0,
                fontSize: 24,
              },
            },
          ],
        },
      }}
    />
  )
}

export default DaylioChart
