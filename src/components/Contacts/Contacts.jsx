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

const Contacts = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h3">
              <button
                className="btn"
                style={{ backgroundColor: PINK, color: FOREGROUND }}
              >
                {" "}
                Add New Contact
                <span className="fas fa-plus-circle mx-2"></span>
              </button>
            </p>
          </div>
        </div>
        {props.loading ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="row">
              {props.contacts.lenght > 0 ? (
                props.contacts.map((item, index) => <Contact />)
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
