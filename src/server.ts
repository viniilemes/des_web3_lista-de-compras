import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database.js";
import shoppingRoutes from "./routes/shoppingRoutes.js";

dotenv.config(); // carrega variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/items", shoppingRoutes);

// Iniciar servidor
connectDB();
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
