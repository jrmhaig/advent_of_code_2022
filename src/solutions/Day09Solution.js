import BaseSolution from './BaseSolution';
import WorkingStepped from '../components/working/Stepped';

class Day09Solution extends BaseSolution {
  constructor() {
    super(9);
    this.solved = true;
    this.subtitle = 'Rope Bridge';
  }

  solve(data, n) {
    const rules = data.inputData.split(/\r?\n/).map(rule => new Day09Rule(rule));
    const state = new Day09StateTwo(n);
    const steps = [];

    rules.forEach(rule => {
      const data = ['Before'];
      data.push(...state.display(rule));
      state.apply(rule);
      data.push('After');
      data.push(...state.display(rule));
      steps.push({ command: rule.display(), data: data })
    });

    data.setSolution(state.head.countCovered());
    data.setWorking(<WorkingStepped steps={steps} />);
  }

  partOne(data) {
    this.solve(data, 1);
  }

  partTwo(data) {
    this.solve(data, 9);
  }
}

class Day09StateTwo {
  constructor(n) {
    this.head = new Day09Link();
    for (let i = 0; i < n; i++) {
      this.head.grow();
    }
  }

  apply(rule) {
    for (let i = 0; i < rule.count; i++) {
      this.head.move(rule.direction);
    }
  }

  display() {
    let map = [];
    const min_x = this.head.min_x();
    const min_y = this.head.min_y();
    const max_x = this.head.max_x();
    const max_y = this.head.max_y();

    map.push(`X range: ${min_x} - ${max_x}`);
    map.push(`Y range: ${min_y} - ${max_y}`);

    for (let y = max_y; y >= min_y; y--) {
      let row = '';
      for (let x = min_x; x <= max_x; x++) {
        row += this.head.marker(x, y);
      }
      map.push(row);
    }
    return map;
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

class Day09Link {
  DIRECTIONS = {
    L: [-1, 0],
    R: [1, 0],
    U: [0, 1],
    D: [0, -1]
  }

  constructor(previous) {
    this.previous = previous;
    this.covered = {};
    if (previous) {
      previous.next = this;
      this.mark = this.previous.mark + 1;
      this.x = this.previous.x;
      this.y = this.previous.y;
    } else {
      this.next = null;
      this.mark = 0;
      this.x = 0;
      this.y = 0;
    }
  }

  grow() {
    if (this.next) {
      this.next.grow();
    } else {
      this.next = new Day09Link(this);
    }
  }

  move(direction) {
    const [x, y] = this.DIRECTIONS[direction];
    this.x += x;
    this.y += y;
    if (this.next) { this.next.drag(direction); }
    this.markCovered();
  }

  drag(direction) {
    if (Math.abs(this.y - this.previous.y) <= 1 && Math.abs(this.x - this.previous.x) <= 1) { return; }

    if (this.x === this.previous.x) {
      if (this.y > this.previous.y) {
        this.y -= 1;
      } else if (this.y < this.previous.y) {
        this.y += 1;
      }
    } else if (this.y === this.previous.y) {
      if (this.x > this.previous.x) {
        this.x -= 1;
      } else if (this.x < this.previous.x) {
        this.x += 1;
      }
    } else {
      this.x += (this.x < this.previous.x) ? 1 : -1;
      this.y += (this.y < this.previous.y) ? 1 : -1;
    }

    if (this.next) {
      this.next.drag();
    }
  }

  min_x() {
    if (this.next) { return Math.min(this.x, this.next.min_x()); }

    return this.x;
  }

  min_y() {
    if (this.next) { return Math.min(this.y, this.next.min_y()); }

    return this.y;
  }

  max_x() {
    if (this.next) { return Math.max(this.x, this.next.max_x()); }

    return this.x;
  }

  max_y() {
    if (this.next) { return Math.max(this.y, this.next.max_y()); }

    return this.y;
  }

  marker(x, y) {
    if (this.x === x && this.y === y) { return this.mark; }
    if (this.next) { return this.next.marker(x, y); }
    return '.';
  }

  markCovered() {
    const [x, y] = this.tail();
    if (!this.covered[x]) { this.covered[x] = {} };
    this.covered[x][y] = true;
  }

  countCovered() {
    return Object.keys(this.covered).reduce((total, x) => total + Object.keys(this.covered[x]).length, 0);
  }

  tail() {
    if (this.next) {
      return this.next.tail();
    } else {
      return [this.x, this.y];
    }
  }
}

export default Day09Solution;
