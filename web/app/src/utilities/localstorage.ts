export function getFromLS(key: string) {
    let ls: any = {};
    if (global.localStorage) {
        try {
            let tmp = global.localStorage.getItem("rgl-8")
            if (tmp) {
                ls = JSON.parse(tmp);
            }
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key];
}

export function saveToLS(key: string, value: any) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value.lg
            })
        );
    }
}