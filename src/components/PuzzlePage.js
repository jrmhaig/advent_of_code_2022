import { useState } from 'react';

const PuzzlePage = (props) => {
  const [inputData, setInputData] = useState('');
  const [partOneSolution, setPartOneSolution] = useState(null);
  const [partOneWorking, setPartOneWorking] = useState(null);
  const [partTwoSolution, setPartTwoSolution] = useState(null);
  const [partTwoWorking, setPartTwoWorking] = useState(null);

  const partOne = () => {
    props.solution.partOne({ inputData, setSolution: setPartOneSolution, setWorking: setPartOneWorking });
  }

  const partTwo = () => {
    props.solution.partTwo({ inputData, setSolution: setPartTwoSolution, setWorking: setPartTwoWorking });
  }

  return (
    <div className="container">
      <h1 className="title is-3">{props.title}</h1>

      {props.solution.solved ||
        <div class="notification is-danger">
          This day's puzzle has not been solved yet.
        </div>}

      <div class="field is-grouped">
        <p class="control">
          <a className="button is-info is-small" href={props.solution.aocLink}>Puzzle on Advent of Code</a>
        </p>
        <p class="control">
          <a className="button is-success is-small" href={props.solution.githubLink}>Source on Github</a>
        </p>
      </div>

      <div className="block">
        <div className="field">
          <label className="label">Input data</label>
          <div className="control">
            <textarea className="textarea" placeholder="Input data" onChange={event => setInputData(event.target.value)}></textarea>
          </div>
        </div>
      </div>

      <div className="block">
        <div className="field">
          <div className="control">
            <button className="button" onClick={partOne}>Solve part 1</button>
          </div>
        </div>

        {partOneSolution && <p>Solution: {partOneSolution}</p>}
        {Array.isArray(partOneWorking) && <div className="box">{partOneWorking.map((row, i) => <p key={i}>{row}</p>)}</div>}
      </div>

      <div className="block">
        <div className="field">
          <div className="control">
            <button className="button" onClick={partTwo}>Solve part 2</button>
          </div>
        </div>

        {partTwoSolution && <p>Solution: {partTwoSolution}</p>}
        {Array.isArray(partTwoWorking) && <div className="box">{partTwoWorking.map((row, i) => <p key={i}>{row}</p>)}</div>}
      </div>
    </div >
  );
}

export default PuzzlePage;