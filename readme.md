# PulseMate WebSocket Server

A real-time WebSocket server for the PulseMate dating application, enabling instant messaging, notifications, and live updates.

---

## 📖 Overview

PulseMate WebSocket Server provides the real-time communication backbone for the PulseMate dating application. It handles:

- 💬 Instant messaging between matched users  
- 🔔 Real-time messages 


---

## ⚙️ Technologies

- Node.js  
- WebSockets (via Socket.io)  
- Express.js  
- JavaScript  

---

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/ezsarthak/pulse_mate_websocket.git
cd pulse_mate_websocket

# Install dependencies
npm install
```

## 🧪 Usage

### 🟢 Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## 🔗 Client Connection Example (Flutter)
See Full Example –  [Here](https://github.com/ezsarthak/pulse_mate)
```Dart
    import 'package:web_socket_channel/io.dart';
    import 'package:web_socket_channel/web_socket_channel.dart';

    late WebSocketChannel _channel;
    _channel = IOWebSocketChannel.connect(AppConstants.webSocketServerAddress);

    // Register user
    _channel.sink.add(jsonEncode({"type": "register", "userId": userId}));

    // Listen for incoming messages
    _channel.stream.listen((message) {
      print("Received: $message");
      final data = jsonDecode(message);

      if (data.containsKey("from") &&
          data.containsKey("message") &&
          data["from"] == receiver) {
        onMessageReceived?.call(data["from"], data['message']);
      }
    });
   // Send messages
     final data = jsonEncode({
      "type": "private_message",
      "to": receiver,
      "message": message,
    });
      _channel.sink.add(data);
```

---


## 🤝 Contributing

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "Add some amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```


## 📬 Contact

**Sarthak** – [@ezsarthak](https://github.com/ezsarthak)  
Project Link: [https://github.com/ezsarthak/pulse_mate_websocket](https://github.com/ezsarthak/pulse_mate_websocket)
