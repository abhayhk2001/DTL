const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();
const port = 8000;

const Require = require("./requires");

// middlewares
app.use(express.json());
app.use(cors());

const pusher = new Pusher({
  appId: "1221284",
  key: "697273901d86faf9f138",
  secret: "1bbd0258b8dc8390efee",
  cluster: "ap2",
  useTLS: true,
});

// DB config
const connection_url =
  "mongodb+srv://admin:jx42UAiAACf0ZQWW@cluster0.t8yvz.mongodb.net/slotdb?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful");
  });

const db = mongoose.connection;

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/require/getAll", (req, res) => {
  Require.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/require/new", (req, res) => {
  const dbRequire = req.body;

  Require.create(dbRequire, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
