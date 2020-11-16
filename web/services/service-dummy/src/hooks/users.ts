import { UserModel } from "@dashboard/service-dummy";
import { useEffect, useState } from "react";

async function getUsers(): Promise<UserModel[]> {
    const response = await fetch("http://localhost:4242/v1/dummy/users");
    const json = await response.json();

    return json["data"];
}

export function useUsers() {
    const [users, setUsers] = useState<UserModel[]>();

    async function setUsersAsync() {
        const users = await getUsers();

        setUsers(users);
    }

    useEffect(() => {
        setUsersAsync().catch();
    }, []);

    return { users };
}
