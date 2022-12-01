import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  }

  return (
    <nav className="navbar is-hidden-tablet" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="">
          <img src="https://adventofcode.com/favicon.ico" alt="Advent of Code icon" />
        </Link>

        <button className={menuActive ? "navbar-burger is-active" : "navbar-burger"} onClick={toggleMenu} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbar" className={menuActive ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-start">
          {props.solutions.map(
            (solution, i) => solution.live && <Link key={i} className="navbar-item" to={solution.path}>{solution.title}</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;