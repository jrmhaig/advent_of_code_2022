import { useState } from 'react';
import WorkingNull from './working/Null';

const PuzzlePage = (props) => {
  const [inputData, setInputData] = useState('');
  const [partOneSolution, setPartOneSolution] = useState(null);
  const [partOneWorking, setPartOneWorking] = useState(<WorkingNull />);
  const [seePartOneWorking, setSeePartOneWorking] = useState(false);
  const [partTwoSolution, setPartTwoSolution] = useState(null);
  const [partTwoWorking, setPartTwoWorking] = useState(<WorkingNull />);
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
            <textarea className="textarea" placeholder="Input data" onChange={event => setInputData(event.target.value)} value={inputData} />
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-small is-danger" onClick={() => setInputData('')}>Clear</button>
          </p>
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
        {partOneWorking && seePartOneWorking && partOneWorking}
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
        {partTwoWorking && seePartTwoWorking && partTwoWorking}
      </div>
    </>
  );
}

export default PuzzlePage;