import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./ProductReducer";
import { HYDRATE } from "next-redux-wrapper";
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        userReducer,
        productReducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
