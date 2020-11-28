import { NextApiRequest, NextApiResponse } from "next";
import { badRequestStatus, unauthorizedStatus } from "../../constants";
import { WidgetData } from "../../types/widget";

async function userGetWidgets(
    authorization: string | undefined
): Promise<WidgetData[] | undefined> {
    const response = await fetch(
        "http://localhost:3000/api/server/user/settings?key=widgets",
        {
            headers: {
                Authorization: authorization || "",
            },
        }
    );

    const json = await response.json();

    let widgets = json["data"];

    widgets = widgets?.length ? widgets : "[]";
    widgets = JSON.parse(widgets);

    return widgets;
}

async function userSetWidgets(
    authorization: string | undefined,
    widgets: WidgetData[]
) {
    const response = await fetch(
        `http://localhost:3000/api/server/user/settings`,
        {
            method: "POST",
            headers: {
                Authorization: authorization || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: "widgets",
                value: JSON.stringify(widgets),
            }),
        }
    );
}

async function widgetsList(req: NextApiRequest, res: NextApiResponse) {
    const widgets = await userGetWidgets(req.headers.authorization);

    return res.json(widgets);
}

async function widgetsDelete(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.service || !req.query.action || !req.query.id) {
        const err = badRequestStatus;

        return res.status(err.code).json(err);
    }

    const widgets = await userGetWidgets(req.headers.authorization);
    const filteredWidgets = widgets?.filter((widget) => {
        return (
            widget.service !== req.query.service &&
            widget.action !== req.query.action &&
            widget.id !== req.query.id
        );
    });

    if (filteredWidgets) {
        await userSetWidgets(req.headers.authorization, filteredWidgets);
    }

    return res.json(filteredWidgets || []);
}

async function widgetsGet(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.service || !req.query.action || !req.query.id) {
        return widgetsList(req, res);
    }

    const widgets = await userGetWidgets(req.headers.authorization);
    const widget = widgets?.find((widget) => {
        return (
            widget.service === req.query.service &&
            widget.action === req.query.action &&
            widget.id === req.query.id
        );
    });

    return res.json(widget || {});
}

async function widgetsPost(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.service || !req.query.action || !req.query.id) {
        const err = badRequestStatus;

        return res.status(err.code).json(err);
    }

    if (
        !req.body.width ||
        !req.body.height ||
        !req.body.posX ||
        !req.body.posY ||
        !req.body.refreshMs
    ) {
        const err = badRequestStatus;

        return res.status(err.code).json(err);
    }

    const widget: WidgetData = {
        service: req.query.service as string,
        action: req.query.action as string,
        id: req.query.id as string,
        width: req.body.width,
        height: req.body.height,
        posX: req.body.posX,
        posY: req.body.posY,
        refreshMs: req.body.refreshMs,
    };
    let widgets = await userGetWidgets(req.headers.authorization);
    const widgetIndex = widgets?.findIndex((widget) => {
        return (
            widget.service === req.query.service &&
            widget.action === req.query.action &&
            widget.id === req.query.id
        );
    });

    if (widgets && widgetIndex !== undefined) {
        if (widgetIndex !== -1) {
            widgets[widgetIndex] = widget;
        } else {
            widgets.push(widget);
        }
    } else {
        widgets = [widget];
    }

    await userSetWidgets(req.headers.authorization, widgets);

    return res.json(widgets || []);
}

export default async function widgets(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (!req.headers.authorization) {
        const err = unauthorizedStatus;

        return res.status(err.code).json(err);
    }

    switch (req.method) {
        case "DELETE":
            return await widgetsDelete(req, res);
        case "POST":
            return await widgetsPost(req, res);
        default:
            return await widgetsGet(req, res);
    }
}
