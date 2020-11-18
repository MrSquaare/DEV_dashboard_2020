import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Typography,
} from "@material-ui/core";
import * as React from "react";

class IndexPage extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
                <Card variant="outlined">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            user.username
                        </Typography>
                        <Typography variant="h5" component="h2">
                            user.firstName user.lastName
                        </Typography>
                        <Typography color="textSecondary">
                            user.email
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Sign out</Button>
                    </CardActions>
                </Card>
            </Container>
        );
    }
}

export default IndexPage;
