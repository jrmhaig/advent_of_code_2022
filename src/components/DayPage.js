import { Outlet, Link } from 'react-router-dom';

const DayPage = (props) => {
  return (
    <>
      <div className="container">
        <h1 className="title is-3">{props.solution.title}</h1>

        {props.solution.solved ||
          <div className="notification is-danger">
            This day's puzzle has not been solved yet.
          </div>}

        <p className="block">
          <a className="tag is-info" href={props.solution.aocLink}>View puzzle on Advent of Code</a>
        </p>

        <div className="tabs">
          <ul>
            <li><Link to=''>Online solver</Link></li>
            <li><Link to='other_solutions'>Other solutions</Link></li>
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default DayPage;