export const appProtocol = process.env.PROTOCOL || "http";
export const appHostname = process.env.HOSTNAME || "localhost";
export const appPort = process.env.PORT || 3000;
export const appHost = appProtocol + "://" + appHostname + ":" + appPort;

export const serverProtocol = process.env.SERVER_PROTOCOL || "http";
export const serverHostname = process.env.SERVER_HOSTNAME || "localhost";
export const serverPort = process.env.SERVER_PORT || 8080;
export const serverHost =
    serverProtocol + "://" + serverHostname + ":" + serverPort;

export const serverRedirectProtocol =
    process.env.SERVER_REDIRECT_PROTOCOL || serverProtocol;
export const serverRedirectHostname =
    process.env.SERVER_REDIRECT_HOSTNAME || serverHostname;
export const serverRedirectPort =
    process.env.SERVER_REDIRECT_PORT || serverPort;
export const serverRedirectHost =
    serverRedirectProtocol +
    "://" +
    serverRedirectHostname +
    ":" +
    serverRedirectPort;
