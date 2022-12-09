import BaseSolution from './BaseSolution';
import WorkingStepped from '../components/working/Stepped';

class Day09Solution extends BaseSolution {
  constructor() {
    super(9);
    this.solved = false;
  }

  partOne(data) {
    const rules = data.inputData.split(/\r?\n/).map(rule => new Day09Rule(rule));
    const state = new Day09State();
    const steps = [];

    rules.forEach(rule => {
      const data = ['Before'];
      data.push(...state.display(rule));
      state.apply(rule);
      data.push('After');
      data.push(...state.display(rule));
      steps.push({ command: rule.display(), data: data })
    });

    data.setSolution(state.countCovered());
    data.setWorking(<WorkingStepped steps={steps} />);
  }

  partTwo(data) {
    super.partTwo(data);
  }
}

class Day09State {
  DIRECTIONS = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1]
  }

  constructor() {
    this.head_x = 0;
    this.head_y = 0;
    this.tail_x = 0;
    this.tail_y = 0;
    this.max_x = 0;
    this.max_y = 0;
    this.min_x = 0;
    this.min_y = 0;
    this.covered = {};
  }

  apply(rule) {
    const direction = this.DIRECTIONS[rule.direction];
    for (let i = 0; i < rule.count; i++) {
      this.head_x += direction[0];
      this.head_y += direction[1];

      // Drag tail
      if (Math.abs(this.head_x - this.tail_x) > 1) {
        this.tail_y = this.head_y;
        this.tail_x = (this.head_x > this.tail_x) ? this.head_x - 1 : this.head_x + 1;
      } else if (Math.abs(this.head_y - this.tail_y) > 1) {
        this.tail_x = this.head_x;
        this.tail_y = (this.head_y > this.tail_y) ? this.head_y - 1 : this.head_y + 1;
      }
      this.markCovered();
    }
  }

  display() {
    let map = [];
    for (let y = this.max_y; y >= this.min_y; y--) {
      let row = '';
      for (let x = this.min_x; x <= this.max_x; x++) {
        row += (x === this.head_x && y === this.head_y)
          ? 'H'
          : (x === this.tail_x && y === this.tail_y)
            ? 'T'
            : (this.covered[x] && this.covered[x][y]) ? '#' : '.';
      }
      map.push(row);
    }
    return map;
  }

  markCovered() {
    if (!this.covered[this.tail_x]) { this.covered[this.tail_x] = {} };
    this.covered[this.tail_x][this.tail_y] = true;
    this.min_x = Math.min(this.min_x, this.tail_x, this.head_x);
    this.min_y = Math.min(this.min_y, this.tail_y, this.head_y);
    this.max_x = Math.max(this.max_x, this.tail_x, this.head_x);
    this.max_y = Math.max(this.max_y, this.tail_y, this.head_y);
  }

  countCovered() {
    return Object.keys(this.covered).reduce((total, x) => total + Object.keys(this.covered[x]).length, 0);
  }
}

class Day09Rule {
  constructor(raw) {
    [this.direction, this.count] = raw.split(' ');
    this.count = +this.count;
  }

  display() {
    return `Move ${this.count} steps in direction ${this.direction}`;
  }
}

export default Day09Solution;
