// App.js
import './Home.css';

import Signup from '../components/Signup'; //  Signup component
import LoginForm from '../components/LoginForm';
import Piechart from '../components/Piechart';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="App">
      <Navbar />
      <br />
      <Signup />
      <LoginForm />
      <Piechart />
    </div>
  );
}

export default Home;
