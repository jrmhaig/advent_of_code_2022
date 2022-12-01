class BaseSolution {
  constructor(id) {
    this.puzzleId = id;
    this.live = Date.now() >= Date.parse(`${id} December 2022`);
    this.path = `day_${id}`;
    this.title = `Day ${id}`;
    this.githubLink = `https://github.com/jrmhaig/advent_of_code_2022/blob/main/src/solutions/Day${String(id).padStart(2, '0')}Solution.js`;
    this.solved = false;
  }

  partOne(data) {
    data.setSolution('Not solved yet');
    data.setWorking(null);
  }

  partTwo(data) {
    data.setSolution('Not solved yet');
    data.setWorking(null);
  }
}

export default BaseSolution;