import "./App.css";
import Runeterra from "runeterra";
import React, { useState } from "react";
import set1json from "./set_json/set1.json";
import set2json from "./set_json/set2.json";
import set3json from "./set_json/set3.json";
import set4json from "./set_json/set4.json";
import set5json from "./set_json/set5.json";
import set6json from "./set_json/set6.json";
import set7json from "./set_json/set7.json";
import set8json from "./set_json/set8.json";
import set9json from "./set_json/set9.json";

const cardSetData = [
  set1json,
  set2json,
  set3json,
  set4json,
  set5json,
  set6json,
  set7json,
  set8json,
  set9json,
];

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
        let currentSet = cardSetData[card.set - 1];
        for (let i in currentSet) {
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
  console.log(card);
  return <li key={card.name}>{card.name}</li>;
}
