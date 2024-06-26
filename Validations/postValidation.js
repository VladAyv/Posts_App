const postsSchema = {
  type: "object",
  required: ["user_id", "title", "content", "view_count", "creation_date"],
  properties: {
    user_id: {
      type: "integer",
    },
    title: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    subtitle: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    content: {
      type: "string",
      minLength: 1,
    },
    view_count: {
      type: "integer",
    },
    creation_date: {
      type: "string",
      format: "date",
    },
  },
  additionalProperties: false,
};

const patchSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    subtitle: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    content: {
      type: "string",
      minLength: 1,
    },
  },
  additionalProperties: false,
};

module.exports = {
  postsSchema,
  patchSchema,
};
