import React from "react";
import { useUsers } from "../hooks";
import { UserComponent } from "./user";

export const UsersComponent: React.FC = () => {
    const { users } = useUsers();

    return (
        <div>
            {users?.map((user) => {
                return <UserComponent key={user.id} user={user} />;
            })}
        </div>
    );
};
