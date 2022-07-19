const Item = ({ displayItem }) => {
  return (
    <div className="itemDisplayContainer">
      {displayItem && (
        <div className="itemDisplay">
          <p>{displayItem.label}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
