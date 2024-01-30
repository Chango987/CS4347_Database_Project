// App.js
import './App.css';
import './index.css';

import Signup from './components/Signup'; //  Signup component
import LoginForm from './components/LoginForm';
import Piechart from './components/Piechart';
import Navbar from './components/Navbar';

function App() {
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

export default App;
