import { UserOAuthRepository } from "@dashboard/database";

export abstract class Party {
    abstract readonly id: string;

    protected repository: UserOAuthRepository;

    constructor(repository: UserOAuthRepository) {
        this.repository = repository;
    }
}
