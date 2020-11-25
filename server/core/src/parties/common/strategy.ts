import { UserOAuthRepository } from "@dashboard/database";

export abstract class StrategyParty {
    abstract readonly id: string;

    protected repository: UserOAuthRepository;

    constructor(repository: UserOAuthRepository) {
        this.repository = repository;
    }
}
