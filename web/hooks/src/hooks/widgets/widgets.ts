import { WidgetSettings } from "@dashboard-web/types";
import { useEffect } from "react";
import { apiFetchCb, RequestParameters } from "../../lib";
import { useApi } from "../api";

export function useWidgets() {
    const { data, error, fetch } = useApi();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/widgets`, {
            headers: {
                Authorization: `JWT ${jwt}`,
            },
        });
    }, []);

    const addWidget = (settings: WidgetSettings) => {
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/widgets`, {
            method: "PUT",
            headers: {
                Authorization: `JWT ${jwt}`,
                "Content-Type": "application/json",
            },
            query: {
                service: settings.service,
                action: settings.action,
                id: settings.id,
            },
            body: JSON.stringify({
                width: settings.width,
                height: settings.height,
                posX: settings.posX,
                posY: settings.posY,
                refreshMs: settings.refreshMs,
            }),
        });
    };

    const updateWidget = async (
        settings: Partial<WidgetSettings> & {
            service: string;
            action: string;
            id: string;
        },
        refresh = false
    ) => {
        const jwt = localStorage.getItem("jwt");
        const route = `/api/widgets`;
        const params: RequestParameters = {
            method: "POST",
            headers: {
                Authorization: `JWT ${jwt}`,
                "Content-Type": "application/json",
            },
            query: {
                service: settings.service,
                action: settings.action,
                id: settings.id,
            },
            body: JSON.stringify({
                width: settings.width,
                height: settings.height,
                posX: settings.posX,
                posY: settings.posY,
                refreshMs: settings.refreshMs,
            }),
        };

        if (!refresh) {
            apiFetchCb(route, params).catch((e: Error) => console.error(e));
        } else {
            fetch(route, params);
        }
    };

    const updateWidgets = async (
        widgets: Partial<WidgetSettings> &
            {
                service: string;
                action: string;
                id: string;
            }[]
    ) => {
        const jwt = localStorage.getItem("jwt");

        apiFetchCb(`/api/widgets`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${jwt}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                widgets: JSON.stringify(widgets),
            }),
        }).catch((e) => console.error(e));
    };

    const removeWidget = (widget: {
        service: string;
        action: string;
        id: string;
    }) => {
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/widgets`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${jwt}`,
            },
            query: {
                service: widget.service,
                action: widget.action,
                id: widget.id,
            },
        });
    };

    return {
        widgets: data,
        error,
        addWidget,
        updateWidget,
        updateWidgets,
        removeWidget,
    };
}
