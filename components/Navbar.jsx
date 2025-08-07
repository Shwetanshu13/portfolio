import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/projects">Projects</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/socials">Socials</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
