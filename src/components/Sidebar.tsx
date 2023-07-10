import { useNavigate, useLocation } from 'react-router-dom'
import { MdOutlineDashboard } from 'react-icons/md'
import { TbCurrencyBitcoin, TbArrowsRightLeft } from 'react-icons/tb'
import { AiOutlineLineChart } from 'react-icons/ai'
import { BsBank } from 'react-icons/bs'
import { GiMining } from 'react-icons/gi'
import { ImNewspaper } from 'react-icons/im'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { IoIosArrowDown } from 'react-icons/io'
import { SiHiveBlockchain } from 'react-icons/si'

import Logo from '../assets/logo_crypto.png'
import ProfileImage from '../assets/profile-image.jpg'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const pathMatchRoute = (route: any) => {
    if (route === location.pathname) {
      return true
    }
  }

  const toggleSidebar = () => {
    let sidebar = document.querySelector('.sidebar') as HTMLElement
    sidebar.classList.toggle('close')
  }

  const showMenu = (e: any) => {
    let arrowParent = e.target.parentElement.parentElement.parentElement //selecting main parent of arrow
    arrowParent.classList.toggle('showMenu')
  }

  return (
    <div className="sidebar close">
      <div className="logo-details">
        <i className="logo" onClick={toggleSidebar}>
          <img src={Logo} width={60} alt="" />
        </i>
        <span className="logo_name">CryptoVision</span>
      </div>
      <ul className="nav-links">
        <li className={pathMatchRoute('/') ? 'active' : 'notActive'}>
          <p onClick={() => navigate('/')}>
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
          className={pathMatchRoute('/bitcoin-Basics') ? 'active' : 'notActive'}
        >
          <div className="icon-link">
            <p onClick={() => navigate('/bitcoin-basics')}>
              <i>
                <TbCurrencyBitcoin size={28} />
              </i>
              <span className="link_name">Bitcoin Basics</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">Bitcoin Basics</p>
            </li>
            <li>
              <p onClick={() => navigate('/bitcoin-basics/bitcoin-2-year-ma')}>
                Bitcoin Investor Tool: 2-year MA Multiplier
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate('/bitcoin-basics/bitcoin-200-week-ma')}
              >
                200 Week Moving Average Heatmap
              </p>
            </li>
            <li>
              <p
                onClick={() =>
                  navigate('/bitcoin-basics/bitcoin-fear-and-greed')
                }
              >
                Fear And Greed Index
              </p>
            </li>
            <li>
              <p
                onClick={() => navigate('/bitcoin-basics/bitcoin-pi-cycle-top')}
              >
                Pi Cycle Top Indicator
              </p>
            </li>

            <li>
              <p
                onClick={() =>
                  navigate('/bitcoin-basics/bitcoin-rainbow-chart')
                }
              >
                Bitcoin Rainbow Price Chart Indicator
              </p>
            </li>
            <li>
              <p onClick={() => navigate('/bitcoin-basics/bitcoin-supply')}>
                Bitcoin Supply
              </p>
            </li>
            <li>
              <p onClick={() => navigate('/bitcoin-basics/bitcoin-halving')}>
                Bitcoin Halving
              </p>
            </li>
            <li>
              <p
                onClick={() =>
                  navigate('/bitcoin-basics/bitcoin-balance-distribution')
                }
              >
                Bitcoin Balance Distribution
              </p>
            </li>
          </ul>
        </li>
        <li
          className={
            pathMatchRoute('/market-indicators') ? 'active' : 'notActive'
          }
        >
          <div className="icon-link">
            <p onClick={() => navigate('/market-indicators')}>
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
              <p onClick={() => navigate('/market-indicators/running-roi')}>
                Running ROI
              </p>
            </li>
            <li>
              <p>Monthly returns</p>
            </li>
            <li>
              <p
                onClick={() =>
                  navigate('/market-indicators/bull-market-support-bands')
                }
              >
                Bull Market Support Bands
              </p>
            </li>
            <li>
              <p>Long Term Moving Average</p>
            </li>
            <li>
              <p>Price Drowdown From ATH</p>
            </li>
          </ul>
        </li>
        {/* <li
          className={
            pathMatchRoute("/on-chain-indicators") ? "active" : "notActive"
          }>
          <div className="icon-link">
            <p onClick={() => navigate("/on-chain-indicators")}>
              <i>
                <SiHiveBlockchain size={28} />
              </i>
              <span className="link_name">Onchain Indicators</span>
            </p>
            <i className="arrow">
              <IoIosArrowDown size={28} onClick={showMenu} />
            </i>
          </div>
          <ul className="sub-menu">
            <li>
              <p className="link_name">OnChain Indicators</p>
            </li>
            <li>
              <p>ROHDL Ratio</p>
            </li>
            <li>
              <p>Net Unrealized Profil/Loss</p>
            </li>
            <li>
              <p>Reserve Risk</p>
            </li>
            <li>
              <p>Active Addess Sentiment Indicator</p>
            </li>
            <li>
              <p>Realized Price</p>
            </li>
          </ul>
        </li> */}
        {/* <li
          className={
            pathMatchRoute("/economic-indicators") ? "active" : "notActive"
          }>
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
              <p>Real GDP per Capital</p>
            </li>
            <li>
              <p>Treasure Yield</p>
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
        </li> */}
        <li
          className={pathMatchRoute('/transactions') ? 'active' : 'notActive'}
        >
          <div className="icon-link">
            <p onClick={() => navigate('/transactions')}>
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
        <li className={pathMatchRoute('/mining') ? 'active' : 'notActive'}>
          <p onClick={() => navigate('/mining')}>
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
        <li className={pathMatchRoute('/arbitrage') ? 'active' : 'notActive'}>
          <p onClick={() => navigate('/arbitrage')}>
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
        <li className={pathMatchRoute('/news') ? 'active' : 'notActive'}>
          <p onClick={() => navigate('/news')}>
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
        <li className={pathMatchRoute('/settings') ? 'active' : 'notActive'}>
          <p onClick={() => navigate('/settings')}>
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
  )
}

export default Sidebar
