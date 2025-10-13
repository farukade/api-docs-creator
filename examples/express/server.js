#!/usr/bin/env node

/**
 * Example server showing how to use API Docs Creator middleware
 * This replaces the old standalone server.js
 */

const express = require("express");
const { apiDocsCreator, defaultPath } = require("../../lib/index");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

app.use(cors());

// Middleware
app.use((req, res, next) => {
  console.log(`🔗 Request: ${req.method} ${req.path}`);
  next();
});

// Mount API Docs Creator at /api-docs
app.use(
  defaultPath,
  apiDocsCreator({
    name: "Example API",
    description: "Example API documentation using API Docs Creator middleware",
    version: "1.0.0",
    author: "Example Team",
    baseUrl: `http://localhost:${PORT}`,
    allowExternalEdit: true,
    createSampleEndpoint: true,
  })
);

// Example API routes for testing
app.get("/users", (req, res) => {
  res.json({
    users: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
    total: 2,
    page: 1,
  });
});

app.post("/users", (req, res) => {
  res.status(201).json({
    id: 3,
    name: req.body.name,
    email: req.body.email,
    createdAt: new Date().toISOString(),
  });
});

app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  if (userId === 1) {
    res.json({ id: 1, name: "John Doe", email: "john@example.com" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Example API Server",
    documentation: `http://localhost:${PORT}/api-docs-creator`,
    endpoints: ["GET /users", "POST /users", "GET /users/:id", "GET /health"],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Example server running on http://localhost:${PORT}`);
  console.log(
    `📖 API Documentation: http://localhost:${PORT}/api-docs-creator`
  );
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log("");
  console.log("Press Ctrl+C to stop");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down gracefully...");
  process.exit(0);
});
