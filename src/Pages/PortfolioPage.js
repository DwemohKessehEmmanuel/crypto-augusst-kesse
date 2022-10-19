import React from 'react'
import { useLocation } from 'react-router-dom';
import CoinInfo from '../components/CoinInfo';

const PortfolioPage = () => {
  const location = useLocation();
  const { coin, numCoins } = location.state;

  console.log(coin);
  return (
    <div>
      PortfolioPage
      {coin.name}
      {numCoins}
    </div>
    
  )
}

export default PortfolioPage