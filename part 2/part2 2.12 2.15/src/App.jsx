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
const Persons = ({ found, persons, deleter }) => {
  return (
    <ul>
      {!found
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
              <button
                key={person.id}
                type="button"
                onClick={() => deleter(person.id)}
              >
                delete
              </button>
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
import { useState, useEffect } from "react";
import personService from "./services/persons";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [found, setFound] = useState("");
  useEffect(() => {
    personService.getall().then((persons) => {
      setPersons(persons);
    });
  }, []);
  const addperson = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      number: newNumber,
    };
    const search = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (search) {
      const text = `${search.name} is already added to phonebook,replace the old number with a new one?`;
      if (confirm(text)) {
        const updatedPerson = { ...search, number: newNumber };
        personService
          .update(search.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) => {
                return person.id === search.id ? response : person;
              })
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => console.log(search.id));
      }
    } else {
      personService
        .create(person)
        .then((returnedperson) => {
          setPersons(persons.concat(returnedperson));
          setNewName("");
          setNewNumber("");
        })
        .catch((e) => {
          console.log("dazd");
          console.log(e);
        });
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
  const deleteperson = (id) => {
    const wantedperson = persons.find((person) => person.id === id);
    const text = `Delete ${wantedperson.name}?`;
    if (confirm(text)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((e) => {
          console.error(error);
        });
    } else {
      console.log("cancelled");
    }
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
      <Persons found={found} persons={persons} deleter={deleteperson} />
    </div>
  );
};

export default App;
