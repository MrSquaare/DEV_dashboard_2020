import { User } from "@dashboard/types";

export abstract class UserState {}

export class UserInitialState extends UserState {}

export class UserSignInState extends UserState {
    user: User;

    constructor(user: User) {
        super();

        this.user = user;
    }
}

export class UserSignOutState extends UserState {}
