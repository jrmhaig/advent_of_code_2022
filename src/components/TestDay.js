import { useState } from 'react';

const TestDay = () => {
  const [inputData, setInputData] = useState('');
  const [partOneSolution, setPartOneSolution] = useState(null);
  const [partOneWorking, setPartOneWorking] = useState(null);
  const [partTwoSolution, setPartTwoSolution] = useState(null);
  const [partTwoWorking, setPartTwoWorking] = useState(null);

  const partOne = () => {
    const depths = inputData.split(/\r?\n/).map(n => +n);
    const length = depths.length;
    let newSolution = [`${depths[0]} (N/A - no previous measurement)`];
    let tally = 0;
    for (let i = 1; i < length; i++) {
      if (depths[i] > depths[i - 1]) {
        tally += 1;
        newSolution.push(`${depths[i]} (increased) - ${tally}`);
      } else if (depths[i] < depths[i - 1]) {
        newSolution.push(`${depths[i]} (decreased)`);
      } else {
        newSolution.push(`${depths[i]} (no change)`);
      }
    }
    setPartOneSolution(tally);
    setPartOneWorking(newSolution);
  }

  const partTwo = () => {
    const depths = inputData.split(/\r?\n/).map(n => +n);
    const length = depths.length;
    let newSolution = [`${depths[2] + depths[1] + depths[0]} (N/A - no previous measurement)`];
    let tally = 0;
    for (let i = 3; i < length; i++) {
      const a = depths[i] + depths[i - 1] + depths[i - 2];
      const b = depths[i - 1] + depths[i - 2] + depths[i - 3];
      if (a > b) {
        tally += 1;
        newSolution.push(`${a} (increased) - ${tally}`);
      } else if (a < b) {
        newSolution.push(`${a} (decreased)`);
      } else {
        newSolution.push(`${a} (no change)`);
      }
    }
    setPartTwoSolution(tally);
    setPartTwoWorking(newSolution);
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
          <button className="button" onClick={partTwo}>Solve part 2</button>
        </div>
      </div>

      {partTwoSolution && <p>Solution: {partTwoSolution}</p>}
      {partTwoWorking && <div className="box">{partTwoWorking.map(row => <p>{row}</p>)}</div>}
    </div >
  );
}

export default TestDay;