import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Label } from "recharts";

export default function Graph(props) {

    function toIndianRupees(sum) {
        return Number(sum).toString().replace(/\D/g, "").replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, "$1,");
    }

    return (
        <>
            <div className='graphHeader'>
                <p>After <span className="timePeriod"> <b>{props.result && props.result.investmentPeriod} years</b> </span>, you will have<br />
                    <span> <h2 className='totalAmount'> <b> ₹ {props.result && toIndianRupees(props.result.sipGrowthResultFinal)}</b></h2> </span>
                    That's <span> <b className='potentialCapitalGain'>₹ {props.result && toIndianRupees(props.result && props.result.potentialCapitalGain)}</b> </span> as potential capital gains <br /> on your investment of
                    <span> <b className="monthlyInvestment">₹ {props.result && toIndianRupees(props.result.totalMonthlyInvest)}</b>  </span>
                </p>
            </div>

            <div className="graphFooter">
                <ResponsiveContainer width={550} aspect={1.4}>
                    <LineChart data={props.result && props.result.graph} width={500} height={550} >
                        <XAxis dataKey="year" stroke="#000000" fontWeight="bold"><Label value="Investment Period(in Years)→ " position="bottom" offset={10} /></XAxis>
                        <YAxis width={90} stroke="#000000" fontWeight="bold" tickFormatter={props.rupeesInLacs}>
                            <Label value="SIP Growth(in Rs.Lacs)→" position="left" offset={1} angle={270}
                                style={{
                                    textAnchor: "middle",
                                    fontSize: "100%",
                                    fill: "rgba(0, 0, 0, 0.56)",
                                }}/></YAxis>
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="sipGrowth"
                            stroke="#5B1EAF"
                            r={0}
                        />
                        <Line
                            type="monotone"
                            dataKey="investment"
                            stroke="#717FEC"
                            r={0}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}