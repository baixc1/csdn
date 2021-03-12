// src/index.js
import express from "express";
import Routes from "./client/Routes";
import store from "./client/redux";
import render from "./renderHelper";
import { matchRoutes } from "react-router-config";

const app = express();

app.use(express.static("public"));
app.get("*", (req, res) => {
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    const component = route.component;
    return component.getInitialData ? component.getInitialData(store) : null;
  });

  Promise.all(promises).then(() => {
    const html = render(req, store);
    res.send(html);
  });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
