const {
    addResults,
    getResults,
  } = require("../controllers/results.controller");
  
  
  async function routes(fastify, options) {
    fastify.post("/results", addResults);
    fastify.get("/results/:id", getResults);
  }
  module.exports = routes;