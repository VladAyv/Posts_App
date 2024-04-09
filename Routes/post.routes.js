const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
} = require("../Controllers/postControllers.js");
const {
  postsSchema,
  patchSchema,
  validate,
} = require("../Validations/postValidation.js");
const createResponseObj = require("../utils/createResponseObj.js");
const validate = require("../Validations");
const passportConf = require("../config/passport.js");
const { ROLE_NAME } = require("../constants/index.js");
const checkRole = requestAnimationFrame("../middlewares");

const router = express.Router();

router
  .get("/", async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
      const result = await getPosts(limit, offset);
      const response = createResponseObj(
        result.posts,
        {
          totalPosts: result.totalPostsCount,
          currentPage: page,
          limit,
        },
        200
      );
      res.status(200).send(response);
    } catch (err) {
      res.status(500).send({
        message: "Something went wrong.",
      });
    }
  })
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const currentPost = await getPostById(id);
      if (!currentPost) {
        return res
          .status(404)
          .send({ message: `Post with id ${id} not found` });
      }
      const response = createResponseObj(currentPost, {}, 200);
      return res.status(200).send(response);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  })
  .post(
    "/",
    checkRole(ROLE_NAME.CREATOR),
    validate(postsSchema),
    async (req, res) => {
      try {
        const userId = req.user.id;
        const newPost = await createPost(req.body, userId);
        const response = createResponseObj(
          newPost,
          { message: "Post created successfully" },
          201
        );
        res.status(201).send(response);
      } catch (err) {
        console.error("error", err);
        res.status(500).send({ message: "Something went wrong" });
      }
    }
  )
  .put(
    "/:id",
    checkRole(ROLE_NAME.CREATOR),
    validate(patchSchema),
    async (req, res) => {
      const id = req.params.id;
      if (id !== req.user.id) {
        res
          .status(400)
          .send({ message: "You are not allowed to delete with that id" });
      }
      const data = req.body;
      try {
        const updatedPost = await updatePost(id, data);
        if (!updatedPost) {
          return res
            .status(404)
            .send({ message: `Post with id ${id} not found` });
        }
        const response = createResponseObj(
          updatedPost,
          { message: `Post with id ${id} updated successfully` },
          200
        );
        return res.status(200).send(response);
      } catch (err) {
        console.error("error", err);
        return res.status(500).send({ message: "Something went wrong" });
      }
    }
  )
  .delete(
    "/:id",
    checkRole(ROLE_NAME.CREATOR, ROLE_NAME.ADMIN, ROLE_NAME.SUPERADMIN),
    async (req, res) => {
      const id = req.params.id;
      try {
        const result = await deletePost(id);
        if (!result) {
          return res.status(404).send({ message: "Post not found" });
        }
        const response = createResponseObj(
          result,
          { message: `Post with id ${id} deleted successfully` },
          200
        );
        return res.status(200).send(response);
      } catch (err) {
        console.error("error", err);
        return res.status(500).send({ message: "Something went wrong" });
      }
    }
  );

module.exports = router;
