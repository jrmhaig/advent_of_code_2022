import BaseSolution from './BaseSolution'
import WorkingSimple from '../components/working/Simple';

class Day04Solution extends BaseSolution {
  constructor() {
    super(4);
    this.solved = true;
    this.subtitle = 'Camp Cleanup';
  }

  solve(data, check, checkMessage) {
    const working = [];
    const cleaningRota = data.inputData.split(/\r?\n/)
      .map(cleaning => cleaning.split(/,/).map(assignment => assignment.split(/-/).map(n => +n)))
      .map(cleaning => { return { assignmentOne: cleaning[0], assignmentTwo: cleaning[1] } });
    working.push('Rota:')

    cleaningRota.forEach(cleaning => cleaning["bad"] = check(cleaning))
    cleaningRota.forEach((cleaning, i) => {
      working.push(`${i}: [${cleaning.assignmentOne}] and [${cleaning.assignmentTwo}]`);
      working.push(this.drawAssignment(...cleaning.assignmentOne));
      working.push(this.drawAssignment(...cleaning.assignmentTwo));
      if (cleaning.bad) { working.push(checkMessage); }
      working.push('--------------');
    });

    data.setSolution(cleaningRota.filter(r => r.bad).length);
    data.setWorking(<WorkingSimple data={working} />);
  }

  partOne(data) {
    this.solve(data, this.checkContaining, "One assignment covers the other");
  }

  partTwo(data) {
    this.solve(data, this.checkOverlapping, "Assignments overlap");
  }

  checkContaining({ assignmentOne, assignmentTwo }) {
    return (assignmentOne[0] <= assignmentTwo[0] && assignmentOne[1] >= assignmentTwo[1]) || (assignmentTwo[0] <= assignmentOne[0] && assignmentTwo[1] >= assignmentOne[1]);
  }

  checkOverlapping({ assignmentOne, assignmentTwo }) {
    return (assignmentOne[0] <= assignmentTwo[1] && assignmentOne[1] >= assignmentTwo[0]) || (assignmentTwo[0] <= assignmentOne[1] && assignmentTwo[1] >= assignmentOne[0]);
  }

  drawAssignment(start, finish) {
    return '.'.repeat(start) + '#'.repeat(finish - start + 1) + '.'.repeat(99 - finish);
  }
}

export default Day04Solution;
