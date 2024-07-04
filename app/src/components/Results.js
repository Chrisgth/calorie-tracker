import { useEffect } from 'react';
import Food from '../images/vegetable.png';
import ImageWithFallback from './ImageWithFallback';
const Results = ({
  result,
  setDisplayType,
  setDisplayItem,
  setResult,
  setSearchBar,
  setSearchQuery,
}) => {
  let parsedResult;
  let hintArray;

  if (result?.data.parsed.length !== 0) {
    parsedResult = result.data.parsed[0].food;
    hintArray = result.data.hints.slice(1, 10);
  }

  const clickHandler = (arrItem) => {
    setDisplayType('item');
    setDisplayItem(arrItem);
    setResult();
    setSearchBar();
    setSearchQuery('');
  };

  return (
    <div className="results">
      {parsedResult && (
        <div className="mainresult">
          <ImageWithFallback src={parsedResult.image} alt="main result" defaultSrc={Food} />
          <p onClick={() => clickHandler(result.data.hints[0])} className={'clickableItemText'}>
            {parsedResult.label}
          </p>
          <button onClick={() => clickHandler(result.data.hints[0])}>+</button>
        </div>
      )}
      {hintArray && (
        <div className="hints">
          {hintArray.map((hint) => (
            <div className="hint" key={hintArray.indexOf(hint)}>
              {
                <ImageWithFallback
                  src={hint.food.image ?? Food}
                  alt="hint result"
                  defaultSrc={Food}
                />
              }
              <p onClick={() => clickHandler(hint)} className={'clickableItemText'}>
                {hint.food.label}{' '}
              </p>
              <button onClick={() => clickHandler(hint)}>+</button>
            </div>
          ))}
        </div>
      )}
      {!parsedResult && (
        <div className="refine">
          <p>Refine your search, e.g: chicken breast, apple, steak or check spelling.</p>
        </div>
      )}
    </div>
  );
};

export default Results;
