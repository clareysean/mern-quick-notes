import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav>
      <h1>
        <em>Quick Notes</em>
      </h1>
      <h3>WELCOME, {user.name}</h3> <br />
      <Link to="" onClick={handleLogOut}>
        <span className="logout-link">Log Out</span>
      </Link>
    </nav>
  );
}
