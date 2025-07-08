import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./componenets/Filter";
import PersonForm from "./componenets/Personform";
import Persons from "./componenets/persons";
import Footer from "./componenets/Altering";
import Remove from "./componenets/Remove";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [found, setFound] = useState("");
  const [message, setMessage] = useState("");
  const [warning, setWarning] = useState("");
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
            setMessage(`changed number of ${newName} `);
            setTimeout(() => setMessage(""), 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => console.log(search.id));
      }
    } else {
      personService
        .create(person)
        .then((returnedpersons) => {
          console.log(returnedpersons);
          setPersons(returnedpersons);
          setMessage(`created ${newName}`);
          setTimeout(() => setMessage(""), 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((e) => {
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
          console.log("success");
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((e) => {
          console.log("fail");
          setWarning(
            `Information of ${wantedperson.name} has already been removed from server`
          );
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => setWarning(""), 5000);
        });
    } else {
      console.log("cancelled");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Footer message={message} />
      <Remove message={warning} />
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
