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
  const [deckCodes, setDeckCodes] = useState([
    "CQDQCAIEGQAQOBICAEEQKDQCAUCQWDYCAYCRYKICBEFACFADAMCQGBIGAIAQCBIDAEDAKIAA",
    "CQDACAIEGQAQMARAAEEAICICAIBAGBQCAMCAGBICA4BBCFAFAEBQEFABAYDB2AIHAQEQCCAKAYBACAQMGEAQCBAECE",
    "CQDACBQKE4AQQCQGAEEASAYCAQEQEBICAUFETQABAQEQUAIMBUKAGAIEBEDQCBYKBEAQSCQSAEAQOCQP",
  ]);

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
          if (currentSet[i].cardCode === card.code) {
            card.name = currentSet[i].name;
            card.region = card.code.substring(2, 4);
            card.cost = currentSet[i].cost;
            card.art = currentSet[i].assets[0].fullAbsolutePath;
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
    <div className="app">
      <div className="addDeckSpan">
        <label className="addDeckInnerItems">
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
      </div>
      <div className="decksWrapper">
        {deckCodes.map((deck, deckIndex) => {
          deckCodes.filter((a) => a === deckCodes[deckIndex]);
          return (
            <>
              <div className="deck">
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {prepareDeck(deck).map((card) => {
                    return <Card card={card} key={card.code} />;
                  })}
                </ul>

                <button
                  key={deckIndex}
                  className="removeDeckButton"
                  onClick={() =>
                    setDeckCodes(
                      deckCodes.filter((a) => a !== deckCodes[deckIndex])
                    )
                  }
                >
                  Remove DC
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

function Card({ card }) {
  return (
    <div style={{ borderRadius: "10px" }} className={card.region.toLowerCase()}>
      <li className="card" key={card.name}>
        {card.name}
      </li>
    </div>
  );
}
