import { gql } from "apollo-boost";

export const GET_ALL_DECKS = gql`
  query {
    getAllDecks {
      _id
      name
    }

    getAllCards {
      _id
      deckId
      question
      answer
    }
  }
`;

export const GET_ALL_CARDS = gql`
  query {
    getAllCards {
      _id
      deckId
      question
      answer
    }
  }
`;

export const ADD_CARD = gql`
  mutation AddCard($deckId: String!, $question: String!, $answer: String!) {
    addCard(deckId: $deckId, question: $question, answer: $answer) {
      _id
      deckId
      question
      answer
    }
  }
`;

export const ADD_DECK = gql`
  mutation AddDeck($name: String!) {
    addDeck(name: $name) {
      _id
      name
    }
  }
`;

export const DELETE_DECK = gql`
  mutation DeleteDeck($_id: ID!) {
    deleteDeck(_id: $_id) {
      _id
      name
    }
  }
`;

export const GET_DECK = gql`
  query Deck($_id: ID!) {
    getDeck(_id: $_id) {
      _id
      name
    }
    getAllCards {
      _id
      deckId
      question
      answer
    }
  }
`;
