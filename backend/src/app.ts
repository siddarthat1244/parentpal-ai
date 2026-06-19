import express from "express";
import cors from "cors";
import parentRoutes from "./routes/parentRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("ParentPal AI backend is running");
});

app.use("/api/parent", parentRoutes);

export default app;