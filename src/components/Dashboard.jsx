import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CryptoChart from './CryptoChart'; // Make sure this path is correct

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState({});

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,cardano,ripple,polkadot,dogecoin,chainlink&vs_currencies=usd'
      );
      setCryptoData(response.data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  const chartData = {
    labels: Object.keys(cryptoData),
    datasets: [
      {
        label: 'Crypto Prices (USD)',
        data: Object.values(cryptoData).map((coin) => coin.usd),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Crypto Prices</h1>
      <div className="w-full max-w-2xl"> {/* Centering the chart container */}
        <CryptoChart data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;



