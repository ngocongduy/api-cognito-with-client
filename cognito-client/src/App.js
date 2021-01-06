import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {TestEnv()}
        </p>
      </header>

      <Signup />
      <Login />

    </div>
  );
}
function TestEnv(){
  var value = process.env.REACT_APP_ABC; 
  if (value) {
    return value;
  }
  else{
    return "Environment varibale ABC not set";
  }
}
export default App;
