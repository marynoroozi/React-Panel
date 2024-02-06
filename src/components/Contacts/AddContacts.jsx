import { Link } from "react-router-dom";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import Spinner from "../spinner";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
// import { useFormik } from "formik";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactSchema } from "../../validations/contactValidation";

const AddContacts = () => {
  const {
    loading,
    groups,
    // contact,
    // onContactChange,
    createContactForm,
    // error,
  } = useContext(contactContext);

  // const formik = useFormik({
  //   initialValues: {
  //     fullname: "",
  //     photo: "",
  //     mobile: "",
  //     email: "",
  //     job: "",
  //     group: "",
  //   },
  //   validationSchema: contactSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //     createContactForm(values);
  //   },
  // });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-3">
          <img
            src={require("../../assets/man-taking-note.png")}
            alt="img"
            height="400px"
            style={{
              position: "absolute",
              zIndex: "-1",
              top: "130px",
              right: "100px",
              opacity: "50%",
            }}
          />
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                  {" "}
                  Create New Contact
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: GREEN }} />
            <div className="row mt-5">
              <div className="col-md-4">
                <Formik
                  initialValues={{
                    fullname: "",
                    photo: "",
                    mobile: "",
                    email: "",
                    job: "",
                    group: "",
                  }}
                  validationSchema={contactSchema}
                  onSubmit={(values) => {
                    createContactForm(values);
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
                      <Field name="group" as="select" className="form-control">
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
                        value="Create This Contact"
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
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddContacts;
