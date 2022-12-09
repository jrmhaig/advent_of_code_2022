import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faYoutube, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons'

const OtherSolutions = (props) => {
  const [solutions, setSolutions] = useState({ data: [] });
  const icons = {
    github: faGithub,
    youtube: faYoutube,
    google: faGoogle,
    twitter: faTwitter
  };

  useEffect(() => {
    props.solution.otherSolutions(setSolutions);
  }, [props.solution])

  const card = (i, data) => {
    return (
      <tr key={i}>
        <td><FontAwesomeIcon icon={icons[data.type]} /></td>
        <td>{data.username}</td>
        <td><a href={data.link}>{data.language}</a></td>
      </tr>
    );
  }

  return (
    <>
      <p className="block">
        A collection of solutions I have found in various places. Fee free to
        {' '}
        <a href="https://github.com/jrmhaig/advent_of_code_2022/issues/new">create an issue</a>
        {' or '}
        <a href={`https://github.com/jrmhaig/advent_of_code_2022/edit/main/public/data/solutions${String(props.solution.puzzleId).padStart(2, '0')}.json`}>edit and raise a PR</a>
      </p>
      {
        solutions &&
          solutions.error
          ? <p>Error: {solutions.error}</p>
          : <table className="table is-striped">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {solutions.data.map((solution, i) => card(i, solution))}
            </tbody>
          </table>
      }
    </>
  )
}

export default OtherSolutions;