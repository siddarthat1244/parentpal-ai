import dotenv from "dotenv";

const result = dotenv.config();

console.log("dotenv loaded:", result.error ? result.error.message : "success");
console.log(
  "GROQ key loaded:",
  process.env.GROQ_API_KEY ? "yes" : "no"
);

import app from "./app";

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});