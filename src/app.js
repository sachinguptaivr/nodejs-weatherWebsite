const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// app as express application is created

const app = express();
const port = process.env.PORT || 3000;

// Define Paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setup static directory to serve

app.use(express.static(publicDirectoryPath));

//what server do if someaccess the url
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"));

// app.get("", (req, res) => {
//   res.send("<h>>weather</h>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "SACHIN",
//       age: 27,
//     },
//     { country: "Canada", Place: "Toronto" },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<title>This is about page</title>");
// });

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "SACHIN",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sachin gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is help page, Check FAQs",
    title: "Help",
    name: "SACHIN",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geoCode(req.query.address, (error, { latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        return res.send({
          address: req.query.address,
          forecastData,
        });
      });
    });
  } else {
    res.send({
      error: "Please provide address",
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);

  res.send({
    products: [],
  });
});

//404 page

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    message: "Help article not found",
    name: "SACHIN",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    message: "page not found",
    name: "SACHIN",
  });
});

//app.com
//app.com/help

// app.listen(3000, () => {
//   console.log("Server is up on 3000 port");
// });

app.listen(port, () => {
  console.log(`Server is up on ${port} port`);
});
