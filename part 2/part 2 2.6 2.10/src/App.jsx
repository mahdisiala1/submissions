const Filter = ({ value, handler }) => {
  return (
    <div>
      filter shown with :
      <form>
        <input value={value} onChange={handler} />
      </form>
    </div>
  );
};
const PersonForm = ({
  addperson,
  name,
  number,
  handlername,
  handlernumber,
}) => {
  return (
    <div>
      <form onSubmit={addperson}>
        <div>
          name: <input value={name} onChange={handlername} />
        </div>
        <div>
          number: <input value={number} onChange={handlernumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
const Persons = ({ found, persons }) => {
  return (
    <ul>
      {!found
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))
        : persons
            .filter((person) =>
              person.name.toLowerCase().includes(found.toLowerCase())
            )
            .map((person) => (
              <li key={person.name}>
                {person.name} {person.number}
              </li>
            ))}
    </ul>
  );
};
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [found, setFound] = useState("");
  const addperson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };
    const search = persons.find((person) => person.name === newName);
    console.log(search);
    if (search) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
    } else {
      setPersons(persons.concat(person));
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handlefoundChange = (event) => {
    setFound(event.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={found} handler={handlefoundChange} />
      <h2>add a new</h2>
      <PersonForm
        addperson={addperson}
        name={newName}
        number={newNumber}
        handlername={handleNameChange}
        handlernumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons found={found} persons={persons} />
    </div>
  );
};

export default App;
