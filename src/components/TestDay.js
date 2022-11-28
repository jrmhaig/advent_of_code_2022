import { useState } from 'react';

const TestDay = () => {
  const [inputData, setInputData] = useState('');
  const [partOneSolution, setPartOneSolution] = useState(null);
  const [partOneWorking, setPartOneWorking] = useState(null);

  const partOne = () => {
    const depths = inputData.split(/\r?\n/);
    const length = depths.length;
    let newSolution = [`${depths[0]} (N/A - no previous measurement)`];
    let tally = 0;
    for (let i = 1; i < length; i++) {
      if (+depths[i] > +depths[i - 1]) {
        tally += 1;
        newSolution.push(`${depths[i]} (increased) - ${tally}`);
      } else if (+depths[i] < +depths[i - 1]) {
        newSolution.push(`${depths[i]} (decreased)`);
      } else {
        newSolution.push(`${depths[i]} (no change)`);
      }
    }
    setPartOneSolution(tally);
    setPartOneWorking(newSolution);
  }

  return (
    <div className="container">
      <h1 className="title is-3">Test (Day One from 2021)</h1>

      <div className="field">
        <label className="label">Input data</label>
        <div className="control">
          <textarea className="textarea" placeholder="Input data" onChange={event => setInputData(event.target.value)}></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <button className="button" onClick={partOne}>Solve part 1</button>
        </div>
      </div>

      {partOneSolution && <p>Solution: {partOneSolution}</p>}
      {partOneWorking && <div className="box">{partOneWorking.map(row => <p>{row}</p>)}</div>}

      <div className="field">
        <div className="control">
          <button className="button">Solve part 2</button>
        </div>
      </div>
    </div >
  );
}

export default TestDay;