import { Outlet, Link } from "react-router-dom";
import "./layout.css"
const Layout = () => {
  return (
    <>
      <nav>
        <ul className="buttoncontainer">
        
          <li className="button">
            <Link to="/invoiceGenerator" style={{ color: 'inherit', textDecoration: 'inherit'}}>Tax Invoice Generator</Link>
          </li>
          <li className="button">
            <Link to="/portfolioCorrelation" style={{ color: 'inherit', textDecoration: 'inherit'}}>Portfolio Correlation</Link>
          </li>
          <li className="button">
            <Link to="/portfolioOverlap" style={{ color: 'inherit', textDecoration: 'inherit'}}>Portfolio Overlap</Link>
          </li>
          <li className="button">
            <Link to="/sipCalculator" style={{ color: 'inherit', textDecoration: 'inherit'}}>SIP Calculator</Link>
          </li>
          <li className="button">
            <Link to="/sipDelayCalculator" style={{ color: 'inherit', textDecoration: 'inherit'}}>SIP Delay Calculator</Link>
          </li>
          <li className="button">
            <Link to="/sipStepUpCalculator" style={{ color: 'inherit', textDecoration: 'inherit'}}>SIP Step-up Calculator</Link>
          </li>
          <li className="button">
            <Link to="/riskProfile" style={{ color: 'inherit', textDecoration: 'inherit'}}>Risk Profile</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;