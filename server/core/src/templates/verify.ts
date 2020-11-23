import { Mail, UserAccount } from "@dashboard/types";
import * as fs from "fs";
import Mustache from "mustache";

type VerifyCustomization = {
    baseURL: string;
    URL: string;
};

function renderTemplate(
    firstName: string,
    lastName: string,
    URL: string
): string {
    const buffer = fs.readFileSync(`${__dirname}/verify.mustache`);
    const html = Mustache.render(buffer.toString(), {
        firstName: firstName,
        lastName: lastName,
        URL: URL,
    });

    return html;
}

export function verifyTemplate(
    user: UserAccount,
    custom: VerifyCustomization
): Mail {
    const html = renderTemplate(user.firstName, user.lastName, custom.URL);

    return {
        to: user.email,
        from: "noreply.dashboard.project@gmail.com",
        subject: "Verify your email",
        text: `Hello ${user.firstName} ${user.lastName},
        
        Please verify your email on ${custom.URL}`,
        html: html,
    };
}
