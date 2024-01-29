// App.js
import './App.css';
import './index.css';

import Signup from './components/Signup'; //  Signup component
import LoginForm from './components/LoginForm';
import Piechart from './components/Piechart';

function App() {
  return (
    <div className="App">
      <Signup />
      <LoginForm />
      <Piechart />
    </div>
  );
}

export default App;
