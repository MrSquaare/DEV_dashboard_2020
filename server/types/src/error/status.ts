import { Status } from "../http";

export class StatusError implements Error, Status {
    code: number;
    name: string;
    message: string;

    constructor(code: number, status: Status) {
        this.code = code;
        this.name = status.name;
        this.message = status.message;
    }
}
