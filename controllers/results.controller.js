const ObjectID = require("mongodb").ObjectID;

async function getResults(req, reply) {
  const results = this.mongo.db.collection("results");
  const result = await results.findOne({ _id: new ObjectID(req.params.id) });
  if (result) {
    return reply.send({testdata: result && result.testdata, _id: result && result._id});
  }
  reply.code(500).send({ message: "Not found" });
}

async function addResults(req, reply) {
    const results = this.mongo.db.collection("results");
    const ip = req && ( req.headers && req.headers['x-forwarded-for'] || req.socket && req.socket.remoteAddress || null);

    const data = { sex: req.body.sex, age: req.body.age, testdata: req.body.testdata, language: req.body.language || "en", ip };
    const result = await results.insertOne(data);
    reply.code(201).send(result.insertedId);
  }

module.exports = { addResults, getResults, };