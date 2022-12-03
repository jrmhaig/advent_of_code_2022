import BaseSolution from './BaseSolution'

class Day03Solution extends BaseSolution {
  constructor() {
    super(3);
    this.solved = true;
  }

  partOne(data) {
    const working = [];
    const rucksacks = data.inputData.split(/\r?\n/)
      .map(rucksack =>
        [
          this.explode(rucksack.substr(0, rucksack.length / 2)),
          this.explode(rucksack.substr(rucksack.length / 2))
        ]);
    working.push('Rucksacks:')
    rucksacks.forEach((rucksack, i) => working.push(`[${i}] 1) ${rucksack[0]}; 2) ${rucksack[1]}`));

    const intersections = rucksacks
      .map(rucksack => rucksack[0].filter(x => rucksack[1].includes(x)))
      .map(elements => [...new Set(elements)]);
    working.push('=====================')
    working.push('Common elements:')
    intersections.forEach((intersection, i) => working.push(`[${i}]  ${intersection}`));

    const intersectionPriority = intersections
      .map(intersection => intersection.map(c => this.charValue(c)));
    working.push('=====================')
    working.push('Common element priority:')
    intersectionPriority.forEach((value, i) => working.push(`[${i}]  ${value}`));

    const intersectionSums = intersectionPriority
      .map(priority => priority.reduce((total, n) => total + n, 0));
    working.push('=====================')
    working.push('Common element sums:')
    intersectionSums.forEach((sum, i) => working.push(`[${i}]  ${sum}`));

    data.setSolution(intersectionSums.reduce((total, i) => total + i, 0));
    data.setWorking(working);
  }

  partTwo(data) {
    const working = [];
    const rucksacks = data.inputData.split(/\r?\n/)
      .map(rucksack => this.explode(rucksack))
      .map(elements => [...new Set(elements)]);
    working.push('Rucksacks:')
    rucksacks.forEach((rucksack, i) => working.push(`[${i}] ${rucksack}`));

    let badges = [];
    for (let i = 0; i < rucksacks.length / 3; i++) {
      badges.push(this.findBadge(rucksacks.slice(3 * i, 3 * (i + 1))));
    }
    working.push('=====================')
    working.push('Badges:')
    badges.forEach((badge, i) => working.push(`[${i}] ${badge}, ${this.charValue(badge)}`))

    data.setSolution(badges.reduce((total, badge) => total + this.charValue(badge), 0));
    data.setWorking(working);
  }

  explode(str) {
    return str.split('');
  }

  charValue(c) {
    if (c >= 'a') {
      return c.charCodeAt() - 96;
    } else {
      return c.charCodeAt() - 38;
    }
  }

  findBadge(rucksacks) {
    let tally = {};
    (rucksacks.reduce((all, rucksacks) => all.concat(rucksacks), [])).forEach(n => {
      tally[n] = (tally[n] ? tally[n] + 1 : 1);
    })
    return Object.keys(tally).find(key => tally[key] === 3);
  }
}

export default Day03Solution;
