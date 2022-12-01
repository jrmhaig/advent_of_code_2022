import BaseSolution from './BaseSolution'

class DayOneSolution extends BaseSolution {
  constructor() {
    super(Date.parse('1 December 2022'));
    this.path = 'day_1';
    this.title = 'Day one';
    this.solved = false;
  }

  partOne(data) {
    const groups = data.inputData.split(/\r?\n\r?\n/).map(row => row.split(/\r?\n/));
    const calories = this.sortedCalories(groups);

    data.setSolution(calories[0]);
    data.setWorking([
      'Sorted calories counts:',
      '',
      ...calories.map((n, i) => `Group ${i} total: ${n}`)
    ]);
  }

  partTwo(data) {
    const groups = data.inputData.split(/\r?\n\r?\n/).map(row => row.split(/\r?\n/));
    const calories = this.sortedCalories(groups);

    data.setSolution(calories[0] + calories[1] + calories[2]);
    data.setWorking([
      'Sorted calories counts:',
      '',
      ...calories.map((n, i) => `Group ${i} total: ${n}`)
    ]);
  }

  sortedCalories(groups) {
    return groups.map(
      group => group.map(n => +n).reduce((total, n) => total + n, 0)
    ).sort((a, b) => b - a);
  }
}

export default DayOneSolution;