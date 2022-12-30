import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { TbCurrencyBitcoin, TbArrowsRightLeft } from "react-icons/tb";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { GiMining } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../assets/logo_crypto.png";
import ProfileImage from "../assets/profile-image.jpg";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route: any) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const openSidebar = () => {
    let sidebar = document.querySelector(".sidebar") as HTMLElement;
    sidebar.classList.toggle("close");
  };

  const showMenu = (e: any) => {
    let arrowParent = e.target.parentElement.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  };

  return (
    <div className="sidebar close">
      <div className="logo-details">
        <i className="logo" onClick={openSidebar}>
          <img src={Logo} width={60} alt="" />
        </i>
        <span className="logo_name">CryptoVision</span>
      </div>
      <ul className="nav-links">
        <li className={pathMatchRoute("/") ? "active" : "notActive"}>
          <p onClick={() => navigate("/")}>
            <i>
              <MdOutlineDashboard size={28} />
            </i>
            <span className="link_name">Dashboard</span>
          </p>
          <ul className="sub-menu blank">
            <li>
              <p className="link_name">Dashboard</p>
            </li>
          </ul>
        </li>
        <li
          className={
            pathMatchRoute("/bitcoin-fundamentals") ? "active" : "notActive"
          }
        >
          <div className="icon-link">
            <p onClick={() => navigate("/bitcoin-fundamentals")}>
              <i>
                <TbCurrencyBitcoin size={28} />
              </i>
              <span className="link_name">Bitcoin Fundamentals</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">Bitcoin Fundamentals</p>
            </li>
            <li>
              <p>HTML & CSS</p>
            </li>
            <li>
              <p>JavaScript</p>
            </li>
            <li>
              <p>PHP & MySQL</p>
            </li>
          </ul>
        </li>
        <li
          className={
            pathMatchRoute("/market-indicators") ? "active" : "notActive"
          }
        >
          <div className="icon-link">
            <p onClick={() => navigate("/market-indicators")}>
              <i>
                <AiOutlineLineChart size={28} />
              </i>
              <span className="link_name">Market Indicators</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">Market Indicators</p>
            </li>
            <li>
              <p>Web Design</p>
            </li>
            <li>
              <p>Login Form</p>
            </li>
            <li>
              <p>Card Design</p>
            </li>
          </ul>
        </li>
        <li
          className={
            pathMatchRoute("/economic-indicators") ? "active" : "notActive"
          }
        >
          <div className="icon-link">
            <p onClick={() => navigate("/economic-indicators")}>
              <i>
                <BsBank size={28} />
              </i>
              <span className="link_name">Economic Indicators</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">Economic Indicators</p>
            </li>
            <li>
              <p>Real GDP</p>
            </li>
            <li>
              <p>Real GDP per Capita</p>
            </li>
            <li>
              <p>Treasyre Yield</p>
            </li>
            <li>
              <p>Federal Funds (interest) Rate</p>
            </li>
            <li>
              <p>CPI</p>
            </li>
            <li>
              <p>Inflation</p>
            </li>
            <li>
              <p>Retail Sales</p>
            </li>
            <li>
              <p>Durable Goods Orders</p>
            </li>
            <li>
              <p>Unemployment Rate</p>
            </li>
            <li>
              <p>Nonfarm Payroll</p>
            </li>
          </ul>
        </li>
        <li
          className={pathMatchRoute("/transactions") ? "active" : "notActive"}
        >
          <div className="icon-link">
            <p onClick={() => navigate("/transactions")}>
              <i>
                <TbArrowsRightLeft size={28} />
              </i>
              <span className="link_name">Transactions</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">Transactions</p>
            </li>
            <li>
              <p>Web Design</p>
            </li>
            <li>
              <p>Login Form</p>
            </li>
            <li>
              <p>Card Design</p>
            </li>
          </ul>
        </li>
        <li className={pathMatchRoute("/mining") ? "active" : "notActive"}>
          <p onClick={() => navigate("/mining")}>
            <i>
              <GiMining size={28} />
            </i>
            <span className="link_name">Mining</span>
          </p>
          <ul className="sub-menu blank">
            <li>
              <p className="link_name">Mining</p>
            </li>
          </ul>
        </li>
        <li className={pathMatchRoute("/arbitrage") ? "active" : "notActive"}>
          <p onClick={() => navigate("/arbitrage")}>
            <i>
              <RiExchangeDollarLine size={28} />
            </i>
            <span className="link_name">Arbitrage</span>
          </p>
          <ul className="sub-menu blank">
            <li>
              <p className="link_name">Arbitrage</p>
            </li>
          </ul>
        </li>
        <li className={pathMatchRoute("/news") ? "active" : "notActive"}>
          <p onClick={() => navigate("/news")}>
            <i>
              <ImNewspaper size={28} />
            </i>
            <span className="link_name">News</span>
          </p>
          <ul className="sub-menu blank">
            <li>
              <p className="link_name">News</p>
            </li>
          </ul>
        </li>
        <li className={pathMatchRoute("/settings") ? "active" : "notActive"}>
          <p onClick={() => navigate("/settings")}>
            <i>
              <FiSettings size={28} />
            </i>
            <span className="link_name">Setting</span>
          </p>
          <ul className="sub-menu blank">
            <li>
              <p className="link_name">Setting</p>
            </li>
          </ul>
        </li>
        <li>
          <div className="profile-details">
            <div className="profile-content">
              <img src={ProfileImage} alt="Profile" />
            </div>
            <div className="name-job">
              <div className="profile_name">Nancy</div>
              <div className="job">Web Designer</div>
            </div>
            <i className="bx bx-log-out"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
