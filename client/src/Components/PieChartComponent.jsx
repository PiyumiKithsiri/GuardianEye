import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import './PieChart.css';

const PieChartComponent = () => {
  return (
    <div className='p_chart'>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 30, label: 'Male' },
              { id: 1, value: 70, label: 'Female' }
            ],
            innerRadius: 70,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 360,
            cx: 120,
            cy: 120,
          }
        ]}
      />
    </div>
  );
};

export default PieChartComponent;
