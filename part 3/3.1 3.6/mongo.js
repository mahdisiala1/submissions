const mongoose = require("mongoose");

if (process.argv.length >= 3) {
  const password = process.argv[2];

  const url = `mongodb+srv://mahdisiala:${password}@cluster0.gbqus1e.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.set("strictQuery", false);

  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  const Person = mongoose.model("Person", personSchema);
  if (process.argv.length == 5) {
    const person = new Person({
      name: process.argv[3],
      number: process.argv[4],
    });

    person.save().then((result) => {
      console.log(result);
      console.log(`added ${person.name} ${person.number} to phonebook`);
      mongoose.connection.close();
    });
  } else if (process.argv.length == 3) {
    Person.find({}).then((result) => {
      result.forEach((p) => {
        console.log(p.name, p.number);
      });
      mongoose.connection.close();
    });
  } else {
    console.log("provide a number as an argument");
  }
} else {
  console.log("give password as argument or add a new person");
}
