import { ParsedUrlQuery } from "querystring";
import React from "react";

interface Props {
    query: ParsedUrlQuery;
}

class ServiceAuthenticationCallbackPage extends React.Component<Props> {
    async componentDidMount() {
        await this.sendRequest();

        window.close();
    }

    render() {
        return null;
    }

    private sendRequest = async () => {
        const service = this.props.query.service;
        const queriesEntries = Object.entries(this.props.query);
        const queriesChain = queriesEntries
            .map((query) => {
                return `${query[0]}=${query[1]}`;
            })
            .join("&");

        await fetch(
            `http://localhost:4242/v1/services/${service}/authentication/callback?${queriesChain}`,
            {
                headers: {
                    Authorization: `JWT ${sessionStorage.getItem("jwt")}`,
                },
            }
        );
    };
}

export function getServerSideProps({ query }: Props) {
    return {
        props: {
            query: query,
        },
    };
}

export default ServiceAuthenticationCallbackPage;
