export const serverProtocol = process.env.SERVER_PROTOCOL || "http";
export const serverHostname = process.env.SERVER_HOSTAME || "localhost";
export const serverPort = process.env.SERVER_PORT || "4242";
export const serverHost = serverProtocol + "://" + serverHostname + ":" + serverPort;
