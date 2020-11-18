import { UserActions } from "./actions";
import { UserInitialState, UserState } from "./states";
import { USER_SIGN_IN, USER_SIGN_OUT, USER_SIGN_UP } from "./types";

const initialState = new UserInitialState();

export function userReducer(
    state: UserState = initialState,
    action: UserActions
): UserState {
    switch (action.type) {
        case USER_SIGN_IN:
            return "signin";
        case USER_SIGN_OUT:
            return "signout";
        case USER_SIGN_UP:
            return "signup";
        default:
            return state;
    }
}
