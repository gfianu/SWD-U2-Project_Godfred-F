import "../styles/Footer.css";

function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer>
      <div className="container">
        &copy; {thisYear} ChemLearn. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
