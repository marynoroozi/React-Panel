import { Spinner } from "react-bootstrap";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContact, getGroup } from "../../services/contactServices";

const ViewContacts = () => {
  const data = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {},
  });

  useEffect(() => {
    getContactInfo();
  }, [data.contactId]);

  const getContactInfo = async () => {
    try {
      setState({ ...state, loading: true });
      const contactRes = await getContact(data.contactId);
      const contactInfo = contactRes.data;
      const { data: groupInfo } = await getGroup(contactInfo.group);
      setState({
        ...state,
        loading: false,
        contact: contactInfo,
        group: groupInfo,
      });
    } catch (error) {
      console.log(error);
      setState({ ...state, loading: false });
    }
  };

  const { loading, contact, group } = state;

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: CYAN }}>
              Contact Information
            </p>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ${PURPLE}` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        Firstname and Lastname:{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Phone Number:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Job: <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: PURPLE }}
                    >
                      Back to Contacts{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default ViewContacts;
