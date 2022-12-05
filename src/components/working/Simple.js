const WorkingSimple = (props) => {
  if (Array.isArray(props.data)) {
    return (
      <div className="box is-family-monospace">{props.data.map((row, i) => <p key={i}>{row}</p>)}</div>
    )
  }

  return null;
}

export default WorkingSimple;