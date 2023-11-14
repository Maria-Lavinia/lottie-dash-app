import "./App.css";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <main className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
