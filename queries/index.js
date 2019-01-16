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
