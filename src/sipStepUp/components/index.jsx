import React, { useEffect, useState } from "react";
import axios from "axios";
import SliderCalculator from "../../sipStepUp/components/sliderCalculator";
import Graph from "../../sipStepUp/components/graph";
import '../../../src/sipStepUp/media/css/main.css'

function Calculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [rateOfReturn, setRateOfReturn] = useState(6.5);
  const [yearlyIncrement, setYearlyIncrement] = useState(10);
  const [invalidInput, setInvalidInput] = useState(false);
  const [inputChange, setInputChange] = useState();
  const [result, setResult] = useState();

  // updating  input values to change graph data for backend
  const onUpdateValue = (event, type, changeType, minimum, maximum) => {
    const val = event.target.value;
    let sliderValue = val == "" ? 0 : Number(val);

    if (validate(minimum, maximum, sliderValue)) {
      setInvalidInput({ [type]: true });
      sliderValue = sliderValue > maximum ? maximum : minimum;
    }
    if (changeType == "blur") {
      setInvalidInput({ [type]: false });
    }
    setInputChange(val);

    switch (type) {
      case "monthlyInvestment":
        setMonthlyInvestment(sliderValue);
        break;
      case "investmentPeriod":
        setInvestmentPeriod(sliderValue);
        break;
      case "rateOfReturn":
        setRateOfReturn(sliderValue);
        break;
      case "yearlyIncrement":
        setYearlyIncrement(sliderValue);
        break;
      default:
    }
  };

  // validating Input values
  const validate = (minimum, maximum, sliderValue) => {
    if (sliderValue < minimum || sliderValue > maximum) {
      return true;
    }
    return false;
  };

  // Updating rupees in Indian standard
  const toIndianRupees = (sum) => {
    return sum
      .toString()
      .replace(/\D/g, "")
      .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
  };

  // Converted amount in Lacks
  const rupeesInlack = (amount) => {
    return `${amount / 100000}`;
  };

  // axios call for graph
  useEffect(() => {
    axios
      .get("http://localhost:3000/sipStepUpCalculator/getSipStepUpCalculator", {
        params: {
          monthlyInvestment: monthlyInvestment,
          investmentPeriod: investmentPeriod,
          rateOfReturn: rateOfReturn,
          yearlyIncrement: yearlyIncrement,
        },
      })
      .then((res) => {
        if (res.data.status === -1) {
          return setResult(res.data.message);
        } else {
          setResult(res.data.result);
        }
      });
  }, [monthlyInvestment, investmentPeriod, rateOfReturn, yearlyIncrement]);

  return (
    <div id="sipStepUp">

    
      <div className="leftSideBox"></div>

      <div className="rightSideBox">
        {/* <h3 className="backBtn"> ← Back</h3> */}
        <div className="calculator">
          <div className="rightMain">
            <div className="calculatorText">
              <h2 className="calculatorTitle"> SIP Step Up Calculator</h2>
              <p className="calculatorDescription">
                {" "}
                It tells you how much wealth you can create by making monthly
                investment
              </p>
            </div>
            <div className="container">
              <div className="leftContainer">
                <SliderCalculator
                  index={0}
                  type="monthlyInvestment"
                  minimum={500}
                  maximum={100000}
                  steps={50}
                  value={monthlyInvestment}
                  inputVal={monthlyInvestment}
                  onUpdateValue={(event, type, changeType, minimum, maximum) =>
                    onUpdateValue(event, type, changeType, minimum, maximum)
                  }
                  inputChange={inputChange}
                  invalidInputStatus={invalidInput}
                />
                <SliderCalculator
                  index={1}
                  type="investmentPeriod"
                  minimum={1}
                  maximum={30}
                  steps={1}
                  value={investmentPeriod}
                  inputVal={investmentPeriod}
                  onUpdateValue={(event, type, changetype, minimum, maximum) =>
                    onUpdateValue(event, type, changetype, minimum, maximum)
                  }
                  inputChange={inputChange}
                  invalidInputStatus={invalidInput}
                />
                <SliderCalculator
                  index={2}
                  type="rateOfReturn"
                  minimum={1}
                  maximum={30}
                  steps={0.1}
                  value={rateOfReturn}
                  inputVal={rateOfReturn}
                  onUpdateValue={(event, type, changetype, minimum, maximum) =>
                    onUpdateValue(event, type, changetype, minimum, maximum)
                  }
                  inputChange={inputChange}
                  invalidInputStatus={invalidInput}
                />
                <SliderCalculator
                  index={3}
                  type="yearlyIncrement"
                  minimum={1}
                  maximum={30}
                  steps={1}
                  value={yearlyIncrement}
                  inputVal={yearlyIncrement}
                  onUpdateValue={(event, type, changetype, minimum, maximum) =>
                    onUpdateValue(event, type, changetype, minimum, maximum)
                  }
                  inputChange={inputChange}
                  invalidInputStatus={invalidInput}
                />
              </div>

              {typeof result === "string" ? (
                <div className="error">{result}</div>
              ) : (
                <Graph
                  result={result}
                  investmentPeriod={investmentPeriod}
                  toIndianRupees={toIndianRupees}
                  rupeesInlack={rupeesInlack}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
