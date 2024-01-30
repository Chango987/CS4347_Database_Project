import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      console.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('your-api-url-here', {
        first_name: formData.first_name,
        last_name: formData.last_name,
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
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="inputField"
          />
        </label>
        <br />

        <label>
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
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
