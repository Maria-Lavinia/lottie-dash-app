import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import Login from "./components/Login";
import UploadAnimation from "./components/UploadLottie";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import SideNav from "./components/SideNav";
import SignupDev from "./components/SignupDev";
import SignupAdmin from "./components/SignupAdmin";

function App() {
  return (
    <Provider store={store}>
      <main className="App">
        <Router>
          <SideNav />
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/upload-lottie" element={<UploadAnimation />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/signup-dev" element={<SignupDev />}></Route>
            <Route path="/signup-admin" element={<SignupAdmin />}></Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
