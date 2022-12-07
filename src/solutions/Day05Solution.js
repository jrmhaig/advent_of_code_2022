import BaseSolution from './BaseSolution'
import WorkingStepped from '../components/working/Stepped';

class Day05Solution extends BaseSolution {
  constructor() {
    super(5);
    this.solved = true;
    this.subtitle = 'Supply Stacks';
  }

  solve(data, mover) {
    const [stacksData, commands] = data.inputData.split(/\r?\n\r?\n/);
    const stacks = this.generateStacks(stacksData);
    const steps = [];

    commands.split(/\r?\n/).forEach(rawCommand => {
      const step = { command: rawCommand, data: [] };
      const command = this.processCommand(rawCommand);
      step.data.push('Before:');
      step.data.push(...this.displayStacks(stacks));

      mover({ ...command, stacks: stacks });

      step.data.push('=================================')
      step.data.push('After:');
      step.data.push(...this.displayStacks(stacks));

      steps.push(step);
    });

    data.setSolution(stacks.map(stack => stack[stack.length - 1]).join(''));
    data.setWorking(<WorkingStepped steps={steps} />);
  }

  partOne(data) {
    this.solve(data, this.cratemover9000);
  }

  partTwo(data) {
    this.solve(data, this.cratemover9001);
  }

  generateStacks(data) {
    const rows = data.split(/\r?\n/);
    const nStacks = rows.pop().split(/\s+/).filter(n => n.match(/[0-9]/)).length;
    const stacks = Array.from(Array(nStacks), () => new Array(0));

    rows.forEach(row => {
      for (let i = 0; i < nStacks; i += 1) {
        if (row[i * 4 + 1]?.match(/[A-Z]/)) { stacks[i].unshift(row[i * 4 + 1]); }
      }
    });

    return stacks;
  }

  processCommand(command) {
    return command.match(/move (?<move>\d*) from (?<from>\d*) to (?<to>\d*)/).groups;
  }

  displayStacks(stacks) {
    const nRows = Math.max(...stacks.map(stack => stack.length));
    const display = [];
    for (let i = nRows - 1; i >= 0; i--) { display.push(stacks.map(stack => `[${stack[i] || ' '}]`).join(' ')); }
    return display;
  }

  cratemover9000({ stacks, move, from, to }) {
    const stackTo = stacks[+to - 1];
    const stackFrom = stacks[+from - 1];

    stackTo.push(...stackFrom.slice(stackFrom.length - move).reverse());
    stacks[+from - 1] = stackFrom.slice(0, stackFrom.length - move);
  }

  cratemover9001({ stacks, move, from, to }) {
    const stackTo = stacks[+to - 1];
    const stackFrom = stacks[+from - 1];

    stackTo.push(...stackFrom.slice(stackFrom.length - move));
    stacks[+from - 1] = stackFrom.slice(0, stackFrom.length - move);
  }
}

export default Day05Solution;
