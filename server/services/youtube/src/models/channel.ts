interface IYouTubeChannel {
    id: number;
    name: string;
    description: string;
    counters: {
        subscribers: number;
        views: number;
    };
}

export class YouTubeChannel implements IYouTubeChannel {
    id: number;
    name: string;
    description: string;
    counters: {
        subscribers: number;
        views: number;
    };

    constructor(channel: IYouTubeChannel) {
        this.id = channel.id;
        this.name = channel.name;
        this.description = channel.description;
        this.counters = channel.counters;
    }

    static fromJSON(json: any) {
        return new YouTubeChannel({
            id: json.items[0].id,
            name: json.items[0].snippet.title,
            description: json.items[0].snippet.description,
            counters: {
                subscribers: json.items[0].statistics.subscriberCount,
                views: json.items[0].statistics.viewCount,
            },
        });
    }
}
