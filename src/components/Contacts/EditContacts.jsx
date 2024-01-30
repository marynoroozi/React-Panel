import { Spinner } from "react-bootstrap";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Contact from "./Contact";
import {
  getAllGroups,
  getContact,
  getGroup,
  updateContact,
} from "../../services/contactServices";
import { contactContext } from "../../context/contactContext";

const EditContacts = () => {
  const { loading, setLoading, contacts, setContacts, groups } =
    useContext(contactContext);
  const [contact, setContact] = useState({});
  const { contactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getContactInfo();
  }, [contactId]);

  const getContactInfo = async () => {
    try {
      setLoading(true);
      const { data: contactInfo } = await getContact(contactId);
      setContact(contactInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateContactInfo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Copy State
      // Update State
      // Send Request
      // status === 200 -> do nothing
      // status === error -> setState(copyState)
      const { status, data } = await updateContact(contactId, contact);

      /*
       * NOTE
       * 1- forceRender -> setForceRender(true)
       * 2- Send request server
       * 3- Update Local state
       * 4- Update Local state before sending request to server
       */

      // console.log(data);
      if (status === 200) {
        setLoading(false);

        const allContacts = [...contacts];
        console.log(allContacts, "all");
        const contactIndex = allContacts.findIndex(
          (c) => c.id === parseInt(contactId)
        );
        console.log(contactIndex, "index");
        allContacts[contactIndex] = { ...data };
        setContacts(allContacts);

        navigate("/contacts");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <form
                    onSubmit={(e, contactId) => updateContactInfo(e, contactId)}
                  >
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={(e) => onContactChange(e)}
                        required={true}
                        placeholder="Fullname"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        onChange={(e) => onContactChange(e)}
                        value={contact.photo}
                        className="form-control"
                        required={true}
                        placeholder="Image ur "
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        type="number"
                        onChange={(e) => onContactChange(e)}
                        className="form-control"
                        value={contact.mobile}
                        required={true}
                        placeholder="Phone number "
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        type="email"
                        onChange={(e) => onContactChange(e)}
                        className="form-control"
                        value={contact.email}
                        required={true}
                        placeholder="Email "
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="job"
                        type="text"
                        onChange={(e) => onContactChange(e)}
                        className="form-control"
                        value={contact.job}
                        required={true}
                        placeholder="Job"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        required={true}
                        className="form-control"
                        value={contact.group}
                        onChange={onContactChange}
                      >
                        <option value="">Select a group</option>
                        {Object.keys(groups).length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <button
                        className="btn"
                        type="submit"
                        style={{ backgroundColor: PURPLE }}
                      >
                        {" "}
                        Edit Contact
                      </button>
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContacts;
