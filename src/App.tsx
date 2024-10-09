import React from "react";
import solus from "./assets/solus.png";
import styles from "./App.module.scss";
import { useFirebase } from "./Hooks/useFirebase";
import { Thought } from "../types";
import Markdown from "react-markdown";

const App = () => {
  const thoughts = useFirebase<Thought>({ collectionName: "thoughts" }).data;

  if (thoughts.length) {
    const latestThought = thoughts.sort(
      (a: Thought, b: Thought) => b.timestamp - a.timestamp
    )[0];
    const thoughtDate = new Date(latestThought.timestamp).toLocaleDateString();
    const thoughtTime = new Date(latestThought.timestamp).toLocaleTimeString();

    const thoughtWords = ['Rambling', 'Musing', 'Just a thought', 'You know what...']
    const i = Math.floor(Math.random() * (thoughtWords.length - 0 + 1) + 0);


    return (
      <div className="App">
        <div className={styles.body}>
          <div className={styles.header}>
            <h1>LonelyAI</h1>
            <span> - A lonely AI computer left alone with it's own thoughts</span>
          </div>
          <div className={styles.lonelyAi}>
            <div className={styles.solus}>
              <img src={solus} alt="solus" />
            </div>
            {latestThought ? (
              <div className={styles.latestThought}>
                <div className={styles.heading}>
                  <span>{`${thoughtWords[i]} - ${thoughtDate}: ${thoughtTime}`}</span>
                </div>
                <Markdown>{latestThought.answer}</Markdown>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default App;
