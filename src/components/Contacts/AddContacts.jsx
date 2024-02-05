import { Link } from "react-router-dom";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import Spinner from "../spinner";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";
import { useFormik } from "formik";
import { contactSchema } from "../../validations/contactValidation";

const AddContacts = () => {
  const {
    loading,
    groups,
    contact,
    onContactChange,
    createContactForm,
    // error,
  } = useContext(contactContext);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      photo: "",
      mobile: "",
      email: "",
      job: "",
      group: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      console.log(values);
      createContactForm(values);
    },
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="p-3">
          <img
            src={require("../../assets/man-taking-note.png")}
            alt={contact.fullname}
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
                {/* {error?.map((item, index) => (
                  <p key={index} className="text-danger">
                    {item.message}
                  </p>
                ))} */}
                <form
                  onSubmit={
                    //createContactForm
                    formik.handleSubmit
                  }
                >
                  <div className="mb-2">
                    <input
                      id="fullname"
                      type="text"
                      name="fullname"
                      placeholder="Firstname and lastname"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullname}
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                      <div className="text-danger">
                        {formik.errors.fullname}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <input
                      id="photo"
                      type="text"
                      name="photo"
                      placeholder="Image address"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.photo}
                    />
                    {formik.touched.photo && formik.errors.photo ? (
                      <div className="text-danger">{formik.errors.photo}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <input
                      id="mobile"
                      type="number"
                      name="mobile"
                      placeholder="Phone number"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.mobile}
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="text-danger">{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <input
                      id="email"
                      type="text"
                      name="email"
                      placeholder="Email address"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <input
                      id="job"
                      type="text"
                      name="job"
                      placeholder="job"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.job}
                    />
                    {formik.touched.job && formik.errors.job ? (
                      <div className="text-danger">{formik.errors.job}</div>
                    ) : null}
                  </div>
                  <div className="mb-2">
                    <select
                      id="group"
                      name="group"
                      className="form-control"
                      // required={true}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.group}
                    >
                      <option value="">select a group</option>
                      {groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {" "}
                            {group.name}{" "}
                          </option>
                        ))}
                    </select>
                    {formik.touched.group && formik.errors.group ? (
                      <div className="text-danger">{formik.errors.group}</div>
                    ) : null}
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
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddContacts;
