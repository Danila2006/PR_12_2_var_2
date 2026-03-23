import http from "http";
import { execute } from "./query-engine.js";

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    if (req.url.startsWith("/search")) {
        const url = new URL(req.url, "http://localhost:3000");
        const q = url.searchParams.get("q");

        const result = execute(q);

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(result, null, 2));
    }

    res.writeHead(404);
    res.end("Not found");
});

server.listen(3000, () => {
    console.log("Semantic engine running on http://localhost:3000");
});