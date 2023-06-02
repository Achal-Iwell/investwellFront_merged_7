import React from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Slider from "@mui/material/Slider"
import MuiInput from "@mui/material/Input"

//  Sliders Labels
const monthlyInvestmentArray = [
  {
    value: 500,
    label: "500",
  },
  {
    value: 20000,
    label: "20000",
  },
  {
    value: 40000,
    label: "40000",
  },
  {
    value: 60000,
    label: "60000",
  },
  {
    value: 80000,
    label: "80000",
  },
  {
    value: 100000,
    label: "100000",
  },
]

const investmentPeriodArray = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 11,
    label: "11",
  },
  {
    value: 13,
    label: "13",
  },
  {
    value: 15,
    label: "15",
  },
  {
    value: 17,
    label: "17",
  },
  {
    value: 19,
    label: "19",
  },
  {
    value: 21,
    label: "21",
  },
  {
    value: 23,
    label: "23",
  },
  {
    value: 25,
    label: "25",
  },
  {
    value: 27,
    label: "27",
  },
  {
    value: 30,
    label: "30",
  },
]

const titleArray = [
  "Monthly Investment (Rs.)",
  "Investment Period (years)",
  "Expected Rate of Return (% p.a)",
  "Yearly Increment (%)",
]

const Input2 = styled(MuiInput) `width: 90px`

// updating slider values
function SliderCalculator(props) {
  return (
    <div className="sliderArea">
      <Box >
        <Grid className="slider" container>
          <Grid item >
            <Typography className="sliderTitle" gutterBottom>{titleArray[props.index]}</Typography>
          </Grid>

          <Grid className="sliderInput" item>
            <Input2
              value={props.invalidInputStatus[props.type] ? props.inputChange : props.value}
              onBlur={(event)=>props.onUpdateValue(event, props.type, "blur", props.minimum, props.maximum)}
              onChange={(event)=>props.onUpdateValue(event, props.type, "input", props.minimum, props.maximum)}
              inputProps={{
                step: props.steps,
                minimum: props.minimum,
                maximum: props.maximum,
                type: "number"
              }}
            />
          </Grid>
        </Grid>
      
        {props.invalidInputStatus && props.invalidInputStatus[props.type] &&  <div className="invalidInput">Invalid Input</div>}
        <Grid container>
          <Grid item xs>
            <Slider
              defaultValue={props.val}
              step={props.steps}
              min={props.minimum}
              max={props.maximum}
              marks = {props.type == "monthlyInvestment" ? monthlyInvestmentArray : investmentPeriodArray}
              value={props.value}
              onChange={(event)=>props.onUpdateValue(event, props.type, "input", props.minimum, props.maximum)}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default SliderCalculator