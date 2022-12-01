import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container">
      <p>
        These pages are my attempt to solve the <a href="https://adventofcode.com/">2022 Advent of Code</a> while
        learning <a href="https://reactjs.org/">React</a> and <a href="https://bulma.io/">Bulma.</a> This being the
        case, things are liable to change and (probably) break. Also, there is no guarantee that I will get to day 25.
      </p>
      <p>
        One thing that is already not working is a menu for mobile users. The solution for day one
        is <Link to="day_1">here</Link> and the source
        is <a href="https://github.com/jrmhaig/advent_of_code_2022/blob/main/src/solutions/Day01Solution.js">here.</a>
      </p>
      <p>The source code for this is on <a href="https://github.com/jrmhaig/advent_of_code_2022">Github</a></p>
    </div>
  )
}

export default Home;