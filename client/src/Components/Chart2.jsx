import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Chart2 = () => {
  const dataset2 = [
    { day: 'Sun', 369: 80 },
    { day: 'Mon', 369: 20 },
    { day: 'Tue', 369: 60 },
    { day: 'Wed', 369: 50 },
    { day: 'Thu', 369: 70 },
    { day: 'Fri', 369: 75 },
    { day: 'Sat', 369: 60 },
  ];

  const valueFormatter2 = (value) => `${value}%`;

  return (
    <div className='b_chart2'>
      <BarChart
        dataset={dataset2}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          { dataKey: '369', label: '369', valueFormatter: valueFormatter2 },
        ]}
        width={400}
        height={280}
        margin={{ top: 20, right: 30, bottom: 30, left: 40 }}
      />
    </div>
  );
};

export default Chart2;
