import BaseSolution from './BaseSolution'
import WorkingSimple from '../components/working/Simple';

class Day08Solution extends BaseSolution {
  constructor() {
    super(8);
    this.solved = true;
    this.subtitle = 'Treetop Tree House';
  }

  partOne(data) {
    const working = [];
    const trees = data.inputData.split(/\r?\n/).map(row => row.split('').map(n => +n));
    const nRows = trees.length;
    const nCols = trees[0].length;
    const cols = Array.from(Array(nRows), (_x, i) => trees.map(row => row[i]));

    const visible = trees.map((row, y) => {
      let showRow = '';
      const rowFlags = row.map((tree, x) => {
        if (x === 0 || y === 0 || x === nCols - 1 || y === nRows - 1) {
          showRow += '#';
          return true;
        }

        const v = tree > Math.max(...trees[y].slice(0, x)) || tree > Math.max(...trees[y].slice(x + 1, nCols)) || tree > Math.max(...cols[x].slice(0, y)) || tree > Math.max(...cols[x].slice(y + 1, nRows));

        showRow += v ? '#' : '.';
        return v;
      })
      working.push(showRow);
      return rowFlags;
    });

    data.setSolution(visible.flat().filter(x => x).length);
    data.setWorking(<WorkingSimple data={working} />);
  }

  partTwo(data) {
    const working = [];
    const trees = data.inputData.split(/\r?\n/).map(row => row.split('').map(n => +n));
    const nRows = trees.length;
    const nCols = trees[0].length;
    const cols = Array.from(Array(nRows), (_x, i) => trees.map(row => row[i]));

    const scenicScores = trees.map((row, y) => {
      const rowScores = row.map((tree, x) => {
        if (x === 0 || y === 0 || x === nCols - 1 || y === nRows - 1) {
          return 0;
        }

        const treesLeft = trees[y].slice(0, x);
        const treesRight = trees[y].slice(x + 1, nCols);
        const treesUp = cols[x].slice(0, y);
        const treesDown = cols[x].slice(y + 1, nRows);

        return [
          this.partialScore(treesLeft.reverse(), tree),
          this.partialScore(treesRight, tree),
          this.partialScore(treesUp.reverse(), tree),
          this.partialScore(treesDown, tree)
        ].reduce((total, n) => total * n, 1);
      })

      working.push(rowScores.join(','));

      return rowScores;
    });

    data.setSolution(Math.max(...scenicScores.flat()));
    data.setWorking(<WorkingSimple data={working} />);
  }

  partialScore(trees, n) {
    const i = trees.findIndex(m => m >= n) + 1;
    return i > 0 ? i : trees.length;
  }
}

export default Day08Solution;
