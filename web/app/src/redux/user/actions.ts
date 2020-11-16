import { USER_SIGN_IN, USER_SIGN_OUT, USER_SIGN_UP } from "./types";

export interface UserSignInAction {
    type: typeof USER_SIGN_IN;
    payload: {
        username: string;
        password: string;
    };
}

export interface UserSignOutAction {
    type: typeof USER_SIGN_OUT;
}

export interface UserSignUpAction {
    type: typeof USER_SIGN_UP;
    payload: {
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
    };
}

export type UserActions =
    | UserSignInAction
    | UserSignOutAction
    | UserSignUpAction;

export function userSignInAction({
    username,
    password,
}: {
    username: string;
    password: string;
}): UserSignInAction {
    return {
        type: USER_SIGN_IN,
        payload: {
            username: username,
            password: password,
        },
    };
}

export function userSignOutAction(): UserSignOutAction {
    return {
        type: USER_SIGN_OUT,
    };
}

export function userSignUpAction({
    username,
    password,
    firstName,
    lastName,
    email,
}: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}): UserSignUpAction {
    return {
        type: USER_SIGN_UP,
        payload: {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
        },
    };
}
