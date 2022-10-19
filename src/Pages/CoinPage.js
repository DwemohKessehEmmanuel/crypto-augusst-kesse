import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { LinearProgress, makeStyles, Typography, TextField, Select, FormControl, InputLabel, MenuItem } from '@material-ui/core';
import CoinInfo from '../components/CoinInfo';
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Banner/Carousel';
import dateFormat, { masks } from "dateformat";

const useStyles = makeStyles((theme)=>({
  container:{
    display:"flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      
    },
  },
  sidebar:{
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid black",
  },
  heading:{
    fontWeight : "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
    
  },
  description:{
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  },
  marketData:{
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    //responsiveness
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
      
    },
    [theme.breakpoints.down("sd")]: {
      flexDirection: "column",
      alignItems: "center",
      
    },
    [theme.breakpoints.down("md")]: {
      alignItems: "start"
      
    },
  },
  portbutton: {
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Cursive",
    cursor: "pointer",
    backgroundColor: "#F9842C",
    color: "white",
    fontWeight: 700,
    "&:hover": {
      backgroundColor: "#e4451df3",
      color: "#D3D3D3",
      boxShadow: 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
    },
  }  
}));



const CoinPage = () => {
  let {id} = useParams();
  const [coin, setCoin] = useState();
  const [numCoins, setNumCoins] = useState(0);
  const {currency, symbol} = CryptoState();
  const classes = useStyles();
  const navigate = useNavigate();
 
  const fetchSingleCoin = async() => {
    const {data} = await axios.get(SingleCoin(id));
    //console.log(data);
    setCoin(data);
  };
  //console.log(coin);
  useEffect(()=>{
    fetchSingleCoin()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const coinNumbers = [...Array(100).keys()];
  console.log(coinNumbers);
  
  if(!coin) return <LinearProgress style={{backgroundColor: "#e4451df3"}}/>
  
  return (
    
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{marginBottom: 20}}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Total Supply:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.total_supply
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Circulating Supply:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.circulating_supply
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              Last Updated:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {dateFormat(new Date(coin?.last_updated), "dddd, mmmm dS, yyyy, h:MM:ss TT")}
            </Typography>
          </span>
          <span style={{display: "flex"}}>
            <Typography variant="h7" className={classes.heading}>
              24hour Volume:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h7" style={{
              fontFamily:"Montserrat",}
            }>

              {symbol}{" "}{numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()]
                .toString()
                .slice(0,-6)
              )}M
            </Typography>
          </span>
        </div>
        <div style={{marginBottom: 20}}>
          <TextField id="outlined-basic" label="Number of coins" variant="outlined" onChange={e => setNumCoins(e.target.value)}/>
        </div>
        <Link to={'/portfolio'} style={numCoins <= 0 ? {pointerEvents: "none"} : null} className={classes.portbutton} state={{coin: coin, numCoins: numCoins}}>Add to portfolio</Link>
      </div>
      
      
      <CoinInfo coin={coin}/>
    </div>
  ) 
}

export default CoinPage;
