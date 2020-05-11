const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//Importing the items router file
const items = require("./routes/api/items");

// Init express
const app = express();

// BodyParse Middleware
app.use(express.json());

// DB Config - mongoose
const db = require("./config/keys").mongoURI;

// Connect to MongoDB - mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Create endpoints/ route handlers
app.use("/api/items", items); // Anything that goes to api/items should refer to the items var

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}




// Listen on port - deploying on heroku
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
