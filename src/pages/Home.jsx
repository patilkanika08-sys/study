import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>AI Study Planner & Learning Assistant</h1>

      <p>Welcome to AI Study Planner</p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br />
      <br />

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default Home;