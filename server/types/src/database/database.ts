export interface IDatabase {
    readonly hostname: string;
    readonly port: number;
    readonly database?: string;

    connect(): Promise<void>;

    disconnect(): Promise<void>;
}
