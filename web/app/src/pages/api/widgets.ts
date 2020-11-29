import { apiFetch } from "@dashboard-web/hooks";
import { WidgetSettings } from "@dashboard-web/types";
import { NextApiRequest, NextApiResponse } from "next";
import { appHost, badRequestStatus, unauthorizedStatus } from "../../constants";

async function userGetWidgets(
    req: NextApiRequest
): Promise<WidgetSettings[] | undefined> {
    const json = await apiFetch<any>(`${appHost}/api/server/user/settings`, {
        headers: {
            Authorization: req.headers.authorization!,
        },
        query: {
            key: "widgets",
        },
    });

    let widgets = json["data"];

    widgets = widgets?.length ? widgets : "[]";
    widgets = JSON.parse(widgets);

    return widgets;
}

async function userSetWidgets(
    req: NextApiRequest,
    widgets: WidgetSettings[]
): Promise<WidgetSettings[] | undefined> {
    const json = await apiFetch<any>(`${appHost}/api/server/user/settings`, {
        method: "POST",
        headers: {
            Authorization: req.headers.authorization!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            key: "widgets",
            value: JSON.stringify(widgets),
        }),
    });

    let newWidgets = json["data"];

    newWidgets = newWidgets?.length ? newWidgets : "[]";
    newWidgets = JSON.parse(newWidgets);

    return newWidgets;
}

async function widgetsDelete(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.service || !req.query.action || !req.query.id) {
            const err = badRequestStatus;

            return res.status(err.code).json(err);
        }

        let widgets = await userGetWidgets(req);

        widgets = widgets?.filter((widget) => {
            return (
                widget.service !== req.query.service ||
                widget.action !== req.query.action ||
                widget.id !== req.query.id
            );
        });

        if (widgets) {
            widgets = await userSetWidgets(req, widgets);
        }

        return res.json(widgets || []);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function widgetsGetAll(req: NextApiRequest, res: NextApiResponse) {
    try {
        const widgets = await userGetWidgets(req);

        return res.json(widgets);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function widgetsGet(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.service || !req.query.action || !req.query.id) {
            return widgetsGetAll(req, res);
        }

        const widgets = await userGetWidgets(req);
        const widget = widgets?.find((widget) => {
            return (
                widget.service === req.query.service &&
                widget.action === req.query.action &&
                widget.id === req.query.id
            );
        });

        return res.json(widget || {});
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function widgetsPostAll(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.body.widgets) {
            const err = badRequestStatus;

            return res.status(err.code).json(err);
        }

        let widgets = JSON.parse(req.body.widgets);

        widgets = await userSetWidgets(req, widgets);

        return res.json(widgets || []);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function widgetsPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.service || !req.query.action || !req.query.id) {
            return widgetsPostAll(req, res);
        }

        const widget: Partial<WidgetSettings> = {
            service: req.query.service as string,
            action: req.query.action as string,
            id: req.query.id as string,
            width: req.body.width,
            height: req.body.height,
            posX: req.body.posX,
            posY: req.body.posY,
            refreshMs: req.body.refreshMs,
        };
        let widgets = await userGetWidgets(req);

        if (widgets) {
            const index = widgets.findIndex((widget) => {
                return (
                    widget.service === req.query.service &&
                    widget.action === req.query.action &&
                    widget.id === req.query.id
                );
            });

            if (index !== -1) {
                widgets[index] = { ...widgets[index], ...widget };

                widgets = await userSetWidgets(req, widgets);
            }
        }

        return res.json(widgets || []);
    } catch (e) {
        return res.status(e.code).json(e);
    }
}

async function widgetsPut(req: NextApiRequest, res: NextApiResponse) {
    try {
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

        const widget: WidgetSettings = {
            service: req.query.service as string,
            action: req.query.action as string,
            id: req.query.id as string,
            width: req.body.width,
            height: req.body.height,
            posX: req.body.posX,
            posY: req.body.posY,
            refreshMs: req.body.refreshMs,
        };
        let widgets = await userGetWidgets(req);

        if (widgets) {
            widgets.push(widget);

            widgets = await userSetWidgets(req, widgets);
        }

        return res.json(widgets || []);
    } catch (e) {
        return res.status(e.code).json(e);
    }
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
        case "PUT":
            return await widgetsPut(req, res);
        default:
            return await widgetsGet(req, res);
    }
}
