class TestSolution {
  partOne(data) {
    const depths = data.inputData.split(/\r?\n/).map(n => +n);
    const length = depths.length;
    let newSolution = [`${depths[0]} (N/A - no previous measurement)`];
    let tally = 0;
    for (let i = 1; i < length; i++) {
      if (depths[i] > depths[i - 1]) {
        tally += 1;
        newSolution.push(`${depths[i]} (increased) - ${tally}`);
      } else if (depths[i] < depths[i - 1]) {
        newSolution.push(`${depths[i]} (decreased)`);
      } else {
        newSolution.push(`${depths[i]} (no change)`);
      }
    }
    data.setSolution(tally);
    data.setWorking(newSolution);
    console.log(newSolution);
  }

  partTwo(data) {
    const depths = data.inputData.split(/\r?\n/).map(n => +n);
    const length = depths.length;
    let newSolution = [`${depths[2] + depths[1] + depths[0]} (N/A - no previous measurement)`];
    let tally = 0;
    for (let i = 3; i < length; i++) {
      const a = depths[i] + depths[i - 1] + depths[i - 2];
      const b = depths[i - 1] + depths[i - 2] + depths[i - 3];
      if (a > b) {
        tally += 1;
        newSolution.push(`${a} (increased) - ${tally}`);
      } else if (a < b) {
        newSolution.push(`${a} (decreased)`);
      } else {
        newSolution.push(`${a} (no change)`);
      }
    }
    data.setSolution(tally);
    data.setWorking(newSolution);
  }
}

export default TestSolution;