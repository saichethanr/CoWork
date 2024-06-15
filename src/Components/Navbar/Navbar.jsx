import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = React.useState("About");
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate(`/signup`);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white'
    },
    logo: {
      height: '50px'
    },
    menu: {
      display: 'flex',
      listStyle: 'none'
    },
    menuItem: {
      margin: '0 15px',
      position: 'relative',
      cursor: 'pointer'
    },
    menuLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      transition: 'color 0.3s'
    },
    menuLinkHover: {
      color: '#f0c14b'
    },
    activeMenuItem: {
      position: 'absolute',
      bottom: '-10px',
      left: '0',
      right: '0',
      borderTop: '2px solid #f0c14b'
    },
    loginCart: {
      display: 'flex',
      gap: '10px'
    },
    button: {
      backgroundColor: '#f0c14b',
      color: '#333',
      border: 'none',
      padding: '8px 15px',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'background-color 0.3s, transform 0.3s'
    },
    buttonHover: {
      backgroundColor: '#ddb347'
    },
    buttonActive: {
      transform: 'scale(0.95)'
    }
  };

  return (
    <div style={styles.navbar}>
      <div className='nav-logo'> 
        <img src="/COWORK.png" alt="Logo" style={styles.logo} />
      </div>
      <ul style={styles.menu}>
        <li
          style={styles.menuItem}
          onClick={() => setMenu("About")}
        >
          <Link
            style={menu === "About" ? { ...styles.menuLink, ...styles.menuLinkHover } : styles.menuLink}
            to='/'
          >
            About
          </Link>
          {menu === "About" && <hr style={styles.activeMenuItem} />}
        </li>
        <li
          style={styles.menuItem}
          onClick={() => setMenu("Features")}
        >
          <Link
            style={menu === "Features" ? { ...styles.menuLink, ...styles.menuLinkHover } : styles.menuLink}
            to='/features'
          >
            Features
          </Link>
          {menu === "Features" && <hr style={styles.activeMenuItem} />}
        </li>
        <li
          style={styles.menuItem}
          onClick={() => setMenu("Support")}
        >
          <Link
            style={menu === "Support" ? { ...styles.menuLink, ...styles.menuLinkHover } : styles.menuLink}
            to='/support'
          >
            Support
          </Link>
          {menu === "Support" && <hr style={styles.activeMenuItem} />}
        </li>
      </ul>
      <div style={styles.loginCart}>
        <button
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          style={styles.button}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonActive.transform}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onClick={handleSignup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
