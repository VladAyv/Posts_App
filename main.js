const express = require("express");
const dotenv = require("dotenv");
const postRouter = require("./Routes/post.routes.js");
const timeMiddleware = require("./Middleware/time.js");
require("./config/db.js");
const authRouter = require("./Routes/authRoute.js");
const passportConfig = require("./config/passport.js");

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(passportConfig.initialize());
app.use(timeMiddleware);

app.use(
  "/posts",
  passportConfig.authenticate("jwt", { session: false }),
  postRouter
);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});
