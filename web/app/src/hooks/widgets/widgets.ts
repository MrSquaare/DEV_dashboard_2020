import { useEffect } from "react";
import { apiFetch } from "../../lib/api";
import { WidgetData } from "../../types/widget";
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

    const addWidget = (widget: WidgetData) => {
        const jwt = localStorage.getItem("jwt");

        fetch(`/api/widgets`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${jwt}`,
                "Content-Type": "application/json",
            },
            query: {
                service: widget.service,
                action: widget.action,
                id: widget.id,
            },
            body: JSON.stringify({
                width: widget.width,
                height: widget.height,
                posX: widget.posX,
                posY: widget.posY,
                refreshMs: widget.refreshMs,
            }),
        });
    };

    const updateWidget = async (
        widget: Partial<WidgetData> & {
            service: string;
            action: string;
            id: string;
        }
    ) => {
        const jwt = localStorage.getItem("jwt");

        await apiFetch(`/api/widgets`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${jwt}`,
                "Content-Type": "application/json",
            },
            query: {
                service: widget.service,
                action: widget.action,
                id: widget.id,
            },
            body: JSON.stringify({
                width: widget.width,
                height: widget.height,
                posX: widget.posX,
                posY: widget.posY,
                refreshMs: widget.refreshMs,
            }),
        });
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
        removeWidget,
    };
}
