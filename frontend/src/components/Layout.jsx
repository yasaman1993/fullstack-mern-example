import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet /> {/* Renders nested routes */}
      </main>
      <footer>
        <p>© 2024 My App</p>
      </footer>
    </div>
  );
}

export default Layout;
