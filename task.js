const http = require("http");
const userPath = "./user.json";
const fs = require("fs");
const { StringDecoder } = require("string_decoder");
const express = require("express");
const app = express();

const decoder = new StringDecoder("utf-8");

app.use(express.json());

app.get("/users", (req, res) => {
  fs.readFile(userPath, (err, data) => {
    if (err) {
      console.error(err.message);
    }
    console.log(data.toString());
    res.send(JSON.parse(data));
  });
});

app.post("/users", (req, res) => {
  let result;
  result = req.body;
  fs.readFile(userPath, (err, data) => {
    if (err) {
      console.error(err.message);
    }
    let users = JSON.parse(data);
    let newUser = result;
    newUser.id = users[users.length - 1].id + 1;
    users.push(newUser);
    fs.writeFile(userPath, JSON.stringify(users), (err) => {
      if (err) {
        console.error(err.message);
      }
      res.send(JSON.stringify(newUser));
    });
  });
});

// const server = http.createServer((req, res) => {
//   if (req.url === "/" && req.method.toUpperCase() === "GET") {
//     res.writeHead(200, {
//       "Content-Type": "application/json",
//     });
//     res.end(
//       JSON.stringify({
//         message: "Hello, World",
//       })
//     );
//   }
//   if (req.url === "/users" && req.method.toUpperCase() === "GET") {
//     fs.readFile(userPath, (err, data) => {
//       if (err) {
//         console.error(err.message);
//       }
//       console.log(data.toString());
//       res.writeHead(200, {
//         "Content-Type": "application/json",
//       });
//       res.end(data.toString());
//     });
//   }
//   if (req.url === "/users" && req.method.toUpperCase() === "POST") {
//     req.on("data", (data) => {
//       result += decoder.write(data);
//     });
//     req.on("end", () => {
//       result += decoder.end();
//       fs.readFile(userPath, (err, data) => {
//         if (err) {
//           console.error(err.message);
//         }
//         let users = JSON.parse(data);
//         let newUser = JSON.parse(result);
//         newUser.id = users[users.length - 1].id + 1;
//         users.push(newUser);
//         fs.writeFile(userPath, JSON.stringify(users), (err) => {
//           if (err) {
//             console.error(err.message);
//           }
//           res.writeHead(200, {
//             "Content-Type": "application/json",
//           });
//           res.end(JSON.stringify(newUser));
//         });
//       });
//     });
//   }
// });

app.listen(3000, () => {
  console.log("Server is running on localhost 3000");
});
