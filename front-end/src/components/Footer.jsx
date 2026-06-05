import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="wrapper">

        <h3>Tim Capstone Project CC26</h3>
        <p className="footer-desc">
          Solusi cerdas pengelolaan sampah berbasis AI.
        </p>

        <div className="footer-main-row">

          <p className="copyright">
            PilahinAI © 2026
          </p>

          <div className="footer-nav-vertical">
            <Link to="/how-it-works" onClick={() => window.scrollTo(0, 0)}>How It Works</Link>
            <Link to="/upload" onClick={() => window.scrollTo(0, 0)}>Upload</Link>
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>About</Link>
          </div>

          <div className="footer-right-col">
            <p className="footer-email">
              CC26-PSU026@student.devacademy.id
            </p>

            <div className="footer-social-icons">
              <a href="https://youtu.be/OHyBfXkTJzA?si=k_FPGRkLIfyUGo18" target="_blank">
                <img src="/icon-youtube.png" alt="YouTube" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;