interface IYouTubeVideo {
    id: number;
    name: string;
    description: string;
    counters: {
        comments: number;
        dislikes: number;
        likes: number;
        views: number;
    };
}

export class YouTubeVideo implements IYouTubeVideo {
    id: number;
    name: string;
    description: string;
    counters: {
        comments: number;
        dislikes: number;
        likes: number;
        views: number;
    };

    constructor(video: IYouTubeVideo) {
        this.id = video.id;
        this.name = video.name;
        this.description = video.description;
        this.counters = video.counters;
    }

    static fromJSON(json: any) {
        return new YouTubeVideo({
            id: json.items[0].id,
            name: json.items[0].snippet.title,
            description: json.items[0].snippet.description,
            counters: {
                comments: json.items[0].statistics.commentCount,
                dislikes: json.items[0].statistics.dislikeCount,
                likes: json.items[0].statistics.likeCount,
                views: json.items[0].statistics.viewCount,
            },
        });
    }
}
