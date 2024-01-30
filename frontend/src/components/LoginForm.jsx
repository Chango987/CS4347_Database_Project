import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //form validation
    if (!credentials.username || !credentials.password) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.get('login api url here', {
        params: {
          email: credentials.username,
          password: credentials.password,
        },
      });

      // Assuming the API returns some data upon successful login
      console.log('Login successful!', response.data);
    } catch (error) {
      console.error('Login failed!', error);
      // Handle login failure
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
        <button className="submitButton" type="submit">
          Login
        </button>
        <div className="register-link">
          <p>
            Don&apos;t have an account? <a href="#">Signup</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
