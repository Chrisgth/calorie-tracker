import Search from "../images/loupe.png";
const Dashboard = ({ user }) => {
  const trackuser = () => {
    console.log(user);
  };
  return (
    <div className="dashboard">
      <div className="sidebar"></div>
      <div className="searchbar">
        <img src={Search} alt="" />
        <input type="text" placeholder="Search for food here..." />
      </div>
      <div className="display"></div>
    </div>
  );
};

export default Dashboard;
