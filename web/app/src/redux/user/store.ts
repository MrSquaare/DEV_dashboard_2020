import { createStore } from "redux";
import { userReducer } from "./reducer";

const userStore = createStore(userReducer);
