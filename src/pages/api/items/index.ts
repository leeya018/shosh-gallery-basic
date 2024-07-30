import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Product } from "@/interfaces/Product";

const filePath = path.join(process.cwd(), "src/pages/api/data", "items.json");

const getItems = (): Product[] => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const saveItems = (items: Product[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const items = getItems();
    res.status(200).json(items);
  } else if (req.method === "POST") {
    const newItem: Product = req.body;
    const items = getItems();
    items.push(newItem);
    saveItems(items);
    res.status(201).json(newItem);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
