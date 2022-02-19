import { Button } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function RestrictedAccess() {
  return (
    <div>
      <h3>Restricted Access, Please log-in to verify</h3>
      <Button href="/" variant="primary">Back</Button>
    </div>
  );
}

export default RestrictedAccess;
