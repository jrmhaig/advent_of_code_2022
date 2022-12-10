import BaseSolution from './BaseSolution'
import WorkingStepped from '../components/working/Stepped';

class Day10Solution extends BaseSolution {
  constructor() {
    super(10);
    this.solved = true;
    this.subtitle = 'Cathode-Ray Tube';
  }

  solve(data, solutionOption, displayOption) {
    const program = data.inputData.split(/\r?\n/);
    const state = new Day10State();
    const commands = {
      noop: new Day10Noop(state),
      addx: new Day10Addx(state)
    }
    const steps = [];

    program.forEach(line => {
      const [command, n] = line.split(/\s+/);

      commands[command].call(n);
      steps.push({ command: command, data: state[displayOption]() });
    });

    data.setSolution(state[solutionOption]());
    data.setWorking(<WorkingStepped steps={steps} />);
  }

  partOne(data) {
    this.solve(data, 'signalStrength', 'registerList');
  }

  partTwo(data) {
    this.solve(data, 'message', 'display');
  }
}

class Day10State {
  constructor() {
    this.registerHistory = [1];
  }

  registerList() {
    const rows = [];
    for (let i = 0; i < this.registerHistory.length; i += 10) {
      rows.push(`[${i + 1}-${i + 10}]: ${this.registerHistory.slice(i, i + 10).join(', ')}`);
    }
    return rows;
  }

  signalStrength() {
    return [20, 60, 100, 140, 180, 220].reduce((total, i) => total + this.registerHistory[i - 1] * i, 0);
  }

  display() {
    const rows = [];
    for (let y = 0; y < 6; y++) {
      let line = '';
      for (let i = 0 * y; i < 40; i++) {
        line += (i + 1 >= this.registerHistory[i + y * 40] && i + 1 <= this.registerHistory[i + y * 40] + 2) ? '#' : '.';
      }
      rows.push(line);
    }
    return rows;
  }

  message() { return 'See final state, below'; }
}

class Day10Noop {
  constructor(state) {
    this.state = state;
  }

  call() {
    const current = this.state.registerHistory[this.state.registerHistory.length - 1];
    this.state.registerHistory.push(current);
  }
}

class Day10Addx {
  constructor(state) {
    this.state = state;
  }

  call(n) {
    const current = this.state.registerHistory[this.state.registerHistory.length - 1];
    this.state.registerHistory.push(current);
    this.state.registerHistory.push(current + (+n));
  }
}

export default Day10Solution;
