require("dotenv").config();
require("./config/db");
const userRouter = require("./api/user");

const app = require("express")();

const port = process.env.PORT;

const bodyParser = require("express").json();
app.use(bodyParser);

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
