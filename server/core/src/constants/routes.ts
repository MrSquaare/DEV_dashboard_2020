export const apiRoute = "/v1";

export const apiFullRoute = `${apiRoute}`;

export const authenticationRoute = "/authentication";
export const authenticationServiceRoute = "/service/:service";
export const authenticationServiceCallbackRoute = "/callback";
export const authenticationSignInRoute = "/signin";
export const authenticationSignUpRoute = "/signup";
export const authenticationVerifyRoute = "/verify";

export const authenticationFullRoute = `${apiFullRoute}${authenticationRoute}`;
export const authenticationServiceFullRoute = `${authenticationFullRoute}${authenticationServiceRoute}`;
export const authenticationServiceCallbackFullRoute = `${authenticationServiceFullRoute}${authenticationServiceCallbackRoute}`;
export const authenticationSignInFullRoute = `${authenticationFullRoute}${authenticationSignInRoute}`;
export const authenticationSignUpFullRoute = `${authenticationFullRoute}${authenticationSignUpRoute}`;
export const authenticationSignVerifyFullRoute = `${authenticationFullRoute}${authenticationVerifyRoute}`;

export const serviceRoute = "/service/:service";
export const serviceActionRoute = "/:action";

export const serviceFullRoute = `${apiFullRoute}${serviceRoute}`;
export const serviceActionFullRoute = `${serviceFullRoute}${serviceActionRoute}`;

export const servicesRoute = "/services";

export const servicesFullRoute = `${apiFullRoute}${servicesRoute}`;

export const userRoute = "/user";
export const userSettingsRoute = "/settings";

export const userFullRoute = `${apiFullRoute}${userRoute}`;
export const userSettingsFullRoute = `${userFullRoute}${userSettingsRoute}`;

export const usersRoute = "/users";

export const usersFullRoute = `${apiFullRoute}${usersRoute}`;
