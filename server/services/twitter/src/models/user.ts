interface ITwitterUser {
    id: number;
    username: string;
    name: string;
    biography: string;
    avatarURL: string;
    counters: {
        favourites: number;
        followers: number;
        following: number;
        tweets: number;
    };
}

export class TwitterUser implements ITwitterUser {
    id: number;
    username: string;
    name: string;
    biography: string;
    avatarURL: string;
    counters: {
        favourites: number;
        followers: number;
        following: number;
        tweets: number;
    };

    constructor(user: TwitterUser) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.biography = user.biography;
        this.avatarURL = user.avatarURL;
        this.counters = user.counters;
    }

    static fromJSON(json: any): TwitterUser {
        return new TwitterUser({
            id: json.id,
            username: json.screen_name,
            name: json.name,
            biography: json.description,
            avatarURL: json.profile_image_url_https,
            counters: {
                favourites: json.favourites_count,
                followers: json.followers_count,
                following: json.friends_count,
                tweets: json.statuses_count,
            },
        });
    }
}
