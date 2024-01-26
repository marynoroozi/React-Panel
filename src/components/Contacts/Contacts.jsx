import { Link } from "react-router-dom";
import {
  PINK,
  FOREGROUND,
  ORANGE,
  PURPLE,
  GREEN,
  CYAN,
  RED,
  CURRENTLINE,
} from "../../helpers/colors";
import Spinner from "../spinner";
import Contact from "./Contact";

const Contacts = ({ contacts }, { loading }) => {
  // console.log(contacts, "from APP in contacts");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3">
              <Link
                to={"/contacts/add"}
                className="btn"
                style={{ backgroundColor: PINK, color: FOREGROUND }}
              >
                {" "}
                Add New Contact
                <span className="fas fa-plus-circle mx-2"></span>
              </Link>
            </p>
          </div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="row">
              {contacts.length > 0 ? (
                contacts.map((item, index) => {
                  // console.log(item, "item");
                  return <Contact key={contacts.id} Contact={item} />;
                })
              ) : (
                <div
                  className="text-center py-5"
                  style={{ backgroundColor: CURRENTLINE }}
                >
                  <p className="h3" style={{ color: ORANGE }}>
                    {" "}
                    You have no contact
                  </p>
                  <img
                    className="w-25"
                    alt="not found"
                    src={require("../../assets/no-found.gif")}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Contacts;
