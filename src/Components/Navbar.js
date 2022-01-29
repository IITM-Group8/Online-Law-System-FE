import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import * as CommonConstants from '../Constants/CommonConstants.js'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';

import '../Styles/navbar.css';
import DashboardBody from './DashboardBody.js';
import SearchUser from './SearchUser.js';


function Navbar(props) {
  const userName = props.userName;
  const role = props.role;
  
  var menuList = [];
  if (role === 'Admin') {
    menuList = CommonConstants.LIST_OF_MENUS_FOR_ADMIN;
  } else if (role === 'Lawyer') {
    menuList = CommonConstants.LIST_OF_MENUS_FOR_LAWYER;
  } else if (role === 'Public') {
    menuList = CommonConstants.LIST_OF_MENUS_FOR_PUBLIC;
  }

  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  const [displayState, setDisplayState] = useState('dashboardbody');
  const displayPage = (stateName) => {
    setDisplayState(stateName);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={() => showSidebar()} />
          </Link>
          <h2 id='navbar-title'>Law Management System</h2>
          <div className="user-container">
            <span className="user-name">
              <label>
                <FiIcons.FiUser /> {userName}</label>
              <label id='logout-label'>
                <FiIcons.FiLogOut /> Logout</label>
            </span>
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose onClick={() => showSidebar()} />
              </Link>
            </li>

            {
              menuList ?
                menuList.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to="#" onClick={() => displayPage(item.stateName)}>
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })
                : <></>
            }
          </ul>
        </nav>

        {
          displayState === 'dashboardbody' ?
            <DashboardBody  />
            : <></>
        }

        {
          displayState === 'searchUsers' ?
            <SearchUser />
            : <></>
        }


      </IconContext.Provider>
    </>
  );

}



export default Navbar;
