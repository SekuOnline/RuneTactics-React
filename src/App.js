import "./App.css";
import Runeterra from "runeterra";
import React, { useState } from "react";
import rtSets from "./set_json/setBarrel.js";

export default App;

const regionColors = {"Bandle City":"rgba(159, 192, 0, 1)", "Targon":"rgba(105, 57, 204, 1)", "Shurima":"rgba(238, 192, 30,1)", "Noxus": "rgba(182, 0, 30,1)", "Freljord":"rgba(135, 211, 233, 1)", "Demacia":"rgba(233, 218, 179, 1)", "Ionia":"rgba(248, 107, 179, 1)",  "Bilgewater":"rgba(181, 69, 44,1)", "Piltover & Zaun":"rgba(255, 129, 53,1)", "Runeterra":"rgba(129, 112, 74, 1)", "Shadow Isles":"rgba(0, 163, 132,1)"}


function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // const bgColor = darkMode ? "black" : "white";
  return (
    <>
      <DeckContainer />
    </>
  );
}

function DeckContainer() {
  const [textInput, setTextInput] = useState("");
  const [deckCodes, setDeckCodes] = useState([]);
  const maxDecks = 3;

  //Params: deckCode (State)
  //maps through the deck to add additional required attributes,
  //then sorts the deck by cost.
  //returns the sorted deck of cards.
  function prepareDeck(deckCode) {
    return Runeterra.DeckEncoder.decode(deckCode)
      .map((card) => {
        let currentSet = rtSets[card.set - 1];
        for (let i in currentSet) {
          // console.log(currentSet[i].name)
          if (currentSet[i].cardCode === card.code) {
            card.name = currentSet[i].name;
            card.region = card.code.substring(2,4);
            console.log(card.region);
            // card.img = currentSet[i].fullAbsolutePath;
            card.cost = currentSet[i].cost;
            break;
          }
        }
        return card;
      })
      .sort((a, b) => a.cost - b.cost);
  }

  function addDeckCode() {
    if (deckCodes.length >= maxDecks) {
      alert("Deck slots full");
      return;
    }
    setDeckCodes([...deckCodes, textInput]);
  }

  return (
    <>
      <label>
        Add Deck Code:
        <input
          type="text"
          className="deckCodeInput"
          onChange={(e) => {
            setTextInput(e.target.value);
            console.log(e.target.value);
          }}
        ></input>
        <button type="submit" onClick={addDeckCode}>
          Submit
        </button>
      </label>
          <div className="decksWrapper">
      {deckCodes.map((deck, deckIndex) => {
        deckCodes.filter(a => a === deckCodes[deckIndex])
        return (
          <>
            <div className="deck">
            <ul style={{listStyleType:"none", padding:0}}>
              {prepareDeck(deck).map((card) => {
                return <Card card={card} key={card.code} />;
              })}
            </ul>

            <button key={deckIndex} className="removeDeckButton"
              onClick={() => setDeckCodes(
                deckCodes.filter(a => a !== deckCodes[deckIndex])
                
              )}
            >
              Remove DC
            </button>
            </div>
          </>
        );
      })}
      </div>
    </>
  );
}

function Card({ card }) {
  // console.log(card.name);
  return (<div style={{borderRadius:"10px"}} className={card.region.toLowerCase()}><li className="card" key={card.name}>{card.name}</li></div>);
}
