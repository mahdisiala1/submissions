const Header = ({ name }) => {
  return (
    <>
      <h3>{name}</h3>
    </>
  );
};
const Part = ({ part, exercise }) => {
  return (
    <>
      <p>
        {part} {exercise}
      </p>
    </>
  );
};
const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};
const Total = ({ parts }) => {
  return (
    <>
      <h4>
        total of {parts.reduce((s, part) => s + part.exercises, 0)} exercises
      </h4>
    </>
  );
};
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default Course;
