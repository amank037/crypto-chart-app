import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const [error, setError] = useState(null);

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd');
      setCryptoData(response.data);
    } catch (err) {
      setError('Error fetching crypto data: ' + err.message);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: cryptoData ? Object.keys(cryptoData) : [],
    datasets: [
      {
        label: 'Price in USD',
        data: cryptoData ? Object.values(cryptoData).map(coin => coin.usd) : [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Crypto Prices</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {cryptoData ? (
          <Bar data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: 'Current Cryptocurrency Prices',
              },
            },
          }} />
        ) : (
          <p className="text-gray-600 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

