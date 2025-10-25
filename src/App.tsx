import { FunctionComponent } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import setupSentry from "./utils/sentry";

setupSentry();
library.add(fab, fas);

const App: FunctionComponent = () => (
  <HashRouter>
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/:owner/:repo" element={<Container />} />
      </Routes>
      <Footer />
    </div>
  </HashRouter>
);

export default App;
