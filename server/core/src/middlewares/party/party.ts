import { NextFunction, Request, Response } from "express";
import { partyNotFoundStatus } from "../../constants";
import { StrategyParty } from "../../parties/common/strategy";

declare global {
    namespace Express {
        interface Request {
            party: StrategyParty;
        }
    }
}

export function partyMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
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
