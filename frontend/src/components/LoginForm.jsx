const LoginForm = () => {
  return (
    <div className="formContainer">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input
            className="inputField"
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="input-box">
          <input
            className="inputField"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#"> Forgot Password?</a>
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
