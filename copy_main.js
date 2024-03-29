// const http = require("http");
// const url = require("url");
// const { StringDecoder } = require("string_decoder");
// const {
//   patchSchema,
//   postsSchema,
//   validate,
// } = require("./Validations/postValidation");
// const {
//   getPosts,
//   createPost,
//   deletePost,
//   updatePost,
// } = require("./Controllers/postControllers");

// const server = http.createServer((req, res) => {
//   const parsedUrl = url.parse(req.url, true);
//   const path = parsedUrl.pathname;
//   const trimPath = path.replace(/^\/+|\/+$/g, "");

//   const method = req.method.toUpperCase();

//   console.log("method", method);
//   console.log("trimpath", trimPath);

//   const mainPath = trimPath.split("/")[0];
//   let id = trimPath.split("/")[1] || null;

//   if (id) {
//     id = parseInt(id) || "Invalid";
//   }

//   let result = "";

//   const decoder = new StringDecoder("utf-8");

//   req.on("data", (data) => {
//     console.log("data", data);
//     result += decoder.write(data);
//   });

//   req.on("end", () => {
//     result += decoder.end();

//     if (mainPath === "posts" && !id) {
//       switch (method) {
//         case "POST":
//           console.log("enter POST");
//           const newPost = JSON.parse(result);
//           const validation = validate(newPost, postSchema);
//           if (!validation.isValid) {
//             res.writeHead(400, {
//               "Content-Type": "application/json",
//             });
//             res.end(
//               JSON.stringify({
//                 message: validation.error.message,
//               })
//             );
//             return;
//           }
//           createPost(newPost)
//             .then((createdPost) => {
//               console.log("Created post", createdPost);
//               res.writeHead(201, {
//                 "Content-Type": "application/json",
//               });
//               res.end(JSON.stringify(createdPost));
//             })
//             .catch((err) => {
//               console.error("error", err);
//               res.writeHead(500, {
//                 "Content-Type": "application/json",
//               });
//               res.end(JSON.stringify({ message: "Something went wrong" }));
//             });
//           break;
//         case "GET":
//           console.log("enter GET");
//           getPosts()
//             .then((posts) => {
//               console.log("Recieved posts", posts);
//               res.writeHead(200, {
//                 "Content-Type": "application/json",
//               });
//               res.end(JSON.stringify(posts));
//             })
//             .catch((err) => {
//               console.error("error", err);
//               res.writeHead(500, {
//                 "Content-Type": "application/json",
//               });
//               res.end(JSON.stringify({ message: "Something went wrong" }));
//             });
//       }
//     } else if (mainPath === "posts" && id) {
//       console.log("entered posts/:id");
//       getPosts()
//         .then((receivedPosts) => {
//           const postIndex = receivedPosts.findIndex((el) => el.id === id);
//           if (postIndex === -1) {
//             res.writeHead(404, {
//               "Content-Type": "application/json",
//             });
//             res.end(
//               JSON.stringify({
//                 message: "Post not found!!!",
//               })
//             );
//           } else {
//             switch (method) {
//               case "GET":
//                 res.writeHead(200, {
//                   "Content-Type": "application/json",
//                 });
//                 res.end(JSON.stringify(receivedPosts[postIndex]));
//                 break;
//               case "DELETE":
//                 console.log("enter DELETE");
//                 deletePost(receivedPosts, postIndex).then(() => {
//                   res.writeHead(200, {
//                     "Content-Type": "application/json",
//                   });
//                   res.end(
//                     JSON.stringify({
//                       message: `Post with id - ${id} successfully deleted`,
//                     })
//                   );
//                 });
//                 break;
//               case "PUT":
//               case "PATCH":
//                 const updatedPost = JSON.parse(result);
//                 const validationSchema =
//                   method === "PUT" ? postSchema : patchSchema;
//                 const validation = validate(updatedPost, validationSchema);
//                 console.log("validation", validation);
//                 if (!validation.isValid) {
//                   res.writeHead(400, {
//                     "Content-Type": "application/json",
//                   });
//                   res.end(
//                     JSON.stringify({
//                       message: validation.error,
//                     })
//                   );
//                   return;
//                 }
//                 updatePost(
//                   receivedPosts,
//                   postIndex,
//                   updatedPost,
//                   method === "PATCH"
//                 )
//                   .then((post) => {
//                     console.log("post updated", post);
//                     res.writeHead(200, {
//                       "Content-Type": "application/json",
//                     });
//                     res.end(JSON.stringify(post));
//                   })
//                   .catch((err) => {
//                     console.error("error", err);
//                     res.writeHead(500, {
//                       "Content-Type": "application/json",
//                     });
//                     res.end(
//                       JSON.stringify({ message: "Something went wrong" })
//                     );
//                   });
//                 break;
//             }
//           }
//         })
//         .catch((err) => {
//           console.error("error", err);
//           res.writeHead(500, {
//             "Content-Type": "application/json",
//           });
//           res.end(JSON.stringify({ message: "Something went wrong" }));
//         });
//     }
//   });
// });

// server.listen(3000, () => {
//   console.log("server is running on localhost: 3000");
// });
