type IGitHubUser = {
    id: number;
    username: string;
    name: string;
    biography: string;
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
        this.counters = user.counters;
    }

    static fromJSON(json: any) {
        return new GitHubUser({
            id: json.id,
            username: json.login,
            name: json.name,
            biography: json.bio,
            counters: {
                followers: json.followers,
                following: json.following,
                gists: json.public_gists,
                repositories: json.public_repos,
            },
        });
    }
}
