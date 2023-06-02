import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceGenerator from './taxInvoiceGenerator/components/index';
import PortfolioCorrelation from './portfolioCorrelation/components/index';
import PortfolioOverlap from './portfolioOverlap/components/index';
import SipCalculator from "./sipCalculator/Components/index";
import SipStepUpCalculator from "./sipStepUp/components/index";
import SipDelayCalculator  from "./sipDelay/components/index";
import RiskProfile from './riskProfile/Components/index'
// import StepUp  from "./stepUp/components/index";
// import RiskProfile from "./riskProfile/Components/index"
import Layout from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}/>
        <Route path="/invoiceGenerator" element={<InvoiceGenerator />} />
        <Route path="/portfolioCorrelation" element={<PortfolioCorrelation />} />
        <Route path="/portfolioOverlap" element={<PortfolioOverlap />} />
        <Route path="/sipStepUpCalculator" element={<SipStepUpCalculator />} />
        <Route path="/sipCalculator" element={<SipCalculator />} />
        <Route path="/sipDelayCalculator" element={<SipDelayCalculator />} />
        <Route path="/sipDelayCalculator" element={<SipDelayCalculator />} />
        <Route path="/riskProfile" element={<RiskProfile />} />


      </Routes>
    </BrowserRouter>   
  );
}

export default App;
