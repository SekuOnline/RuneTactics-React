import "./App.css";
import Runeterra from "runeterra";
import React, { useState } from "react";
import rtSets from "./set_json/setBarrel.js";

export default App;

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

      {deckCodes.map((deck, deckIndex) => {
        deckCodes.filter(a => a === deckCodes[deckIndex])
        return (
          <>
            <ul>
              {prepareDeck(deck).map((card) => {
                return <Card card={card} key={card.code} />;
              })}
            </ul>

            <button key={deckIndex}
              onClick={() => setDeckCodes(
                deckCodes.filter(a => a !== deckCodes[deckIndex])
                
              )}
            >
              Remove DC
            </button>
          </>
        );
      })}
    </>
  );
}

function Card({ card }) {
  // console.log(card.name);
  return <li key={card.name}>{card.name}</li>;
}
