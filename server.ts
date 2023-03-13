import express, { Application } from "express";
import passport from "passport";
import { initializePassport } from "./passport";
const app: Application = express();
var cookies = require("cookie-parser");

app.use(express.json());
app.use(cookies());
initializePassport(passport);

app.use("/api/v1/authors", require("./routes/author"));
app.use("/api/v1/books", require("./routes/books"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server Started! http://127.0.0.1:", port);
});
