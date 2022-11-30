class BaseSolution {
  constructor(liveDate) {
    this.live = Date.now() >= liveDate;
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