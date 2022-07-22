const Plan = ({ plan }) => {
  return <div className="plan">{plan && <p>{plan.title}</p>}</div>;
};

export default Plan;
