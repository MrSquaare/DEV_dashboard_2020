const fetch = require("node-fetch");
const child_process = require("child_process")

async function main() {
    const response = await fetch(
        "http://localhost:4242/v1/services/github/authentication",
        {
            method: "POST",
            headers: {
                Authorization:
                    "JWT eyJhbGciOiJIUzI1NiJ9.TXJTcXVhYXJl.dvWx5wUWDGkjf2Tnw_m4YQ3BDfTgp6TY5YKtMqZC-mk",
            },
            body: JSON.stringify({
                instance: "web-1",
                user: "MrSquaare",
            }),
        }
    );

    console.log(response);
}

main().catch((e) => console.log(e));
