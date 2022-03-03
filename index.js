const fastify = require('fastify')({logger: true})
const dotenv = require("dotenv");
dotenv.config();

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.MONGO_URL,
});

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.register(require("./routes/results"));

// Run the server!
const port = process.env.PORT || 4000;
const startServer = async () => {
    try {
      await fastify.listen(port);
      fastify.log.info(`server listening on ${port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

startServer()