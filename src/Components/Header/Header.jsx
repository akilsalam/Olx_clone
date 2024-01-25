import React,{useContext, useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';
function Header({ setSearchQuery }) {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const [selectedCountry, setSelectedCountry] = useState('Kerala');

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH');

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <hr />
        <hr />
        <div className="locationBar">
      <div className="customSelect">
        <select className="placeSearch" value={selectedCountry} onChange={handleCountryChange}>
          <option>🌐 Use  current Location</option>
          <hr />
          <hr />
          <hr />
          <option value="Kerala">Kerala</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Punjab">Punjab</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
        <div className="arrowIcon"><Arrow></Arrow></div>
      </div>
    </div>
          <hr />
          <hr />
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="searchAction" >
            <Search  color="#ffffff"></Search>
          </div>
        </div>
        <hr />
        <hr />
        <div className="languageBar">
      <div className="customSelect">
        <select className="languageSelect" value={selectedLanguage} onChange={handleLanguageChange}>
          <option value="ENGLISH">ENGLISH</option>
          <option value="SPANISH">हिंदी</option>
          {/* Add more language options as needed */}
        </select>
        <div className="arrowIcon"><Arrow></Arrow></div>
      </div>
    </div>
        <hr />
        <div className="loginPage">
        {user ? <span style={{cursor:'pointer'}} onClick={()=>{
          alert('Are you sure you want to LogOut')
          firebase.auth().signOut();
          history.push('/')
        }}> Logout </span >:
        <Link to={'/login'} className='text-dark'>
        <span >Login</span></Link>}
          <hr />
        </div>
          <hr />
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <Link style={{textDecoration:'none'}} to={'/create'}>
            <span>SELL</span>
            </Link>
          </div>
        </div>
          <hr />
          <hr />
      </div>
    </div>
  );
}

export default Header;
