const { Model } = require("objection");
const Role = require("./roleModel");
const Post = require("./postModel");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "user_id";
  }

  $formatJson(json) {
    // Remember to call the super class's implementation.
    json = super.$formatJson(json);
    if (json.password) {
      delete json.password;
    }
    // Do your conversion here.
    return json;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],

      properties: {
        user_id: { type: "integer" },
        role_id: { type: "integer" },
        username: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    };
  }

  static get relationMapping() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: "roles.role_id",
          to: "users.role_id",
        },
      },

      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: "users.user_id",
          to: "posts.user_id",
        },
      },

      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: "users.user_id",
          to: "comments.user_id",
        },
      },
    };
  }
}

module.exports = User;
