import React, { FunctionComponent, Suspense } from "react";
import { Box } from "@material-ui/core";

const HelloWorld = React.lazy(() => import("components/HelloWorld"));

const App: FunctionComponent = () => {
    return (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Suspense fallback={<div>Loading...</div>}>
                <HelloWorld />
            </Suspense>
        </Box>
    );
};

export default App;
