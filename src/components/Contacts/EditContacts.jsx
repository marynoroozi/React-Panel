import { Spinner } from "react-bootstrap";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Contact from "./Contact";
import {
  getAllGroups,
  getContact,
  getGroup,
  updateContact,
} from "../../services/contactServices";

const EditContacts = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {},
    groups: [],
  });
  const { loading, contact, groups } = state;

  useEffect(() => {
    getContactInfo();
  }, []);

  const getContactInfo = async () => {
    try {
      setState({ ...state, loading: true });
      const { data: contactInfo } = await getContact(contactId);
      const { data: groups } = await getAllGroups();
      setState({
        loading: false,
        contact: contactInfo,
        groups: groups,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editContactInfo = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value,
      },
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setState({ ...state, loading: true });
      const { status } = await updateContact(contactId, contact);
      setState({ ...state, loading: false });
      if (status === 200) {
        navigate("/contacts");
      }
    } catch (error) {
      setState({ ...state, loading: false });
      console.log(error);
    }
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
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="fullname"
                        type="text"
                        className="form-control"
                        value={contact.fullname}
                        onChange={(e) => editContactInfo(e)}
                        required={true}
                        placeholder="Fullname"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        type="text"
                        onChange={(e) => editContactInfo(e)}
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
                        onChange={(e) => editContactInfo(e)}
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
                        onChange={(e) => editContactInfo(e)}
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
                        onChange={(e) => editContactInfo(e)}
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
                        onChange={editContactInfo}
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
