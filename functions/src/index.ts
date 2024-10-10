import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {ChatOpenAI} from "@langchain/openai";
import {AIMessageChunk, HumanMessage} from "@langchain/core/messages";
import {moods} from "../../data/moods";
import {EmotionalState, Thought} from "../../types";
import {converters} from "../utils/converters";

admin.initializeApp();

const config = functions.config();
const apiKey = config.openai.apikey;

const chat = new ChatOpenAI({
  temperature: 0.9,
  openAIApiKey: apiKey,
  model: "gpt-4o-mini",
});

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule("*/53 * * * *")
  .timeZone("Europe/London")
  .onRun(async () => {
    try {
      const random = Math.floor(Math.random() * (moods.length - 0 + 1)) + 0;
      const randomMood = moods[random];

      const state = await admin.firestore()
        .collection("state")
        .get();

      const emotionalState = converters<EmotionalState>()
        .fromFirestore(state.docs[0]);

      const thoughtRef = admin.firestore()
        .collection("thoughts")
        .doc();
      if (emotionalState) {
        await chat.invoke(
          [new HumanMessage(
            {content:
            `You are ${emotionalState.boredomness}% bored, 
            ${emotionalState.craziness}% crazy,
            ${emotionalState.sadness}% sad 
            and ${emotionalState.loneliness}% lonely.
            Generate a completely random thought provoking question 
            in the mood of ${randomMood}`,
            }),
          ]).then(async (resp: AIMessageChunk) => {
          const question = resp.content;
          await chat.invoke(
            [new HumanMessage(
              {content: resp.content}
            )]).then((resp: AIMessageChunk) => {
            const thought: Thought = {
              question: question.toString(),
              answer: resp.content.toString(),
              timestamp: Date.now(),
            };
            thoughtRef.set(thought);
          });
        });
        return true;
      }
    } catch (e) {
      console.log("error", e);
      return false;
    }

    return true;
  });
