import { Express } from "express";
import passport, { Strategy } from "passport";
import { Party, PartyOAuth, PartyOAuth2 } from "../party";
import { strategyFromPartyOAuth } from "./parties/oauth";
import { strategyFromPartyOAuth2 } from "./parties/oauth2";

declare global {
    namespace Express {
        interface Request {
            parties: Party[];
        }
    }
}

function exposeParties(express: Express, parties: Party[]) {
    express.use((req, res, next) => {
        req.parties = parties;

        return next();
    });
}

export function useParties(express: Express, parties: Party[]): void {
    exposeParties(express, parties);

    for (const party of parties) {
        let strategy: Strategy;

        if (party instanceof PartyOAuth) {
            strategy = strategyFromPartyOAuth(party);
        } else if (party instanceof PartyOAuth2) {
            strategy = strategyFromPartyOAuth2(party);
        } else {
            continue;
        }

        passport.use(`${party.id}-party`, strategy);
    }
}
