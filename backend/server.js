const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");

const cardsRoute = require("./routes/cards");
const usersRoute = require("./routes/users");

app.use(cors());
app.use("/cards", cardsRoute);
app.use("/users", usersRoute);

const server = http.createServer(app);

// Enable CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
