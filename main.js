const express = require("express");
const dotenv = require("dotenv");
const postRouter = require("./Routes/post.routes.js");
const timeMiddleware = require("./Middleware/time.js");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(timeMiddleware);

app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});
