const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const wilderController = require("./controllers/wilder");
const asyncHandler = require("express-async-handler");
const WilderModel = require("./models/Wilder");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to db"))
  .catch(console.error);

app.get("/", (req, res) => {
  const firstWilder = new WilderModel({
    name: "First Wilder",
    city: "San Francisco",
    skills: [
      { title: "HTML", votes: 10 },
      { title: "React", votes: 5 },
    ],
  });
  firstWilder
    .save()
    .then((result) => {
      console.log("success:", result);
    })
    .catch((err) => {
      console.log("error:", err);
    });
});
app.get("/api/wilders", wilderController.read);
app.post("/api/wilders", asyncHandler(wilderController.create));
app.put("/api/wilders", asyncHandler(wilderController.update));
app.delete("/api/wilders", asyncHandler(wilderController.delete));

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something bad happened...");
  }
  console.log(`Server is listening on ${port}`);
});
