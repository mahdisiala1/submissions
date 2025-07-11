const Persons = ({ found, persons, deleter }) => {
  console.log(persons);
  return (
    <ul>
      {!found
        ? persons.map((person) => (
            <li key={person.id}>
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
              <li key={person.id}>
                {person.name} {person.number}
                <button
                  key={person.id}
                  type="button"
                  onClick={() => deleter(person.id)}
                >
                  delete
                </button>
              </li>
            ))}
    </ul>
  );
};
export default Persons;
