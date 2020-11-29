type IGitHubUser = {
    id: number;
    username: string;
    name: string;
    biography: string;
    avatarURL: string;
    counters: {
        followers: number;
        following: number;
        gists: number;
        repositories: number;
    };
};

export class GitHubUser implements IGitHubUser {
    id: number;
    username: string;
    name: string;
    biography: string;
    avatarURL: string;
    counters: {
        gists: number;
        followers: number;
        following: number;
        repositories: number;
    };

    constructor(user: IGitHubUser) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.biography = user.biography;
        this.avatarURL = user.avatarURL;
        this.counters = user.counters;
    }

    static fromJSON(json: any): GitHubUser {
        return new GitHubUser({
            id: json.id,
            username: json.login,
            name: json.name,
            biography: json.bio,
            avatarURL: json.avatar_url,
            counters: {
                followers: json.followers,
                following: json.following,
                gists: json.public_gists,
                repositories: json.public_repos,
            },
        });
    }
}
