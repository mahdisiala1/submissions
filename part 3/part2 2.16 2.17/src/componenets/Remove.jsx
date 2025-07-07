const Remove = ({ message }) => {
  const footerStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === "") return null;
  return <div style={footerStyle}>{message}</div>;
};

export default Remove;
