const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require('config')

// Init express
const app = express();

// BodyParse Middleware
app.use(express.json());

// DB Config - mongoose
const db = config.get('mongoURI');

// Connect to MongoDB - mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Create endpoints/ route handlers
app.use("/api/items", require("./routes/api/items")); // Anything that goes to api/items should refer to the items var
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

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
