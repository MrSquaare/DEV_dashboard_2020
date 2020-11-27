import { NextApiRequest, NextApiResponse } from "next";
import { serverHost } from "../../../../constants";
import { serviceUnavailableStatus } from "../../../../constants/status";

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const routes = req.url?.substr("/api/server/redirect/".length);

    try {
        const url = `${serverHost}/v1/${routes}`;

        return res.redirect(url);
    } catch (err) {
        console.error(err);

        err = serviceUnavailableStatus;

        return res.status(err.code).send(err);
    }
}
