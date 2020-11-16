export interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;

    comparePassword(password: string): Promise<boolean>;
}
