import React, { useState, useEffect } from "react";
import axios from "axios";
import SliderArea from "../../sipDelay/components/sliders";
import GraphArea from "../../sipDelay/components/graphArea";
import ErrorPage from "../../sipDelay/components/errorPage";
// import '../media/css/main.css';

import "../../../src/sipDelay/media/css/main.css";

function Calculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);
  const [investmentPeriod, setInvestmentPeriod] = useState(1);
  const [rateOfReturn, setRateOfReturn] = useState(1);
  const [delay, setDelay] = useState(1);

  const [invalidInputBox, setInvalidInputBox] = useState();
  const [inputBoxValue, setInputBoxValue] = useState();

  const [graphData, setGraphData] = useState({ invalid: false });

  const isValid = (val, min, max) => {
    if (val < min || val > max) return false;
    return true;
  };

  const onChange = (event, inputBoxType, eventType, min, max) => {
    const val = event.target.value;
    let sliderValue = Number(val);

    if (!isValid(sliderValue, min, max)) {
      setInvalidInputBox(inputBoxType);
      sliderValue = sliderValue < min ? min : max;
    } else {
      setInvalidInputBox("");
    }

    if (eventType === "blur") {
      setInvalidInputBox("");
    }

    setInputBoxValue(val);

    switch (inputBoxType) {
      case "monthlyInvestment":
        setMonthlyInvestment(sliderValue);
        break;
      case "investmentPeriod":
        setInvestmentPeriod(sliderValue);
        break;
      case "rateOfReturn":
        setRateOfReturn(sliderValue);
        break;
      case "delay":
        setDelay(sliderValue);
        break;
      default:
        break;
    }
  };

  //Api calling
  useEffect(() => {
    axios
      .get("http://localhost:3000/sipDelayCalculator/getSipDelayCalculator", {
        params: {
          monthlyInvestment: monthlyInvestment,
          investmentPeriod: investmentPeriod,
          rateOfReturn: rateOfReturn,
          delay: delay,
        },
      })
      .then((res) => {
        // for backend validation and showing the error page
        if (res.data && res.data.status === 0) {
          setGraphData(res.data.result);
        } else {
          setGraphData({ invalid: true });
        }
      })
      .catch((error) => {
        setGraphData({ invalid: true });
      });
  }, [monthlyInvestment, investmentPeriod, rateOfReturn, delay]);

  return (
    <div id="sipDelay">
      <div className="leftSideBox"></div>
      <div className="rightSideBox">
        {/* <button className="backBtn"><span>&#8592;</span> Back </button> */}
        <div className="rightMain">
          <h2 className="heading"> SIP Delay Calculator</h2>
          <h3 className="info">
            It tells you how much wealth you can create by making monthly
            investment
          </h3>
          <div className="outerContainer">
            <div class="leftContainer">
              <SliderArea
                type="monthlyInvestment"
                min={500}
                max={100000}
                steps={50}
                value={monthlyInvestment}
                inputBoxValue={inputBoxValue}
                invalidInputBox={invalidInputBox}
                onChange={(event, inputBoxType, eventType, min, max) =>
                  onChange(event, inputBoxType, eventType, min, max)
                }
              />
              <SliderArea
                type="investmentPeriod"
                min={1}
                max={30}
                steps={1}
                value={investmentPeriod}
                inputBoxValue={inputBoxValue}
                invalidInputBox={invalidInputBox}
                onChange={(event, inputBoxType, eventType, min, max) =>
                  onChange(event, inputBoxType, eventType, min, max)
                }
              />
              <SliderArea
                type="rateOfReturn"
                min={1}
                max={30}
                steps={0.1}
                value={rateOfReturn}
                inputBoxValue={inputBoxValue}
                invalidInputBox={invalidInputBox}
                onChange={(event, inputBoxType, eventType, min, max) =>
                  onChange(event, inputBoxType, eventType, min, max)
                }
              />
              <SliderArea
                type="delay"
                min={1}
                max={120}
                steps={1}
                value={delay}
                invalidInputBox={invalidInputBox}
                inputBoxValue={inputBoxValue}
                onChange={(event, inputBoxType, eventType, min, max) =>
                  onChange(event, inputBoxType, eventType, min, max)
                }
              />
            </div>
            {graphData.invalid ? (
              <ErrorPage />
            ) : (
              <GraphArea delay={delay} graphData={graphData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
