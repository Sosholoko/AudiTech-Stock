import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../style/content.css";
import LoginButton from "./LoginButton";
import Modal from "./Modal";
var axios = require("axios").default;

const StockContent = () => {
  const { isAuthenticated } = useAuth0();
  const [datas, setDatas] = useState([]);
  const [selectFil, setSelectFil] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    var options = {
      method: "GET",
      url: "https://run.mocky.io/v3/6daa5c5c-4c1b-4bce-8596-c604fa9f52dc",
      params: { modules: "defaultKeyStatistics,assetProfile" }
    };

    axios
      .request(options)
      .then(function (response) {
        var results = response.data.marketSummaryResponse.result;
        setDatas(results);
        console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleChange = (e) => {
    debugger;
    setSelectFil(e.target.value);
  };

  const findMatch = (selected) => {
    debugger;
    const matchData = datas.find((data) => data.exchange === selected);
    setDatas(matchData);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <div className="title">
            <h1>
              Market Summary <i class="fas fa-chart-pie"></i>
            </h1>
          </div>
          <div className="filter_sec">
            <h3>Search By Filter</h3>
            <br></br>
            <select name="exchange" id="stock" value={selectFil} onChange={handleChange}>
              {datas.map((data, i) => {
                return <option>{data.exchange}</option>;
              })}
            </select>
            <select name="market" id="mark">
              {datas.map((data, i) => {
                return <option value="market">{data.market}</option>;
              })}
            </select>
            <br />
            <button onClick={() => findMatch(selectFil)}>Filter</button>
          </div>
          <div className="card_content">
            {datas &&
              datas.length > 0 &&
              datas.map((data, i) => {
                return (
                  <div className="card_style" key={data}>
                    <div className="card_info">
                      <div className="logo_sn">
                        <h4 id="stock_sn">{data.shortName}</h4>
                        <div className="logo"></div>
                      </div>
                      <div className="card_info_det">
                        <h4>Exchange : {data.exchange}</h4>
                        <h4>Market : {data.market}</h4>
                        <h4>TimeZone : {data.exchangeTimezoneName}</h4>
                        <h4>Change Rate : {data.regularMarketChangePercent.fmt}</h4>
                        <h4>Market Price :{data.regularMarketPrice.fmt} $</h4>
                      </div>
                      <div>
                        <Modal
                          exchange={data.exchange}
                          exchangeDelay={data.exchangeDataDelayedBy}
                          exchangeMilisec={data.firstTradeDateMilliseconds}
                          marketState={data.marketState}
                          priceHint={data.priceHint}
                          quoteSrcN={data.quoteSourceName}
                          quoteType={data.quoteType}
                          regMarketChF={data.regularMarketChange.fmt}
                          regMarketChR={data.regularMarketChange.raw}
                          regMarketPrevCF={data.regularMarketPreviousClose.fmt}
                          regMarketPrevCR={data.regularMarketPreviousClose.raw}
                          regMarketTimeF={data.regularMarketTime.fmt}
                          regMarketTimeR={data.regularMarketTime.raw}
                          shortName={data.shortName}
                          srcInter={data.sourceInterval}
                          symbol={data.symbol}
                          tradeable={data.tradeable}
                          trigger={data.triggerable}
                          isOpen={isOpen}
                          onClose={(e) => setIsOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="not_logged_page">
          <h1>Welcome to Finan.Stock !</h1>
          <br />
          <h2>Invest Better</h2>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default StockContent;
