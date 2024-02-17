const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostsByLimit,
} = require("../Controllers/postControllers.js");

const {
  postSchema,
  patchSchema,
  validate,
} = require("../Validations/postValidation.js");
// const validationMiddleware = require("../Middleware/validation_mid.js");

const router = express.Router();

router
  .get("/", (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    let offset;
    if (page && limit) {
      offset = (page - 1) * limit;
    }
    getPostsByLimit(offset, limit)
      .then((posts) => {
        res.status(200).send(posts);
      })
      .catch((err) => {
        console.error("error", err);
        res.status(500).send({
          message: "Something went wrong",
        });
      });
  })
  .get("/:id", (req, res) => {
    const id = req.params.id;
    getPosts()
      .then((receivedPosts) => {
        const postIndex = receivedPosts.findIndex((el) => el.id == id);
        if (postIndex === -1) {
          res.status(404).send({
            message: "Post not found",
          });
        } else {
          res.status(200).send(receivedPosts[postIndex]);
        }
      })
      .catch((err) => {
        console.error("error", err);
        res.status(500).send({
          message: "Something went wrong",
        });
      });
  })
  .post("/", validate(postSchema), (req, res) => {
    createPost(req.body)
      .then((createdPost) => {
        res.status(201).send(createdPost);
      })
      .catch((err) => {
        console.error("error", err);
        res.status(500).send({ message: "Something went wrong" });
      });
  })
  .put("/:id", validate(postSchema), (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;
    getPosts()
      .then((receivedPosts) => {
        const postIndex = receivedPosts.findIndex((el) => el.id == id);
        if (postIndex === -1) {
          res.status(404).send({
            message: "Post not found",
          });
        } else {
          updatePost(
            receivedPosts,
            postIndex,
            updatedPost,
            (isPatch = "PATCH")
          ).then((post) => {
            console.log("post updated", post);
            res.status(200).send(post);
          });
        }
      })
      .catch((err) => {
        console.error("error", err);
        res.status(500).send({
          message: validation.error.message,
        });
      });
  })
  .delete("/:id", (req, res) => {
    getPosts.then((receivedPosts) => {
      const id = req.params.id;
      const postIndex = receivedPosts.findIndex((el) => el.id == id);
      if (postIndex === -1) {
        res.status(404).send({
          message: "Post not found",
        });
      } else {
        deletePost(receivedPosts, postIndex)
          .then(() => {
            res.status(200).send({
              message: `Post with id - ${id} successfully deleted`,
            });
          })
          .catch((err) => {
            console.error("error", err);
            res.status(500).send({
              message: "Something went wrong",
            });
          });
      }
    });
  })
  .patch("/:id", validate(patchSchema), (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;
    getPosts()
      .then((receivedPosts) => {
        const postIndex = receivedPosts.findIndex((el) => el.id == id);
        if (postIndex === -1) {
          res.status(404).send({
            message: "Post not found",
          });
        } else {
          updatePost(
            receivedPosts,
            postIndex,
            updatedPost,
            (isPatch = "PATCH")
          ).then((post) => {
            res.status(200).send(post);
          });
        }
      })
      .catch((err) => {
        console.error("error", err);
        res.status(500).send({
          message: validation.error.message,
        });
      });
  });

module.exports = router;
