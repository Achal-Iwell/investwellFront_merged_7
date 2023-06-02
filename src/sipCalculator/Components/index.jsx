import Graph from "./graph";
import SliderPanel from "./sliderPanel";
import ErrorComp from "./errorComp";
import Sidebar from "./sidebar";
import { React, useState, useEffect } from "react";
import axios from "axios";
// import '../media/css/main.css'

import "../../../src/sipCalculator/media/css/main.css";

export default function SIPCalculator() {
  const [monthlyInvestment, setValueMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setValueInvestmentPeriod] = useState(5);
  const [rateOfReturn, setValueRateOfReturn] = useState(10);
  const [rateOfInflation, setValueRateOfInflation] = useState(2);
  const [err, setError] = useState(false);
  const [inputVal, setInputVal] = useState();
  const [result, setResult] = useState({ invalid: false });

  function changeValues(name, val) {
    switch (name) {
      case "monthlyInvestment":
        setValueMonthlyInvestment(val);
        break;
      case "investmentPeriod":
        setValueInvestmentPeriod(val);
        break;
      case "rateOfReturn":
        setValueRateOfReturn(val);
        break;
      case "rateOfInflation":
        setValueRateOfInflation(val);
        break;
      default:
    }
  }

  function handleChange(event, props, type) {
    let val = event.target.value;
    setInputVal(val);
    if (props.field == "rateOfInflation" && val == "") {
      setError({ [props.field]: true });
      changeValues(props.field, props.min);
    } else if (Number(val) < props.min) {
      setError({ [props.field]: true });
      changeValues(props.field, props.min);
    } else if (Number(val) > props.max) {
      setError({ [props.field]: true });
      changeValues(props.field, props.max);
    } else {
      setError({ [props.field]: false });
      changeValues(props.field, Number(val));
    }
    if (type == "blur") {
      setError(false);
    }
  }

  // Converting amount in Lacs
  const rupeesInLacs = (amount) => {
    return `${amount / 100000}`;
  };

  // api calling
  useEffect(() => {
    axios
      .get("http://localhost:3000/sipCalculator/getSipCalculator/", {
        params: {
          monthlyInvestment: monthlyInvestment,
          investmentPeriod: investmentPeriod,
          rateOfReturn: rateOfReturn,
          rateOfInflation: rateOfInflation,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data && res.data.status == -1) {
          setResult({ invalid: true });
        } else {
          setResult(res.data.result);
          console.log(result);
        }
      });
  }, [monthlyInvestment, investmentPeriod, rateOfReturn, rateOfInflation]);

  return (
    <div id="sipCalculator">
      <div className="leftSideBox">
        <Sidebar />
      </div>

      <div className="rightSideBox">
        {/* <button>
          <span>&#8592;</span>Back
        </button> */}

        <div className="rightMain">
          <div className="calculatorText">
            <h2>SIP Calculator</h2>
            <p>
              It tells you how much wealth you can create by making monthly
              investment
            </p>
          </div>

          <div className="leftContainer">
            <SliderPanel
              field="monthlyInvestment"
              sliderLabel="Monthly Investment (Rs.)"
              min={500}
              max={1000000}
              steps={500}
              value={monthlyInvestment}
              handleChange={handleChange}
              inputError={err}
              inputVal={inputVal}
            />

            <SliderPanel
              field="investmentPeriod"
              sliderLabel="Investment Period (in years)"
              min={1}
              max={30}
              steps={1}
              value={investmentPeriod}
              handleChange={handleChange}
              inputError={err}
              inputVal={inputVal}
            />

            <SliderPanel
              field="rateOfReturn"
              sliderLabel="Expected Rate of Return(%p.a)"
              min={1}
              max={30}
              steps={0.1}
              value={rateOfReturn}
              handleChange={handleChange}
              inputError={err}
              inputVal={inputVal}
            />

            <SliderPanel
              field="rateOfInflation"
              sliderLabel="Expected Rate of Inflation(%p.a)"
              min={0}
              max={30}
              steps={0.1}
              value={rateOfInflation}
              handleChange={handleChange}
              inputError={err}
              inputVal={inputVal}
            />
          </div>

          <div className="rightContainer">
            {result && result.invalid ? (
              <ErrorComp />
            ) : (
              <Graph result={result} rupeesInLacs={rupeesInLacs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
