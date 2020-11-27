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
    userLocalRepository: UserLocalRepository,
    userOAuthRepository: UserOAuthRepository
): void {
    passport.use(
        jwtStrategyName,
        jwtStrategy(userLocalRepository, userOAuthRepository)
    );

    passport.use(signInStrategyName, signInStrategy(userLocalRepository));
    passport.use(signUpStrategyName, signUpStrategy(userLocalRepository));
    passport.use(verifyStrategyName, verifyStrategy(userLocalRepository));
}
