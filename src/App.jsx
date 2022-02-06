import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import setupSentry from "./utils/sentry";

setupSentry();
library.add(fab, fas);

function App() {
  return (
    <div className="App">
      <Navigation />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
