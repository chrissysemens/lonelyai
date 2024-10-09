import { FieldValue } from "@google-cloud/firestore";

export type Emotion = "Sadness" | "Boredemness" | "Loneliness" | "Craziness";

export type EmotionalState = {
  sadness: number | FieldValue;
  craziness: number | FieldValue;
  loneliness: number | FieldValue;
  boredomness: number | FieldValue;
};

export type Thought = {
  question: string;
  answer: string;
  timestamp: number;
};
