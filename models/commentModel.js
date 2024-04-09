const { Model } = require("objection");
const Post = require("./postModel");
const User = require("./userModel");

class Comment extends Model {
  static get tableName() {
    return "comments";
  }

  static getIdColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["post_id", "user_id", "comment"],
      properties: {
        id: { type: "integer" },
        post_id: { type: "integer" },
        user_id: { type: "integer" },
        comment: { type: "string" },
        creation_date: { type: "date", format: "date" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static get relationMappings() {
    return {
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: "comments.post_id",
          to: "posts.post_id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "comments.user_id",
          to: "users.user_id",
        },
      },
    };
  }
}

module.exports = Comment;
