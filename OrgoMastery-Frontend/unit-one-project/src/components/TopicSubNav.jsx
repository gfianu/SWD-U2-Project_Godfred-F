import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/TopicSubNav.css";

// secondary tabs for the topic page
const links = [
  { path: "", label: "Videos" },   // default
  { path: "notes", label: "Notes" },
  { path: "quizzes", label: "Quizzes" },
  { path: "dashboard", label: "Dashboard" },
];


export default function TopicSubNav({ basePath }) {
  const [open, setOpen] = useState(false);

  /** Ensures clean paths (avoids double slashes like /lectures/3//notes) */
  const cleanJoin = (root, subpath) => {
    if (!subpath) return root; // for Lecture tab
    return `${root}/${subpath}`.replace(/\/+/g, "/");
  };

  return (
    <nav className="topic-subnav" aria-label="Topic Navigation">
      {/* Mobile Toggle Button */}
      <button
        className="subnav-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="topic-subnav-list"
      >
        &#9776;
      </button>

      {/* Tab List */}
      <ul id="topic-subnav-list" className={open ? "open" : ""}>
        {links.map(({ path, label }) => {
          const targetPath = cleanJoin(basePath, path);

          return (
            <li key={path}>
              <NavLink
                to={targetPath}
                end={path === ""} 
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                {label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

