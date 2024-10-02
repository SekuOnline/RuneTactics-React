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

  const [deckCode1, setDeckCode1] = useState(
    ""
  );
  const [deckCode2, setDeckCode2] = useState(
    ""
  );
  const [deckCode3, setDeckCode3] = useState(
    ""
  );

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

 
  function addDeckCode(){
    console.log("addDeckCode run");
    if (!deckCode1) setDeckCode1(textInput);
    else if (!deckCode2) setDeckCode2(textInput);
    else if (!deckCode3) setDeckCode3(textInput);
    else alert("All deck codes are filled, please remove a deck code before continuing");
  }

  return (
    <>
    <label> Add Deck Code: 
      <input type="text" className="deckCodeInput" onChange={(e) => {setTextInput(e.target.value); console.log(e.target.value)} } ></input>
      <button type="submit" onClick={addDeckCode}>Submit</button>
    </label>

    {deckCode1 && <> <p>{deckCode1}</p>
    <button onClick={() => setDeckCode1("")}>Remove DC1</button></>}
   

      {deckCode1 && Runeterra.DeckEncoder.isValidDeck(
        Runeterra.DeckEncoder.decode(deckCode1)
      ) && (
        <ul>
          {prepareDeck(deckCode1).map((card) => {
            // console.log(card.name);
            
            return <Card card={card} key={card.code}/>;
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
