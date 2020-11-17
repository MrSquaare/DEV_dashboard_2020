import cors from "cors";
import express from "express";

const hostname = process.env["HOSTNAME"] || "localhost";
const port = parseInt(process.env["PORT"] || "4000");

const app = express();

app.use(cors());

app.get("/api", (req, res) => {
    console.log("/api: Request received.");

    res.send("Connected with the backend.");
});

app.listen(port, hostname, () =>
    console.info(`ready - started server on http://${hostname}:${port}`)
);
