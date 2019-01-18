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

export const GET_DECK = gql`
  query Deck($_id: ID!) {
    getDeck(_id: $_id) {
      _id
      name
    }

    getCardsOf(_id: $_id) {
      _id
    }
  }
`;
