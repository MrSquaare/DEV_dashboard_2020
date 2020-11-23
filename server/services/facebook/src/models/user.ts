interface IFacebookUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    counters: {
        friends: number;
    };
}

export class FacebookUser implements IFacebookUser {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    counters: { friends: number };

    constructor(user: IFacebookUser) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.counters = user.counters;
    }

    static fromJSON(json: any) {
        return new FacebookUser({
            id: json.id,
            username: json.username,
            firstName: json.first_name,
            lastName: json.last_name,
            counters: {
                friends: json.friends?.length,
            },
        });
    }
}
