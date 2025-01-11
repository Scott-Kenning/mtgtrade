const http = require("http");
const express = require("express");
const app = express();

const cardsRoute = require("./routes/cards");
const usersRoute = require("./routes/users");

app.use("/cards", cardsRoute);
app.use("/users", usersRoute);

const server = http.createServer(app);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
