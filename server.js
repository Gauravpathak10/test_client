
const next = require("next");
const routes = require("./routes/route");
let developmentMode = true;
const app = next({ dev: developmentMode });
const handler = routes.getRequestHandler(app);

const path = require("path");

// create application/x-www-form-urlencoded parse
// With express
const express = require("express");
// const { default: axios } = require("axios");
// const { earningsLRRedirect, earningsSectorRedirect } = require('./interceptor/redirection');  //intercept requests
const PROD = process.env.CLASS_CLIENT;
app
  .prepare()
  .then(() => {
    const server = express();
    const port = process.env.CLIENT_PORT ? process.env.CLIENT_PORT : 3000;

    server.use(express.static(path.join(__dirname, "public")));
    // Newrelic
    server.get("*", (req, res) => {
      // if (PROD === "LOCAL" || PROD === "production") {
      //   const parsedUrl = parse(req.url, true);
      //   const { pathname, query } = parsedUrl;
      //   newrelic.setTransactionName(pathname);
      // }

      // if(!req.url.includes("/mc-react/_next/data") && !req.url.includes("/mc-react/health-check")) req.url = req.url.replace("/mc-react", "");//avoid /next/data/cb from replacing
      // console.log(">>>INNN SERVER",req.url);
      handler(req, res); //next-routes handler
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`=> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error in preparing app");
    console.log(err);
    return "Error in preparing app";
  });
