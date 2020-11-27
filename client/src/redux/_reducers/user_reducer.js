import { SET_USER, SET_LOADING, SET_ERROR } from "../_actions/types";

let initState = {
  user: null,
  loading: false,
  error: "",
};

const user_reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default user_reducer;
