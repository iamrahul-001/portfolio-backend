// require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/users");
const contactModel = require("./models/contact");
const path = require("path");

const app = express();
const port = process.env.PORT || 3001;

// app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/details', async (req, res) => {
//     // const user = await userModel.findOne({id: 123});
//     const user = await userModel.find({});
//     res.send(user);
// });

// app.get('/contact', async (req, res) => {
//     // const user = await userModel.findOne({id: 123});
//     const contact = await contactModel.find({});
//     res.send(contact);
// });

app.get("/", function (req, res) {
  res.send("Server is up");
});

app.get("/api/messages", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var data = await contactModel.find();
  } catch (e) {
    res.send(e);
  }
  //    console.log(data)
  res.json(data);
});

app.delete("/api/deletemessage/:id", async (req, res) => {
  contactModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});
app.post("/api/contact", (req, res) => {
  // console.log(req.body);
  var myData = new contactModel(req.body);
  myData
    .save()
    .then(() => {
      res.status(200).json({ status: "success" });
    })
    .catch(() => {
      res.status(400).json({ status: "fail" });
    });
});
app.post("/api/signin", (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  
  userModel.findOne({ username: username }, function (err, foundUser) {
    
    if (err) {
      console.log(err);
      res.json({status:"error"})
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
        
          res.status(200).json({ status: "success" });
          // console.log("success")
        }
        else{
          res.status(400).json({ status: "fail" });
        }
      }
      else{
        res.status(400).json({ status: "fail" });
        // console.log("fail")
      }
    }
  });
});
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
// });

app.listen(port, () => console.log(`App listening on port ${port}!`));
