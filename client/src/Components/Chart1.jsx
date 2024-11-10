import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Chart1 = () => {
  const dataset1 = [
    { day: 'Sun', 369: 100, 333: 80 },
    { day: 'Mon', 369: 120, 333: 95 },
    { day: 'Tue', 369: 100, 333: 85 },
    { day: 'Wed', 369: 100, 333: 85 },
    { day: 'Thu', 369: 120, 333: 85 },
    { day: 'Fri', 369: 140, 333: 85 },
    { day: 'Sat', 369: 140, 333: 85 },
  ];

  const valueFormatter1 = (value) => `${value}%`;

  return (
    <div className='b_chart1'>
      <BarChart
        dataset={dataset1}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          { dataKey: '369', label: '369', valueFormatter: valueFormatter1 },
          { dataKey: '333', label: '333', valueFormatter: valueFormatter1 },
        ]}
        width={400}
        height={280}
        margin={{ top: 20, right: 30, bottom: 30, left: 40 }}
      />
    </div>
  );
};

export default Chart1;
