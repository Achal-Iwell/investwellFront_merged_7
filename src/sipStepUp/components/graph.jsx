import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Label } from "recharts";

// Handling Graph area using inputs from sliders
function Graph(props) {
  return (
    <>
      <div className="rightContainer">
        <div className="textForGraph">
          <span className="spanParaGraph">
            After&nbsp;
            <span className="yearsDisplay">
              &nbsp; {props.investmentPeriod} year's
            </span>&nbsp;
            you will have
          </span>
          <h2 className="sipAmount">₹ {props.result && props.toIndianRupees(Number(props.result.totalSipWithStepUp))}</h2>
          <span className="paraGraph">
            That's
            <span className="currencyRupeeInPara">
              ₹&nbsp;{props.result && props.toIndianRupees(Number(props.result.capitalGain))}
            </span>&nbsp;
            as potential capital gains on your investment of
            <span className="currencyRupeeInPara2">
              ₹ {props.result && props.toIndianRupees(Number(props.result.totalInvestmentAmount))}
            </span>
          </span>
        </div>
        <ResponsiveContainer className="graphDiv" width="90%" aspect={1.6}>
          <LineChart width={550} height={550} min={0} max={5000000}
            data={props.result && props.result.graph}
            margin={{ top:5, bottom:20, left: 7, right:2 }}
          >
            <XAxis dataKey="currentYear" stroke="#000000" fontWeight="bold">
              <Label value="Investment Period(in Years) ⟶" position="bottom" offset={-1} />
            </XAxis>

            <YAxis stroke="#000000" fontWeight="bold" type="investment" tickFormatter={props.rupeesInlack} >
              <Label value="Amount( ₹ in Lacs ) ⟶" position="left" offset={-5} angle={270} /> 
            </YAxis>

            <Tooltip formatter={(value) => new Intl.NumberFormat('en-IN').format(value)} />
            <Line type="monotone" dataKey="investment" stroke="#03c988" r={0} />
            <Line type="monotone" dataKey="sipStepUp" stroke="#2c74b3" r={0} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default Graph;