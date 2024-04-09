// const fs = require("fs");
const Post = require("../models/postModel");
// const postsFilePath = "./posts.json";

const getPostById = async (id) => {
  try {
    return await Post.query().findById(id);
  } catch (err) {
    throw new Error(err);
  }
};

const getPosts = async (limit, offset) => {
  try {
    const posts = await Post.query().limit(limit).offset(offset);
    // .withGraphFetched("user");

    const totalPostsCount = await Post.query().resultSize();
    return { posts, totalPostsCount };
  } catch (err) {
    throw new Error(err);
  }
};

const getPostsByLimit = async (offset, limit) => {
  try {
    const posts = await getPosts();
    return posts.splice(offset, limit);
  } catch (err) {
    console.log(err);
    throw new Error(
      `Not able to get posts with offset ${offset} and limit ${limit}`
    );
  }
};

const createPost = async (post, userId) => {
  post.user_id = userId;
  try {
    const newPost = await Post.query().insert(post);
    return newPost;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePost = async (postId, data) => {
  try {
    const updatedPost = await Post.query().patchAndFetchById(postId, data);
    return updatedPost;
  } catch (err) {
    throw new Error(err);
  }
};

const deletePost = async (id) => {
  try {
    const res = await Post.query().deleteById(id);
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  createPost,
  updatePost,
  getPosts,
  getPostById,
  deletePost,
  getPostsByLimit,
};
