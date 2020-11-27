import { NextFunction, Request, Response } from "express";
import { partyNotFoundStatus } from "../../constants";
import { Party } from "../../party";

declare global {
    namespace Express {
        interface Request {
            party: Party;
        }
    }
}

export function partyMiddleware() {
    return function (req: Request, res: Response, next: NextFunction): void {
        const party = req.parties.find(
            (party) => party.id === req.params.party
        );

        if (party === undefined) {
            return next(partyNotFoundStatus);
        }

        req.party = party;

        return next();
    };
}
