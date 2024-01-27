// App.js
import './App.css';
import './index.css';
import Signup from './components/Signup'; //  Signup component
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="App">
      <Signup />
      <LoginForm />
    </div>
  );
}

export default App;
