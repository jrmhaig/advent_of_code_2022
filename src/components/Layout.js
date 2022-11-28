import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 class="title">
              <Link to="">
                Advent of Code 2022 solutions
              </Link>
            </h1>
          </div>
        </div>
      </section>
      <section className="section">
        <div class="container">
          <div className="main-content columns is-full-height">
            <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
              <ul className="menu-list">
                <p className="menu-label is-hidden-touch">Solutions</p>
                <li><Link to='day_01'>Day one</Link></li>
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