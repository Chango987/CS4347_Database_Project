const Navbar = () => {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <a href="#" style={linkStyle}>
            Home
          </a>
        </li>
        <li style={liStyle}>
          <a href="#" style={linkStyle}>
            About
          </a>
        </li>
        <li style={liStyle}>
          <a href="#" style={linkStyle}>
            Contact
          </a>
        </li>
        <li style={liStyle}>
          <a href="#" style={linkStyle}>
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

// Styles
const navStyle = {
  background: 'blue', // Set background color to blue
  padding: '10px',
  textAlign: 'center',
};

const ulStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
};

const liStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: 'white', // Set text color to white
  textDecoration: 'none',
  padding: '10px',
};

export default Navbar;
