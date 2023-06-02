import React from "react"
import Calculator from "../../sipStepUp/components/index"
// Calling Calculator function in input slider area
function RightPanel() {
  return (
    <div className="rightSideBox">
        <h3 className="backBtn"> <span>&#8592;</span>Back</h3>
        <div className="calculator">
          <Calculator />
        </div>
      </div>
  );
}

export default RightPanel
