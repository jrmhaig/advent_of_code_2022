import { useState } from 'react';

const PuzzlePage = (props) => {
  const [inputData, setInputData] = useState('');
  const [partOneSolution, setPartOneSolution] = useState(null);
  const [partOneWorking, setPartOneWorking] = useState(null);
  const [seePartOneWorking, setSeePartOneWorking] = useState(false);
  const [partTwoSolution, setPartTwoSolution] = useState(null);
  const [partTwoWorking, setPartTwoWorking] = useState(null);
  const [seePartTwoWorking, setSeePartTwoWorking] = useState(false);

  const partOne = () => {
    props.solution.partOne({ inputData, setSolution: setPartOneSolution, setWorking: setPartOneWorking });
  }

  const partTwo = () => {
    props.solution.partTwo({ inputData, setSolution: setPartTwoSolution, setWorking: setPartTwoWorking });
  }

  return (
    <>
      <p className="block">
        <a className="tag is-small" href={props.solution.githubLink}>View the source of this solution on Github</a>
      </p>

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
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-small" onClick={partOne}>Solve part 1</button>
              </p>
              {partOneWorking &&
                <p className="control">
                  <button className="button is-small" onClick={() => setSeePartOneWorking(!seePartOneWorking)}>{seePartOneWorking ? 'Hide' : 'See'} working</button>
                </p>
              }
            </div>
          </div>
        </div>

        {partOneSolution && <p>Solution: {partOneSolution}</p>}
        {
          Array.isArray(partOneWorking) && seePartOneWorking &&
          <div className="box is-family-monospace">{partOneWorking.map((row, i) => <p key={i}>{row}</p>)}</div>
        }
      </div>

      <div className="block">
        <div className="field">
          <div className="control">
            <div className="field is-grouped">
              <p className="control">
                <button className="button is-small" onClick={partTwo}>Solve part 2</button>
              </p>
              {partTwoWorking &&
                <p className="control">
                  <button className="button is-small" onClick={() => setSeePartTwoWorking(!seePartTwoWorking)}>{seePartTwoWorking ? 'Hide' : 'See'} working</button>
                </p>
              }
            </div>
          </div>
        </div>

        {partTwoSolution && <p>Solution: {partTwoSolution}</p>}
        {
          Array.isArray(partTwoWorking) && seePartTwoWorking &&
          <div className="box is-family-monospace">{partTwoWorking.map((row, i) => <p key={i}>{row}</p>)}</div>
        }
      </div>
    </>
  );
}

export default PuzzlePage;