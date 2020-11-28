import {Box, Button, CircularProgress, TextField} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
    instance: string;
    save?: () => void;
};

export const CitySettings: React.FC<Props> = (props) => {

    return (
        <Box padding={"2rem"}>
            <CircularProgress />
        </Box>
    );
};
