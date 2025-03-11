 
const express = require("express");
const app = express();

const routes = require("./routes/routes");

app.set("PORT", 3000);


// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

// Server
app.listen(app.get("PORT"), () => {
    console.log(`App listening on PORT ${app.get("PORT")}`);
  });


  module.exports = app;