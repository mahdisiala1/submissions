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
export default Persons;
