import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.clear();
        navigate('/signin');
        toast.info('Logged out successfully');
    };

    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li style={liStyle}>
                    <a href="/" style={linkStyle}>
                        Home
                    </a>
                </li>
                <li style={liStyle}>
                    <a href="/dashboard" style={linkStyle}>
                        Dashboard
                    </a>
                </li>
                <li style={liStyle}>
                    <a href="/stockgen" style={linkStyle}>
                        Suggestion engine
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
                {token ?
                    <li style={liStyle}>
                        <a style={linkStyle} onClick={handleLogOut}>
                            Sign out
                        </a>
                    </li>
                    :
                    <li style={liStyle}>
                        <a style={linkStyle} onClick={() => navigate('/signin')}>
                            Sign in
                        </a>
                    </li>
                }
            </ul>
        </nav>
    );
};

// Styles
const navStyle = {
    background: 'var(--dark)',
    padding: '20px',
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
    color: 'white',
    textDecoration: 'none',
    padding: '10px',
    cursor: 'pointer',
};

export default Navbar;
