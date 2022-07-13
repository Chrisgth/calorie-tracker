const Dashboard = ({ user }) => {
  const trackuser = () => {
    console.log(user);
  };

  return (
    <div className="dashboard">
      {user && <p>Welcome back {user.username}</p>}
      <button onClick={trackuser}>trackuser</button>
    </div>
  );
};

export default Dashboard;
