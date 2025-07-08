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
export default Filter;
