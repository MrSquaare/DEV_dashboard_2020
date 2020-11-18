import {
    ServiceAction,
    ServiceRequest,
    ServiceResponse,
} from "@dashboard/service";
import fetch from "node-fetch";
import { NotificationModel } from "../models/notification";
import { userTest } from "../tests/user";
import { getAccessToken } from "../utilities/token";

export class NotificationsAction extends ServiceAction {
    readonly id: string = "notifications";
    readonly name: string = "Notifications";
    readonly description: string = "GET /notifications";

    async run(request: ServiceRequest): Promise<ServiceResponse> {
        const accessToken = await getAccessToken(userTest);
        const response = await fetch("https://api.github.com/notifications", {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: `token ${accessToken}`,
            },
        });
        const json: unknown[] = await response.json();

        const data = json.map((item) => NotificationModel.fromJSON(item));

        return new ServiceResponse({
            status: response.status,
            data: data,
        });
    }
}
