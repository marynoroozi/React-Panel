import { Link } from "react-router-dom";
import {
  PINK,
  FOREGROUND,
  ORANGE,
  PURPLE,
  GREEN,
  CYAN,
  RED,
} from "../../helpers/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = ({ Contact }) => {
  // console.log(Contact);
  return (
    <div className="col-md-6">
      <div className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around ">
            <div className="col-md-4 col-sm-4">
              <img
                src={Contact.photo}
                alt={Contact.fullname}
                style={{ border: `px solid ${GREEN}` }}
                className="img-fluid rounded"
              ></img>
            </div>
            <div className="col-md-7 col-sm-7">
              <ul className="list-group">
                <li class="list-group-item list-group-item-dark">
                  Name: <span className="fw-bold"> {Contact.fullname}</span>
                </li>
                <li class="list-group-item list-group-item-dark">
                  Phone Number:{" "}
                  <span className="fw-bold"> {Contact.mobile}</span>
                </li>
                <li class="list-group-item list-group-item-dark">
                  Email: <span className="fw-bold"> {Contact.email}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-item-center ">
              <Link
                to={`/contacts/${Contact.id}`}
                className="btn my-1 align-self-center"
                style={{ backgroundColor: ORANGE }}
              >
                {/* <FontAwesomeIcon icon={""} /> */}
                <FontAwesomeIcon icon="fa-solid fa-eye" />
              </Link>
              <Link
                to={`/contacts/edit/${Contact.id}`}
                className="btn my-1 align-self-center"
                style={{ backgroundColor: CYAN }}
              >
                <FontAwesomeIcon icon="fas fa-pencil-alt" />
              </Link>
              <button
                className="btn my-1 align-self-center"
                style={{ backgroundColor: PURPLE }}
              >
                <FontAwesomeIcon icon="fa-solid  fa-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
