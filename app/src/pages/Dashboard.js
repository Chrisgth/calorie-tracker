const Dashboard = ({ user }) => {
  const trackuser = () => {
    console.log(user);
  };
  return (
    <div className="dashboard">
      <div className="sidebar"></div>
      <div className="searchbar">
        <input type="search" />
      </div>
      <div className="display"></div>
    </div>
  );
};

export default Dashboard;
