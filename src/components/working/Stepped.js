import { useState } from 'react';

const WorkingStepped = (props) => {
  const [step, setStep] = useState(0);
  const nSteps = props.steps?.length || 0;

  if (nSteps === 0) { return null; }

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">[{step}] {props.steps[step].command}</p>
      </div>
      <div className="card-content is-family-monospace">
        {props.steps[step].data.map((row, i) => <p key={i}>{row}</p>)}
      </div>
      <footer className="card-footer">
        <button onClick={() => setStep(0)} className="card-footer-item">First step</button>
        <button onClick={() => setStep(Math.max(0, step - 1))} className="card-footer-item">Previous step</button>
        <button onClick={() => setStep(Math.min(nSteps - 1, step + 1))} className="card-footer-item">Next step</button>
        <button onClick={() => setStep(nSteps - 1)} className="card-footer-item">Last step</button>
      </footer>
    </div>
  );
}

export default WorkingStepped;