import { useState } from "react";
import "./App.css";
import Home from "./components/pages/home/Home";

const HOME = "home";
// ABOUT = 'about',
// INSTRUCTIONS = 'instructions',
// CREDITS = 'credits'

function App() {
  const [page] = useState(HOME);

  return (
    <div className="App" id="app">
      <div
        id="headerSection"
        style={{
          backgroundColor: "maroon",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="img">
          <img
            style={{
              width: "100%",
              height: "auto",
            }}
            src="prayingChildIntranet.png"
            alt="praying child logo"
          />
        </div>
        <h1
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Decoding Disease specific Gene Networks using Natural Language
          Processing on PubMed
        </h1>
      </div>
      <div id="content" style={{ display: "flex", flexDirection: "column" }}>
        {page === HOME && <Home />}
      </div>
      <div
        id="footerSection"
        style={{
          backgroundColor: "maroon",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: "center",
          }}
        >
          Footer Section
        </p>
      </div>
    </div>
  );
}

export default App;
