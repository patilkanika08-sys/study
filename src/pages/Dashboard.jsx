import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>📚 AI Study Planner & Learning Assistant</h1>
      <h2>Welcome 👋</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>📖 Total Tasks</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>✅ Completed</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "200px",
          }}
        >
          <h3>⏳ Pending</h3>
          <h2>0</h2>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Quick Actions</h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/planner">
          <button>➕ Study Planner</button>
        </Link>

        <Link to="/ai">
          <button>🤖 AI Assistant</button>
        </Link>

        <Link to="/vision">
          <button>📷 AI Vision</button>
        </Link>

        <Link to="/analytics">
          <button>📊 Analytics</button>
        </Link>

        <Link to="/profile">
          <button>👤 Profile</button>
        </Link>
      </div>

      <hr style={{ margin: "40px 0" }} />

      <h2>Today's Goal</h2>
      <p>Complete today's study tasks and improve your progress.</p>
    </div>
  );
}

export default Dashboard;