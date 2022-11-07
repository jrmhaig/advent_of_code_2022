import 'bulma/css/bulma.min.css';

function App() {
  return (
    <section className="section">
      <div className="columns">
        <div className="column is-3">
          <p>Sidebar</p>
        </div>
        <div className="column is-9">
          <section className="main">
            <p>Main stuff</p>
          </section>
        </div>
      </div>
    </section>
  )
}

export default App;
