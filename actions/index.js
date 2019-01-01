export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const RECEIVE_CARDS = "RECEIVE_CARDS";
import { guid } from "../utils/helper";

export function receiveDecks({ decks }) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}
export function receiveCards({ cards }) {
  return {
    type: RECEIVE_CARDS,
    cards
  };
}

export function addDeck({ deckName }) {
  var id = guid();
  let deck = {
    [id]: {
      deckName,
      key: id
    }
  };
  return {
    type: ADD_DECK,
    deck
  };
}

export function addCard({ question, deck, answer }) {
  var id = guid();
  let card = {
    [id]: {
      question,
      deck,
      answer,
      key: id
    }
  };
  return {
    type: ADD_CARD,
    card
  };
}
