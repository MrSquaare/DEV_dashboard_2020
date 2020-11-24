import { UserLocalRepository, UserOAuthRepository } from "@dashboard/database";
import passport from "passport";
import {
    jwtStrategyName,
    signInStrategyName,
    signUpStrategyName,
    verifyStrategyName,
} from "../constants";
import {
    jwtStrategy,
    signInStrategy,
    signUpStrategy,
    verifyStrategy,
} from "../strategies";

export function useStrategies(
    localRepository: UserLocalRepository,
    oauthRepository: UserOAuthRepository
) {
    passport.use(
        jwtStrategyName,
        jwtStrategy(localRepository, oauthRepository)
    );

    passport.use(signInStrategyName, signInStrategy(localRepository));
    passport.use(signUpStrategyName, signUpStrategy(localRepository));
    passport.use(verifyStrategyName, verifyStrategy(localRepository));
}
