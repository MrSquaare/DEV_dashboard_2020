import { UserRepository } from "@dashboard/database";
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

export function useStrategies(repository: UserRepository) {
    passport.use(jwtStrategyName, jwtStrategy(repository));
    passport.use(signInStrategyName, signInStrategy(repository));
    passport.use(signUpStrategyName, signUpStrategy(repository));
    passport.use(verifyStrategyName, verifyStrategy(repository));
}
