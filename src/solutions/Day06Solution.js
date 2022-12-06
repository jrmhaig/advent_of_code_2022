import BaseSolution from './BaseSolution';
import WorkingSimple from '../components/working/Simple';

class Day06Solution extends BaseSolution {
  constructor() {
    super(6);
    this.solved = true;
  }

  solve(data, n) {
    const working = [];
    const nChars = data.inputData.length;
    for (let i = 0; i < nChars - n; i++) {
      working.push(data.inputData.substr(i, n));
      if ((new Set(data.inputData.substr(i, n).split(''))).size === n) {
        data.setSolution(i + n);
        break;
      }
    }

    data.setWorking(<WorkingSimple data={working} />);
  }

  partOne(data) {
    this.solve(data, 4);
  }

  partTwo(data) {
    this.solve(data, 14);
  }
}

export default Day06Solution;
