import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../style/content.css";
import LoginButton from "./LoginButton";
import Modal from "./Modal";
var axios = require("axios").default;

const StockContent = () => {
  const { isAuthenticated } = useAuth0();
  const [datas, setDatas] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [selectFil, setSelectFil] = useState("");
  const [selectMarket, setSelectMarket] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      var options = {
        method: "GET",
        url: "https://run.mocky.io/v3/6daa5c5c-4c1b-4bce-8596-c604fa9f52dc",
        params: { modules: "defaultKeyStatistics,assetProfile" }
      };

      axios
        .request(options)
        .then(function (response) {
          var results = response.data.marketSummaryResponse.result;
          setSelectFil(results[0].exchange);
          setSelectMarket(results[0].market);
          setFilteredDatas(results);
          setDatas(results);
          console.log(results);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  const handleChange = (e) => {
    setSelectFil(e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectMarket(e.target.value);
  };

  const findMatch = (selected, selected2) => {
    debugger;
    const oldState = [...datas];
    if (selectFil) {
      const matchData = oldState.filter((data) => data.exchange === selected);
      setFilteredDatas(matchData);
    }
    if (selectMarket) {
      const matchData = oldState.filter((data) => data.market === selected2);
      setFilteredDatas(matchData);
    }
    if (selectMarket && selectFil) {
      const matchData = oldState.filter((data) => data.exchange === selected && data.market === selected2);
      setFilteredDatas(matchData);
    }
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
            <h3>
              <i class="fas fa-search"></i> Search By Filter
            </h3>
            <br></br>
            <select name="exchange" id="stock" value={selectFil} onChange={handleChange}>
              <option value="" disabled selected>
                Select an Exchange
              </option>
              {datas.map((data) => {
                return (
                  <>
                    <option>{data.exchange}</option>
                  </>
                );
              })}
            </select>
            <select name="market" id="mark" value={selectMarket} onChange={handleChange2}>
              <option value="" disabled selected>
                Select an Market
              </option>
              {datas.map((data) => {
                return <option>{data.market}</option>;
              })}
            </select>
            <br />
            <button onClick={() => findMatch(selectFil, selectMarket)}>Filter</button>
            <button id="clr_btn" onClick={() => setFilteredDatas(datas)}>
              Clear
            </button>
          </div>
          <div className="card_content">
            {filteredDatas.length > 0 &&
              filteredDatas.map((data, i) => {
                return (
                  <div className="card_style" key={data.symbol}>
                    <div className="card_info">
                      <div className="logo_sn">
                        <h4 id="stock_sn">{data.shortName}</h4>
                        <div className="logo"></div>
                      </div>
                      <div className="card_info_det">
                        <h4>
                          <span>Exchange </span>: {data.exchange}
                        </h4>
                        <h4>
                          {" "}
                          <span>Market</span> : {data.market}
                        </h4>
                        <h4>
                          {" "}
                          <span>TimeZone </span>: {data.exchangeTimezoneName}
                        </h4>
                        <h4>
                          {" "}
                          <span>Change Rate </span>: {data.regularMarketChangePercent.fmt}
                        </h4>
                        <h4>
                          {" "}
                          <span>Market Price </span>: {data.regularMarketPrice.fmt} $
                        </h4>
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
            {filteredDatas.length <= 0 ? (
              <>
                <h2 style={{ color: "rgb(197, 103, 103)" }}>No results were found for your search ! Please try again</h2>
                <br />
                <br />
                <br />
                <br />
              </>
            ) : null}
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
