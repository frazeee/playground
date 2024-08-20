const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/playgroundDB")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const playgroundSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    pencilType: {
      type: String,
      required: true,
    },

    pencilColor: {
      type: String,
    },

    length: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Text = mongoose.model("Text", playgroundSchema);

app.get("/text", async (req, res) => {
  try {
    const text = await Text.find({});
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/text/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const text = await Text.findById(id);
    res.status(200).json(text);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/text", async (req, res) => {
  try {
    const text = await Text.create(req.body);
    res.status(200).json(text);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
});

app.put("/text/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body)
    const text = await Text.findByIdAndUpdate(id, req.body);

    if (!text) {
      return res.status(404).json({ message: "Text not found" });
    }
    console.log(id);
    const updatedText = await Text.findById(id);
    res.status(200).json(updatedText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/text/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const text = await Text.findByIdAndDelete(id);

    if (!text) {
      return res.status(404).json({ message: "Text not found" });
    }

    res.status(200).json({ message: `Text deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
