import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import NotesListPage from "../NotesListPage/NotesListPage";

export default function App() {
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    }

    fetchUser();
  }, []);

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<NotesListPage user={user} />} />
            {/* Other routes */}
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
