require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const Person = require("./models/person");
app.use(cors());

//custom token
morgan.token("detail", (request, response) => {
  if (request.method === "POST") {
    const body = request.body;
    return JSON.stringify(body);
  } else {
    return "";
  }
});
//listing

app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :detail"
  )
);
const errorhandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
//API Calls

app.get("/api/persons", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});
app.get("/info/", (request, response) => {
  const now = new Date();
  const part1 = now.toDateString();
  const part2 = now.toTimeString();
  Person.find({}).then((p) => {
    response.send(`
  <h4>Phonebook has info for ${p.length} people</h4>
  <h4>${part1} ${part2}</h4>
`);
  });
});
app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((p) => {
      response.json(p);
    })
    .catch((error) => next(error));
});
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((p) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((p) => response.json(p))
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  Person.findById(request.params.id)
    .then((p) => {
      if (!p) {
        response.status(404).end();
      } else {
        p.name = body.name;
        p.number = body.number;
        return p.save().then((updatedperson) => response.json(updatedperson));
      }
    })
    .catch((error) => next(error));
});
app.use(errorhandler);
//listener

const PORT = process.env.PORT;
app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
