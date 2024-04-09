const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "post_id";
  }
  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "title", "content"],

      properties: {
        post_id: { type: "integer" },
        user_id: { type: "integer" },
        title: { type: "string", minLength: 1, maxLength: 90 },
        subtitle: { type: "string", minLength: 1, maxLength: 90 },
        content: { type: "string", minLength: 1 },
        creation_date: { type: "string", format: "date" },
        view_count: { type: "integer" },
      },
    };
  }

  static get relationMapping() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "posts.user_id",
          to: "users.user_id",
        },
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "posts.post_id",
          to: "comments.post_id",
        },
      },
    };
  }
}

module.exports = Post;
