import { FieldValue } from "@google-cloud/firestore";

 export type EmotionalState = {
   craziness: number | FieldValue;
   loneliness: number | FieldValue;
   boredomness: number | FieldValue;
 }
 
 export type Thought = {
    question: string;
    answer: string;
    timestamp: number;
 }