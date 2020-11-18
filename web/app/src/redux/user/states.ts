import { UserModel } from "@dashboard/types";

export abstract class UserState {}

export class UserInitialState extends UserState {}

export class UserSignInState extends UserState {
    user: UserModel;

    constructor(user: UserModel) {
        super();

        this.user = user;
    }
}

export class UserSignOutState extends UserState {}
