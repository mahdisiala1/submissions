import { useState } from "react";
const Display = (props) => (
  <div>
    {props.text}
    {props.value}
  </div>
);
const StatistiLine = (props) => (
  <>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </>
);
const Statistics = (props) => {
  if (props.all == 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <tr>
              <StatistiLine text="good " value={props.good} />
            </tr>
            <tr>
              <StatistiLine text="neutral " value={props.neutral} />
            </tr>
            <tr>
              <StatistiLine text="bad " value={props.bad} />
            </tr>
            <tr>
              <StatistiLine text="all " value={props.all} />
            </tr>
            <tr>
              <StatistiLine
                text="average "
                value={(props.good - props.bad) / props.all}
              />
            </tr>
            <tr>
              <StatistiLine
                text="positive "
                value={(props.good / props.all) * 100 + "%"}
              />
            </tr>
          </tbody>
        </table>
      </>
    );
  }
};
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const IncrimentGood = (newgood) => {
    const updateAll = all + 1;
    setAll(updateAll);
    const updateGood = good + 1;
    setGood(updateGood);
  };
  const IncrimentNeutral = () => {
    const updateAll = all + 1;
    setAll(updateAll);
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral);
  };
  const IncrimentBad = () => {
    const updateAll = all + 1;
    setAll(updateAll);
    const updateBad = bad + 1;
    setBad(updateBad);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => IncrimentGood(good + 1)} text="good" />
      <Button onClick={() => IncrimentNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => IncrimentBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
