import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
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
import { deleteContact } from "../../services/contactServices";
import { useState } from "react";
import { EyeFill, PencilFill, TrashFill } from "react-bootstrap-icons";
// import * as Icon from "react-bootstrap-icons";

const Contact = ({ Contact, forceRender }) => {
  // console.log(Contact);
  const [loading, setLoading] = useState(false);
  // const[render, setRender] = useState(false)
  const navigate = useNavigate();

  const removeContact = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              setLoading(!loading);
              const res = await deleteContact(Contact.id);
              setLoading(!loading);
              forceRender(true);
              navigate("/contacts");
              console.log(res);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

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
                <li className="list-group-item list-group-item-dark">
                  Name: <span className="fw-bold"> {Contact.fullname}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  Phone Number:{" "}
                  <span className="fw-bold"> {Contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
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
                <EyeFill />
              </Link>
              <Link
                to={`/contacts/edit/${Contact.id}`}
                className="btn my-1 align-self-center"
                style={{ backgroundColor: CYAN }}
              >
                <PencilFill />
              </Link>
              <button
                onClick={removeContact}
                className="btn my-1 align-self-center"
                style={{ backgroundColor: PURPLE }}
              >
                <TrashFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
