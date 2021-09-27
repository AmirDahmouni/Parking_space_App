
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

export default function Header()
{
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    
    const openMenu = () => {
        document.querySelector('.sidebar').classList.add('open');
      };
    
    return(

   <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Parkings</Link>
          </div>
          <div className="header-links">
            
         {userInfo ? (userInfo.type==="admin" && (
            <>
              <Link to="/profile">Settings</Link>
              <div className="dropdown">
                <a href="#">{userInfo.name}</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/parkings">Parkings</Link>
                    <Link to="/bookings">Bookings</Link>
                    <Link to="/users">Users</Link>
                  </li>
                </ul>
              </div>
              </>
            )
           ): (<Link to="/signin">Sign In</Link>)}
             
           {userInfo && userInfo.type==="client" && (
             <>
             <Link to="/profile">Settings</Link>
              <div className="dropdown">
                <a href="#">{userInfo.name}</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/cars">Cars</Link>
                    <Link to="/bookings">Bookings</Link>
                  </li>
                </ul>
              </div>
              </>
           )}

           {userInfo && userInfo.type==="responsable" && (
             <>
             <Link to="/profile">Settings</Link>
              <div className="dropdown">
                <a href="#">{userInfo.name}</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/parkings">Parkings</Link>
                    <Link to="/bookings">Bookings</Link>
                  </li>
                </ul>
              </div>
              </>
            )}
          </div>
          
        </header>


    )
}


