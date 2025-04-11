const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Map to hold connected users: { userId: [ws1, ws2, ...] }
const users = new Map();

wss.on("connection", (ws) => {
    let userId = null;

    ws.on("message", (data) => {
        const msg = JSON.parse(data);

        // 1️⃣ On connect: register user
        if (msg.type === "register") {
            userId = msg.userId;

            if (!users.has(userId)) users.set(userId, []);
            users.get(userId).push(ws);

            console.log(`✅ ${userId} connected`);
            return;
        }

        // 2️⃣ On message: send to recipient
        if (msg.type === "private_message") {
            const { to, message } = msg;
            const receivers = users.get(to);

            if (receivers) {
                receivers.forEach(socket => {
                    socket.send(JSON.stringify({
                        type: "private_message",
                        from: userId,
                        message,
                    }));
                });
            }
        }
    });

    // 3️⃣ Clean up on disconnect
    ws.on("close", () => {
        if (userId && users.has(userId)) {
            users.set(userId, users.get(userId).filter(sock => sock !== ws));
            if (users.get(userId).length === 0) users.delete(userId);
            console.log(`❌ ${userId} disconnected`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket server running at port ${PORT}`);
});
