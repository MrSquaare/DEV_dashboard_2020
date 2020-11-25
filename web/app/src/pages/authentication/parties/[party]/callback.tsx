import { ParsedUrlQuery } from "querystring";
import React from "react";

interface Props {
    query: ParsedUrlQuery;
}

class PartyAuthenticationCallbackPage extends React.Component<Props> {
    async componentDidMount() {
        await this.sendRequest();

        window.close();
    }

    render() {
        return null;
    }

    private sendRequest = async () => {
        const party = this.props.query.party;
        const queriesEntries = Object.entries(this.props.query);
        const queriesChain = queriesEntries
            .map((query) => {
                return `${query[0]}=${query[1]}`;
            })
            .join("&");

        const response = await fetch(
            `http://localhost:4242/v1/authentication/parties/${party}/callback?${queriesChain}`
        );

        if (response.status !== 200) {
            return;
        }

        const json = await response.json();

        window.opener.sessionStorage.setItem("jwt", json["data"]);
    };
}

export function getServerSideProps({ query }: Props) {
    return {
        props: {
            query: query,
        },
    };
}

export default PartyAuthenticationCallbackPage;
