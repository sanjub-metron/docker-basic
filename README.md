# 🚀 Reverse Proxy with Nginx + Node.js (API)

This project demonstrates how to use **Nginx as a reverse proxy** to:

* Serve **static HTML** at `/`
* Forward all `/api/*` requests to a **Node.js API**

---

## 📂 Project Structure

```
reverse-proxy-full/
│
├── nodeapp/               # Node.js API
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── nginx/                 # Nginx reverse proxy
│   ├── nginx.conf
│   └── html/
│       └── index.html
│
└── docker-compose.yml     # Orchestration
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/docker-basic.git
cd docker-basic
```

---

### 2. Build and Run with Docker Compose

```bash
docker compose up --build -d
```

This will:

* Build the Node.js API (`nodeapp`)
* Start Nginx with your custom config

---

### 3. Access the App

* **Frontend (HTML served by Nginx)** → [http://localhost:8080/](http://localhost:8080/)
* **API root** → [http://localhost:8080/api](http://localhost:8080/api)
* **API users endpoint** → [http://localhost:8080/api/users](http://localhost:8080/api/users)

---

## 🟢 Node.js Service

* Runs an **Express.js API** on port `3000`
* Example endpoints:

  * `/api` → returns `{ message: "Hello from Node.js API!" }`
  * `/api/users` → returns JSON list of users

---

## 🌐 Nginx Reverse Proxy

* Listens on port `80` (mapped to `8080` locally)
* Routes:

  * `/` → serves static HTML (`nginx/html/index.html`)
  * `/api/*` → forwards to Node.js (`nodeapp:3000`)

---

## 📦 Useful Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# Rebuild after code changes
docker compose up --build -d

# View logs
docker compose logs -f
```

---

## 📝 Notes

* `nodeapp` is accessible inside Docker Compose via its **service name** (thanks to the shared `appnet` network).
* The Nginx config (`nginx.conf`) can be extended for:

  * Serving frontend frameworks (React, Vue, Angular)
  * Load balancing multiple Node.js instances
  * SSL termination (HTTPS)
