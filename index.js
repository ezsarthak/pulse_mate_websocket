const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const port = process.env.port || 3000;

let users = {}; // Store active connections

wss.on("connection", (ws, req) => {
    ws.on("message", (message) => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.error("Invalid JSON", e);
            return;
        }

        const { type, sender, receiver, content } = data;

        if (type === "register") {
            users[sender] = ws;
            ws.send(JSON.stringify({ type: "ack", message: "Registered successfully" }));
        } 
        else if (type === "message") {
            if (users[receiver]) {
                users[receiver].send(JSON.stringify({ sender, content }));
                ws.send(JSON.stringify({ type: "ack", message: "Msg Sent successfully" }))
            } else {
                ws.send(JSON.stringify({ type: "error", message: "User offline" }));
            }
        }
    });

    ws.on("close", () => {
        for (let user in users) {
            if (users[user] === ws) {
                delete users[user];
                break;
            }
        }
    });
});

server.listen(port, () => console.log("Server running on port 3000"));
