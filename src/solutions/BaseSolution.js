import axios from 'axios';

class BaseSolution {
  constructor(id) {
    this.puzzleId = id;
    this.live = Date.now() >= Date.parse(`${id} December 2022`);
    this.path = `day_${id}`;
    this.title = `Day ${id}`;
    this.aocLink = `https://adventofcode.com/2022/day/${id}`;
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

  async otherSolutions(setSolutions) {
    // TODO: Work out how to get this path without having to have '/advent_of_code_2022/' at the start
    const linksFile = `/advent_of_code_2022/data/solutions${String(this.puzzleId).padStart(2, '0')}.json`

    try {
      const result = await axios.get(
        linksFile,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setSolutions({ data: result.data });
    } catch (err) {
      if (err.response.status === 404) {
        setSolutions({ data: [] });
      } else {
        setSolutions({ error: 'Unable to fetch results' });
      }
    }
  }
}

export default BaseSolution;