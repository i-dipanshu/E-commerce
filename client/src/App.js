import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { pushRotate as Menu } from "react-burger-menu";

// components imports
import {Sidebar, Header, Home, Footer} from "./components";


function App() {
  return (
    <Router>
      <div id="App">
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div id="page-wrap">
          <Header />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
