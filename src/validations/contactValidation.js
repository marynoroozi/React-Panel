import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required"),
  photo: Yup.string().url("The url is not valid").nullable(), // Nullable یعنی میتونه خالی باشه
  mobile: Yup.number().required("Mobile number is required"),
  email: Yup.string()
    .email("The email address is not valid")
    .required("The email address is required"),
  job: Yup.string().required("Job is required"),
  group: Yup.string().required("Group selection is required"),
});
