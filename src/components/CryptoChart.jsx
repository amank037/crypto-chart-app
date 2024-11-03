import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

const CryptoChart = ({ data }) => {
  const options = {
    scales: {
      y: {
        type: 'logarithmic', // Set y-axis to logarithmic
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cryptocurrencies',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoChart;
