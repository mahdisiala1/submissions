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

//API Calls

app.get("/api/persons", (request, response) => {
  Person.find({}).then((p) => {
    response.json(p);
  });
});
app.get("/info/", (request, response) => {
  const info = persons.length;
  const now = new Date();
  const part1 = now.toDateString();
  const part2 = now.toTimeString();
  response.send(`
  <h4>Phonebook has info for ${info} people</h4>
  <h4>${part1} ${part2}</h4>
`);
});
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});
const generateid = () => {
  const id = Math.floor(Math.random() * 100000000);
  return String(id);
};
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing number or name",
    });
  } /*else if (
    persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())
  ) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */ else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person.save().then((p) => response.json(p));
  }
});
//listener

const PORT = process.env.PORT;
app.listen(3001, () => {
  console.log(`Server running on port ${PORT}`);
});
