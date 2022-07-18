const Results = ({ result }) => {
  return (
    <div className="results">
      <p>{result.data.text}</p>
    </div>
  );
};

export default Results;
