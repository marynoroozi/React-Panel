import { Spinner } from "react-bootstrap";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { getContact, updateContact } from "../../services/contactServices";
import { contactContext } from "../../context/contactContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";
import { useImmer } from "use-immer";
import { toast } from "react-toastify";

const EditContacts = () => {
  const { loading, setLoading, contacts, setContacts, groups } =
    useContext(contactContext);
  const [contact, setContact] = useImmer({});
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

  const updateContactInfo = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await updateContact(contactId, values);

      if (status === 200) {
        setLoading(false);
        toast.info("The contact has been successfully updated");
        // toast.success("The contact has been successfully updated");

        // const allContacts = [...contacts];
        // const contactIndex = allContacts.findIndex(
        //   (c) => c.id === parseInt(contactId)
        // );
        // allContacts[contactIndex] = { ...data };
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        navigate("/contacts");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const onContactChange = (event) => {
  //   setContact({ ...contact, [event.target.name]: event.target.value });
  // };

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
                  <Formik
                    enableReinitialize
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      updateContactInfo(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          placeholder="Firstname and lastname"
                          className="form-control"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="fullname"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="photo"
                          placeholder="Image address"
                          className="form-control"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="photo"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="mobile"
                          type="number"
                          placeholder="Phone number"
                          className="form-control"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="mobile"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="email"
                          type="text"
                          placeholder="Email address"
                          className="form-control"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="email"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="job"
                          type="text"
                          placeholder="job"
                          className="form-control"
                        />
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="job"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                        >
                          <option value="">select a group</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {" "}
                                {group.name}{" "}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                          name="group"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="Edit This Contact"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          Cancel
                        </Link>
                      </div>
                    </Form>
                  </Formik>
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
