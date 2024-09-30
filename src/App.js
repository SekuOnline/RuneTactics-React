import "./App.css";
import Runeterra from "runeterra";
import React, { useState } from "react";
import rtSets from "./set_json/setBarrel.js";


export default App;

const deckCode =
  "CECAEAIDD4QQEBADAQHQECABCMMAIAIBCYPCMKIEAEAQCBABAQBQQAIGAADACCAAAYBACAIBFIAQMAIS";

// const regionColors = {
//   "Bandle City": "rgba(159, 192, 0, 1)",
//   Targon: "rgba(105, 57, 204, 1)",
//   Shurima: "rgba(238, 192, 30,1)",
//   Noxus: "rgba(182, 0, 30,1)",
//   Freljord: "rgba(135, 211, 233, 1)",
//   Demacia: "rgba(233, 218, 179, 1)",
//   Ionia: "rgba(248, 107, 179, 1)",
//   Bilgewater: "rgba(181, 69, 44,1)",
//   "Piltover & Zaun": "rgba(255, 129, 53,1)",
//   Runeterra: "rgba(129, 112, 74, 1)",
//   "Shadow Isles": "rgba(0, 163, 132,1)",
// };

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // const bgColor = darkMode ? "black" : "white";
  console.log(rtSets[0]);
  return (
    <>
      <DeckContainer />
    </>
  );
}

function DeckContainer() {
  const [deckCode, setDeckCode] = useState(
    "CMDQCAIBCQAQIAIJAEDAOMYBBADQEAIJAEHAEBAHFREQICABAEBAYDYCAEAQCKQBBAAR4AIDAQDSEO3N"
  );

  //Params: deckCode (State)
  //maps through the deck to add additional required attributes,
  //then sorts the deck by cost.
  //returns the sorted deck of cards.
  function prepareDeck(deckCode) {
    return Runeterra.DeckEncoder.decode(deckCode)
      .map((card) => {
        
        console.log(card.code);
        let currentSet = rtSets[card.set - 1];
        for (let i in currentSet) {
          console.log(currentSet[i].name)
          if (currentSet[i].cardCode === card.code) {
            card.name = currentSet[i].name;
            // card.img = currentSet[i].fullAbsolutePath;
            card.cost = currentSet[i].cost;
            console.log("card found");
            break;
          }
        }
        return card;
      })
      .sort((a, b) => a.cost - b.cost);
  }

  return (
    <>
      {Runeterra.DeckEncoder.isValidDeck(
        Runeterra.DeckEncoder.decode(deckCode)
      ) && (
        <ul>
          {prepareDeck(deckCode).map((card) => {
            // console.log(card.name);
            
            return <Card card={card} />;
          })}
        </ul>
      )}
    </>
  );
}

function Card({ card }) {
  // console.log(card.name);
  return <li key={card.name}>{card.name}</li>;
}
