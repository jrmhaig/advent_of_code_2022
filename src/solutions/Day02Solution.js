import BaseSolution from './BaseSolution'
import WorkingSimple from '../components/working/Simple';

class Day02Solution extends BaseSolution {
  constructor() {
    super(2);
    this.solved = true;
    this.subtitle = 'Rock Paper Scissors';
    this.objects = {
      A: 'Rock',
      B: 'Paper',
      C: 'Scissors',
      X: 'Rock',
      Y: 'Paper',
      Z: 'Scissors'
    }
    this.objectScore = { Rock: 1, Paper: 2, Scissors: 3 }
    this.gameScore = { Lose: 0, Draw: 3, Win: 6 }
    this.losingShape = { A: 'Scissors', B: 'Rock', C: 'Paper' }
    this.winningShape = { A: 'Paper', B: 'Scissors', C: 'Rock' }
  }

  partOne(data) {
    const games = data.inputData.split(/\r?\n/)
      .map(game => game.split(' '))
      .map(game => [this.objects[game[0]], this.objects[game[1]]])
      .map(game => [...game, this.score(game)]);

    data.setSolution(games.reduce((total, game) => game[2] + total, 0));
    data.setWorking(<WorkingSimple data={[
      'Game scores:',
      '',
      ...games.map((game, i) => `${i}) ${game[0]} vs ${game[1]} => ${game[2]}`)
    ]} />);
  }

  partTwo(data) {
    const games = data.inputData.split(/\r?\n/)
      .map(game => game.split(' '))
      .map(game => [this.objects[game[0]], this.myShape(...game)])
      .map(game => [...game, this.score(game)]);

    data.setSolution(games.reduce((total, game) => game[2] + total, 0));
    data.setWorking(<WorkingSimple data={[
      'Game scores:',
      '',
      ...games.map((game, i) => `${i}) ${game[0]} vs ${game[1]} => ${game[2]}`)
    ]} />);
  }

  score(game) {
    if (game[0] === game[1]) { return this.objectScore[game[[0]]] + this.gameScore.Draw; }
    if (game[1] === 'Rock') { return this.objectScore.Rock + (game[0] === 'Paper' ? this.gameScore.Lose : this.gameScore.Win); }
    if (game[1] === 'Paper') { return this.objectScore.Paper + (game[0] === 'Scissors' ? this.gameScore.Lose : this.gameScore.Win); }
    if (game[1] === 'Scissors') { return this.objectScore.Scissors + (game[0] === 'Rock' ? this.gameScore.Lose : this.gameScore.Win); }
  }

  myShape(elfsShape, result) {
    if (result === 'X') { return this.losingShape[elfsShape] }
    if (result === 'Y') { return this.objects[elfsShape]; }
    if (result === 'Z') { return this.winningShape[elfsShape] }
  }
}

export default Day02Solution;
