import { Link } from "react-router-dom";
import { PINK, FOREGROUND, ORANGE, CURRENTLINE } from "../../helpers/colors";
import Spinner from "../spinner";
import Contact from "./Contact";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";

const Contacts = () => {
  const { contacts, loading, filteredContacts, removeContact } =
    useContext(contactContext);

  // console.log(filteredContacts, "from APP in contacts");
  // const showContacts = filteredContacts.length > 0 ? filteredContacts : contacts;

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
              {filteredContacts.length > 0 ? (
                filteredContacts.map((item, index) => {
                  // console.log(item, "item");
                  return (
                    <Contact
                      key={item.id}
                      Contact={item}
                      confirmDelete={() =>
                        removeContact(item.id, item.fullname)
                      }
                    />
                  );
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
