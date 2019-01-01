import { ADD_CARD, RECEIVE_CARDS } from "../actions";
function entries(state = {}, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
      return {
        ...state,
        ...action.cards
      };
    case ADD_CARD:
      return {
        ...state,
        ...action.card
      };
    default:
      return state;
  }
}
export default entries;
