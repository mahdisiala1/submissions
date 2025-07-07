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
export default PersonForm;
