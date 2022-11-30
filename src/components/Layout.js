import { Outlet, Link } from 'react-router-dom'

const Layout = (props) => {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              <Link to="">
                Advent of Code 2022 solutions
              </Link>
            </h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="main-content columns is-full-height">
            <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
              <p className="menu-label is-hidden-touch">Solutions</p>
              <ul className="menu-list">
                {props.solutions.map(
                  (solution, i) => solution.live && <li key={i}><Link to={solution.path}>{solution.title}</Link></li>
                )}
              </ul>
            </aside>

            <main className="container column is-10 has-background-primary-light box">
              <Outlet />
            </main>
          </div>
        </div >
      </section >
    </>
  );
}

export default Layout;