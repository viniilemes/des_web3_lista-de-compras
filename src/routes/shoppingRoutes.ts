import { Router } from "express";
import ShoppingItem from "../models/ShoppingItem.js";

const router = Router();

// ➕ Criar item
router.post("/", async (req, res) => {
  try {
    const item = new ShoppingItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// 📖 Listar todos
router.get("/", async (_req, res) => {
  const items = await ShoppingItem.find();
  res.json(items);
});

// ✏ Atualizar por ID
router.put("/:id", async (req, res) => {
  try {
    const item = await ShoppingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// ❌ Deletar por ID
router.delete("/:id", async (req, res) => {
  try {
    await ShoppingItem.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deletado!" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

export default router;
