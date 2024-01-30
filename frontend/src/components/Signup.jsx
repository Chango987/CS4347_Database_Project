import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('sign up api url here', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      // Assuming the API returns some data upon successful signup
      console.log('Signup successful!', response.data);
    } catch (error) {
      console.error('Signup failed!', error);
      // Handle signup failure
    }
  };

  return (
    <div className="formContainer">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="inputField"
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="inputField"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="inputField"
          />
        </label>
        <br />
        <button type="submit" className="submitButton">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
