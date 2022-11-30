import { Routes, Route } from "react-router-dom";
import 'bulma/css/bulma.min.css';

import Layout from './components/Layout';
import Home from './components/Home';
import PuzzlePage from './components/PuzzlePage';

import Day01Solution from './solutions/Day01Solution';
import Day02Solution from './solutions/Day02Solution';
import Day03Solution from './solutions/Day03Solution';
import Day04Solution from './solutions/Day04Solution';
import Day05Solution from './solutions/Day05Solution';
import Day06Solution from './solutions/Day06Solution';
import Day07Solution from './solutions/Day07Solution';
import Day08Solution from './solutions/Day08Solution';
import Day09Solution from './solutions/Day09Solution';
import Day10Solution from './solutions/Day10Solution';
import Day11Solution from './solutions/Day11Solution';
import Day12Solution from './solutions/Day12Solution';
import Day13Solution from './solutions/Day13Solution';
import Day14Solution from './solutions/Day14Solution';
import Day15Solution from './solutions/Day15Solution';
import Day16Solution from './solutions/Day16Solution';
import Day17Solution from './solutions/Day17Solution';
import Day18Solution from './solutions/Day18Solution';
import Day19Solution from './solutions/Day19Solution';
import Day20Solution from './solutions/Day20Solution';
import Day21Solution from './solutions/Day21Solution';
import Day22Solution from './solutions/Day22Solution';
import Day23Solution from './solutions/Day23Solution';
import Day24Solution from './solutions/Day24Solution';
import Day25Solution from './solutions/Day25Solution';

function App() {
  const solutions = [
    new Day01Solution(),
    new Day02Solution(),
    new Day03Solution(),
    new Day04Solution(),
    new Day05Solution(),
    new Day06Solution(),
    new Day07Solution(),
    new Day08Solution(),
    new Day09Solution(),
    new Day10Solution(),
    new Day11Solution(),
    new Day12Solution(),
    new Day13Solution(),
    new Day14Solution(),
    new Day15Solution(),
    new Day16Solution(),
    new Day17Solution(),
    new Day18Solution(),
    new Day19Solution(),
    new Day20Solution(),
    new Day21Solution(),
    new Day22Solution(),
    new Day23Solution(),
    new Day24Solution(),
    new Day25Solution()
  ]

  return (
    <Routes>
      <Route path="/" element={<Layout solutions={solutions} />}>
        <Route key="home" path="/" element={<Home />} />
        {solutions.map(
          (solution, i) => solution.live && <Route key={i} path={solution.path} element={<PuzzlePage title={solution.title} solution={solution} />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;
