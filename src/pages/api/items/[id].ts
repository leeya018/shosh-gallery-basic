import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Product } from "@/interfaces/Product";

const filePath = path.join(process.cwd(), "data", "items.json");

const getItems = (): Product[] => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const saveItems = (items: Product[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    res.status(400).json({ message: "Invalid ID" });
    return;
  }

  if (req.method === "GET") {
    const items = getItems();
    const item = items.find((item) => item.id === id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } else if (req.method === "PUT") {
    const updatedItem: Product = req.body;
    const items = getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Item not found" });
    } else {
      items[index] = { ...items[index], ...updatedItem };
      saveItems(items);
      res.status(200).json(items[index]);
    }
  } else if (req.method === "DELETE") {
    const items = getItems();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Item not found" });
    } else {
      const deletedItem = items.splice(index, 1);
      saveItems(items);
      res.status(200).json(deletedItem);
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
