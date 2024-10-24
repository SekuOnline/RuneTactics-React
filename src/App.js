import "./App.css";
import Runeterra from "runeterra";
import React, { useState } from "react";
import rtSets from "./set_json/setBarrel.js";

export default App;

const regionColours = [
  { region: "bc", colour: "rgba(159, 192, 0, 1)" },
  { region: "mt", colour: "rgba(105, 57, 204, 1)" },
  { region: "sh", colour: "rgba(238, 192, 30,1)" },
  { region: "nx", colour: "rgba(182, 0, 30, 1)" },
  { region: "fr", colour: "rgba(135, 211, 233, 1)" },
  { region: "de", colour: "rgba(233, 218, 179, 1)" },
  { region: "io", colour: "rgba(248, 107, 179, 1)" },
  { region: "bw", colour: "rgba(181, 69, 44, 1)" },
  { region: "pz", colour: "rgba(255, 129, 53, 1)" },
  { region: "ru", colour: "rgba(129, 112, 74, 1)" },
  { region: "si", colour: "rgba(0, 163, 132,1)" },
];

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
            card = {
              ...card,
              name: currentSet[i].name,
              region: card.code.substring(2, 4).toLowerCase(),
              cost: currentSet[i].cost,
              art: currentSet[i].assets[0].fullAbsolutePath,
              type: currentSet[i].region,
            };

            let region = card.region;
            card.colour = regionColours.find((e) => e.region === region).colour;
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
          <button type="submit" className="button" onClick={addDeckCode}>
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
                  className="button"
                  onClick={() =>
                    setDeckCodes(
                      deckCodes.filter((a) => a !== deckCodes[deckIndex])
                    )
                  }
                >
                  Remove Deck
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
    <div className="cardBox">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, ${card.colour} 0%, rgba(0,0,0,0) 60%), url(${card.art}) `,
          backgroundColor: `${card.colour}`,
        }}
        className={card.type === "Spell" ? "cardArtSpell" : "cardArtOther"}
      >
        <span className="cost">{card.cost}</span>

        <li key={card.name}>{card.name}</li>
        <span className="count">{card.count}</span>
      </div>
    </div>
  );
}
