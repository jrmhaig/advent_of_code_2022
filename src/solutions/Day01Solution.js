import BaseSolution from './BaseSolution'
import WorkingSimple from '../components/working/Simple';

class DayOneSolution extends BaseSolution {
  constructor() {
    super(1);
    this.solved = true;
  }

  partOne(data) {
    const groups = data.inputData.split(/\r?\n\r?\n/).map(row => row.split(/\r?\n/));
    const calories = this.sortedCalories(groups);

    data.setSolution(calories[0]);
    data.setWorking(<WorkingSimple data={[
      'Sorted calories counts:',
      '',
      ...calories.map((n, i) => `Group ${i} total: ${n}`)
    ]} />);
  }

  partTwo(data) {
    const groups = data.inputData.split(/\r?\n\r?\n/).map(row => row.split(/\r?\n/));
    const calories = this.sortedCalories(groups);

    data.setSolution(calories[0] + calories[1] + calories[2]);
    data.setWorking(<WorkingSimple data={[
      'Sorted calories counts:',
      '',
      ...calories.map((n, i) => `Group ${i} total: ${n}`)
    ]} />);
  }

  sortedCalories(groups) {
    return groups.map(
      group => group.map(n => +n).reduce((total, n) => total + n, 0)
    ).sort((a, b) => b - a);
  }
}

export default DayOneSolution;