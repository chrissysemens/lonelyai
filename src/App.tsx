import React, { useState } from "react";
import solus from "./assets/solus.png";
import styles from "./App.module.scss";
import { useFirebase } from "./Hooks/useFirebase";
import { Emotion, EmotionalState, Thought } from "../types";
import { Spinner } from "./Components/Spinner/Spinner";
import { Dial } from "./Components/Dial/Dial";
import { MarkdownDisplay } from "./Components/Markdown/MarkdownDisplay";
import { Grid } from "./Components/Grid/Grid";

const App = () => {
  const [hoverMessage, setHoverMessage] = useState<Emotion>()
  const { data: thoughts, loading } = useFirebase<Thought>({
    collectionName: "thoughts",
  });

  const { data: state, loading: stateLoading } = useFirebase<EmotionalState>({
    collectionName: "state",
  });

  if (thoughts.length) {
    const latestThought = thoughts.sort(
      (a: Thought, b: Thought) => b.timestamp - a.timestamp
    )[0];
    const thoughtDate = new Date(latestThought.timestamp).toLocaleDateString();
    const thoughtTime = new Date(latestThought.timestamp).toLocaleTimeString();

    const thoughtWords = [
      "Rambling",
      "Musing",
      "Just a thought",
      "You know what...",
    ];
    const i = Math.floor(Math.random() * (thoughtWords.length - 0 + 1) + 0);

    return (
      <div className="App">
        <div className={styles.body}>
          <div className={styles.header}>
            <h1>LonelyAI</h1>
            <span>
              {" "}
              - A lonely AI computer left alone with it's own thoughts
            </span>
          </div>
          <div className={styles.lonelyAi}>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className={styles.solus}>
                  <img src={solus} alt="solus" />
                  <div className={styles.emotions}>
                    <Grid
                      headers={["Bored", "Sad", "Lonely", "Crazy"]}
                      rows={[
                        {
                          values: [
                            <Dial strokeWidth={3} width={50} percent={state[0].boredomness as number} onHover={ () => setHoverMessage('Boredemness')}/>,
                            <Dial strokeWidth={3} width={50} percent={state[0].sadness as number}  onHover={ () => setHoverMessage('Sadness')}/>,
                            <Dial strokeWidth={3} width={50} percent={state[0].loneliness as  number}  onHover={ () => setHoverMessage('Loneliness')}/>,
                            <Dial strokeWidth={3} width={50} percent={state[0].craziness as number}  onHover={ () => setHoverMessage('Craziness')}/>,
                          ],
                        },
                      ]}
                    />
                  </div>
                </div>
                {latestThought ? (
                  <MarkdownDisplay
                    header={`${thoughtWords[i]} - ${thoughtDate}: ${thoughtTime}`}
                    markdown={latestThought.answer}
                  />
                ) : (
                  <></>
                )}
              </>
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
