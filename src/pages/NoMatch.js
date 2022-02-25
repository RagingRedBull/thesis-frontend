import { Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function NoMatch() {
  return (
    <div>
      <h3>Error 404; Page not found</h3>
      <Button href="/" variant="primary">Back</Button>
    </div>
  );
}

export default NoMatch;
