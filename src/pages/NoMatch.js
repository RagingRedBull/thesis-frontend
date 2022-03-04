import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../images/PRMTS-logo.png";

function NoMatch() {
  return (
    <div className="h-100 row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <div className="logo">
              <img
                src={logo}
                className="img-fluid img-thumbnail logo border-0"
                alt="PRMTS Logo"
              />
            </div>
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              The page you are looking for was not found.
            </div>
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoMatch;
