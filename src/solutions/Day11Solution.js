import BaseSolution from './BaseSolution';
import WorkingStepped from '../components/working/Stepped';

class Day11Solution extends BaseSolution {
  constructor() {
    super(11);
    this.solved = true;
    this.subheading = 'Monkey in the Middle';
  }

  solve(data, rounds, sedative) {
    const steps = [];
    const monkeys = this.fetchMonkeys(data.inputData, sedative);
    this.linkMonkeys(monkeys);

    for (let i = 0; i < rounds; i++) {
      const rows = monkeys.map(monkey => [
        `Monkey ${monkey.id} has items: ${monkey.worries.join(', ')}`,
        `Operation: ${monkey.operation.description}`,
        `Test: divide by ${monkey.test}`,
        `Successful test throw to: ${monkey.trueThrow.id}`,
        `Failed test throw to: ${monkey.falseThrow.id}`,
        '======================='
      ]).flat();
      monkeys.forEach(monkey => {
        monkey.throw()
      });
      rows.push(...monkeys.map(monkey => { return `Monkey ${monkey.id} has inspected ${monkey.inspections} items and currently has items with worry level; ${monkey.worries.join(', ')}`; }));
      steps.push({ command: `Round ${i + 1}`, data: rows });
    }

    data.setSolution(monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a).slice(0, 2).reduce((total, i) => total * i, 1));
    data.setWorking(<WorkingStepped steps={steps} />);
  }


  partOne(data) {
    this.solve(data, 20, new Day11LightSedative());
  }

  partTwo(data) {
    this.solve(data, 10000, new Day11StrongSedative());
  }

  fetchMonkeys(data, sedative) {
    return data.split(/\r?\n\r?\n/).map(monkey => new Day11Monkey(monkey, sedative));
  }

  linkMonkeys(monkeys) {
    monkeys.forEach(monkey => {
      monkey.trueThrow = monkeys.find(other => other.id === monkey.trueThrow);
      monkey.falseThrow = monkeys.find(other => other.id === monkey.falseThrow);
    })
  }
}

class Day11Monkey {
  constructor(raw, sedative) {
    const [identifier, starting, operation, test, trueThrow, falseThrow] = raw.split(/\r?\n/);

    this.id = +identifier.match(/Monkey (\d+):/)[1];
    this.worries = starting.match(/Starting items: ([\d,\s]+)/)[1].split(/,/).map(n => BigInt(n));
    this.operation = this.findOperation(operation.match(/Operation: (.+)/)[1]);
    this.test = BigInt(test.match(/Test: divisible by (\d+)/)[1]);
    this.trueThrow = +trueThrow.match(/If true: throw to monkey (\d+)/)[1];
    this.falseThrow = +falseThrow.match(/If false: throw to monkey (\d+)/)[1];
    this.sedative = sedative;
    this.sedative.mix(this.test);
    this.inspections = 0;
  }

  findOperation(data) {
    const parsed = data.match(/new = old ([*+]) (.+)/);
    const op = parsed[1];
    const n = parsed[2];

    if (op === '*') {
      if (n === 'old') {
        return new Day11Square();
      } else {
        return new Day11Multiply(BigInt(n));
      }
    } else {
      return new Day11Add(BigInt(n));
    }
  }

  throw() {
    this.worries.forEach(worry => {
      worry = this.operation.call(worry);
      worry = this.sedative.call(worry);
      if (worry % this.test === 0n) {
        this.trueThrow.worries.push(worry);
      } else {
        this.falseThrow.worries.push(worry);
      }
      // (worry % this.test === 0n ? this.trueThrow : this.falseThrow).worries.push(worry)
    });
    this.inspections += this.worries.length;
    this.worries = [];
  }
}

class Day11Multiply {
  constructor(multiplier) {
    this.multiplier = multiplier;
    this.description = `Multiply by ${multiplier}`;
  }

  call(n) {
    return n * this.multiplier;
  }
}

class Day11Add {
  constructor(adder) {
    this.adder = adder;
    this.description = `Add ${adder}`;
  }

  call(n) { return n + this.adder; }
}

class Day11Square {
  constructor() {
    this.description = `Square`;
  }

  call(n) { return n * n; }
}

class Day11LightSedative {
  mix(n) { }

  call(n) { return n / 3n; }
}

class Day11StrongSedative {
  constructor() {
    this.factor = 1n;
  }

  mix(n) { this.factor *= n }

  call(n) { return n % this.factor; }
}

export default Day11Solution;
