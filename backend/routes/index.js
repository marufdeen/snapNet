const fs = require("fs");

const getRoutes = (app) => {
  let routes = fs.readdirSync(__dirname, { encoding: "utf-8" });
 // exclude index.js from the route to be used by app
 routes.splice(routes.indexOf("index.js"), 1); 
 // loop through to get the remaining route files
  for (route in routes) app.use(require("./".concat(routes[route])));
};

module.exports = getRoutes;