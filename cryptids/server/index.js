const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { header } = require("express-validator");
const dashboardRouter = require("./Routes/Dashboard.js");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "https://cryptids1.netlify.app",
    credentials: true,
  })
);

//---------------mongoose connection----------------//

const Connection_url =
  "mongodb+srv://devang:devang@cluster0.ort1sen.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const PORT = 3001;

mongoose
  .connect(Connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`running ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set("strictQuery", true);
mongoose.set("strictQuery", true);

//---------------mongoose connection----------------//

//here are routes for backend calls

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin" , "https://cryptids1.netlify.app");
  res.header(
    "Access-Control-Allow-Origin",
    "Origin,X-Requested-With,Content-Type,Accept",
    "Access-Control-Allow-Methods: GET, DELETE, HEAD, OPTIONS, POST"
  );
  // header("Access-Control-Allow-Methods:POST,GET,OPTION,PUT,DELETE")
  // header("Access-Control-Allow-Headers:Content-Type,X-Auth-Token,Origin,Authorization")
  next();
});

app.use(express.json());
app.use("/dashboard", dashboardRouter);
app.use("/dashboard", require("./Routes/Userdetails"));
app.use("/dashboard", require("./Routes/ProfileUpdate"));

app.use("/register", require("./Routes/CreateUser"));
app.use("/register", require("./Routes/Signup"));

app.use("/transactions", require("./Routes/Transactions"));
app.use("/transactions", require("./Routes/Transactions"));
app.use("/wallet", require("./Routes/Wallet"));
