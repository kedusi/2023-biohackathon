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
    <>
      <div className="App">
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
        <div id="content">{page === HOME && <Home />}</div>
        <div id="footerSection">
          <p style={{ backgroundColor: "maroon", color: "white" }}>
            Footer Section
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
