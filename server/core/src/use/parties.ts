import passport, { Strategy } from "passport";
import { StrategyParty } from "../parties/common/strategy";
import { StrategyPartyOAuth } from "../parties/oauth/strategy";
import { StrategyPartyOAuth2 } from "../parties/oauth2/strategy";
import { strategyFromPartyOAuth } from "./parties/oauth";
import { strategyFromPartyOAuth2 } from "./parties/oauth2";

export function useParties(parties: StrategyParty[]) {
    for (const party of parties) {
        let strategy: Strategy;

        if (party instanceof StrategyPartyOAuth) {
            strategy = strategyFromPartyOAuth(party);
        } else if (party instanceof StrategyPartyOAuth2) {
            strategy = strategyFromPartyOAuth2(party);
        } else {
            continue;
        }

        passport.use(`${party.id}-party`, strategy);
    }
}
