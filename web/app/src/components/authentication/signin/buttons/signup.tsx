import { Button } from "@material-ui/core";

import Link from "next/link";
import React from "react";

export const SignInSignUp: React.FC = () => {
    return (
        <Link href={"/authentication/signup"}>
            <Button color="primary" fullWidth>
                Not yet signed up?
            </Button>
        </Link>
    );
};
