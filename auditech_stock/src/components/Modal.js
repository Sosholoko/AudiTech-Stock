import React, { useState } from "react";
import "../style/Modal.css";

export default function Modal(props) {
  const [modal, setModal] = useState(false);
  var booleanStr;

  const toggleModal = () => {
    setModal(!modal);
  };

  if (props.tradeable === true) {
    booleanStr = "Yes";
  } else {
    booleanStr = "No";
  }
  if (props.triggerable === true) {
    booleanStr = "Yes";
  } else {
    booleanStr = "No";
  }

  return (
    <>
      <button onClick={toggleModal} className="btn__modal">
        <p>
          More <i class="fas fa-info-circle"></i>
        </p>
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay"> </div>
          <div className="modal-content">
            <h3>
              More Info <i class="fas fa-info-circle"></i> <br />
              <br />
              <span id="snex">
                {props.shortName} → {props.exchange}
              </span>{" "}
              <br />
              <br />
              <h4>Exchange Delay : {props.exchangeDelay} sec</h4>
              <h4>First Trade Data Milliseconds : {props.exchangeMilisec} ms</h4>
              <h4> Market State : {props.marketState}</h4>
              <h4> Price Hint : {props.priceHint} $</h4>
              <h4>Quote Source Name : {props.quoteSrcN}</h4>
              <h4>Quote Type : {props.quoteType}</h4>
              <h4>Regular Market Change FMT : {props.regMarketChF} $</h4>
              <h4>Regulat Market Change Raw : {props.regMarketChR} $</h4>
              <h4>Regular Market Change Previous Close FMT : {props.regMarketPrevCF} $</h4>
              <h4> Regular Market Change Previous Close Raw : {props.regMarketPrevCR} $</h4>
              <h4>Regular Market Time FMT : {props.regMarketTimeF}</h4>
              <h4>Regular Market Time Raw : {props.regMarketTimeR}</h4>
              <h4>Source Interval : {props.srcInter}</h4>
              <h4>Symbol : {props.symbol}</h4>
              <h4>Tradeable : {booleanStr}</h4>
              <h4>Triggerable : {booleanStr}</h4>
            </h3>
            <br />
            <button id="no__btn" className="close__modal" onClick={toggleModal}>
              Close <i class="far fa-times-circle"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
