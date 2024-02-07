// import { useState } from "react";
import "./App.css";
import {
  AddContacts,
  EditContacts,
  ViewContacts,
  Contacts,
  Navbar,
} from "./components";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import { useEffect } from "react";
import {
  deleteContact,
  getAllContacts,
  getAllGroups,
  createContact,
} from "./services/contactServices";
import { contactContext } from "./context/contactContext";
import { confirmAlert } from "react-confirm-alert"; // Import
import { useImmer } from "use-immer";
import _ from "lodash";
// import { contactSchema } from "./validations/contactValidation";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [contacts, setContacts] = useImmer([]);
  // const [contact, setContact] = useState({
  //   fullname: "",
  //   photo: "",
  //   mobile: 647,
  //   email: "",
  //   job: "",
  //   group: 0,
  //   id: 0,
  // });
  const [groups, setGroups] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [filteredContacts, setFilteredContacts] = useImmer([]);
  const navigate = useNavigate();
  // const [error, setError] = useState([]);

  useEffect(() => {
    // console.log("Contact Manager App");
    getContactsData();
    // console.log(forceRender, "forc");
    // console.log(contacts, "after");
  }, []);

  const getContactsData = async () => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { data: contactsData } = await getAllContacts();
      setContacts(contactsData);
      setFilteredContacts(contactsData);
      const { data: groupsData } = await getAllGroups();
      setGroups(groupsData);
      setLoading((prevLoading) => !prevLoading);
    } catch (error) {
      console.log(error);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // let filteredTimout;

  // const searchContacts = (query) => {
  //   // console.log(query);

  //   clearTimeout(filteredTimout);

  //   if (!query) return setFilteredContacts([...contacts]);

  //   filteredTimout = setTimeout(() => {
  //     setFilteredContacts(
  //       contacts.filter((contact) => {
  //         return contact.fullname.toLowerCase().includes(query.toLowerCase());
  //       })
  //     );
  //   }, 1000);
  // };

  const searchContacts = _.debounce((query) => {
    // console.log(query);

    if (!query) return setFilteredContacts([...contacts]);

    // setFilteredContacts(
    //   contacts.filter((contact) => {
    //     return contact.fullname.toLowerCase().includes(query.toLowerCase());
    //   })
    // );

    //using Immer
    setFilteredContacts((draft) =>
      draft.filter((c) => {
        return c.fullname.toLowerCase().includes(query.toLowerCase());
      })
    );
  }, 1000);

  // const searchContacts = (query) => {
  //   // console.log(query);

  //   setFilteredContacts(
  //     contacts.filter((contact) => {
  //       return contact.fullname.toLowerCase().includes(query.toLowerCase());
  //     })
  //   );
  // };

  // function debounce(func, time) {
  //   let timer;

  //   // we should get a func with its arguments and cause a delay on its implementation and then return it.
  //   return (...args) => {
  //     clearTimeout(timer);

  //     if (!args) return setFilteredContacts([...contacts]);

  //     timer = setTimeout(() => func(...args), time);
  //   };
  // }

  const createContactForm = async (values) => {
    // event.preventDefault();
    try {
      setLoading((draft) => !draft);
      // await contactSchema.validate(contact, { abortEarly: false }); //abortEarly cause to return all errors
      // const { status, data } = await createContact(contact);
      const { status, data } = await createContact(values);

      /*
       * NOTE: Two ways to get all contacts after adding a new contact:
       * 1- Render -> forceRender, setForceRender
       * 2- setContact(data)
       */
      // console.log(data, "data");
      if (status === 201) {
        toast.success("The contact has been successfully created");
        setContacts((draft) => {
          draft.push(data);
        });
        setFilteredContacts((draft) => {
          draft.push(data);
        });
        // const allContacts = [...contacts, data];
        // console.log(allContacts, "allContacts");
        // console.log(contacts, "contacts before");

        // setContacts((prev) => {
        //   // console.log(prev, "prev");
        //   return [...prev, data];
        // });
        // setFilteredContacts((prev) => [...prev, data]);
        // setContact({});
        // setError([]);
        // getContactsData();
        setLoading((draft) => !draft);
        // setForceRender((preForcreRender) => !preForcreRender);
        navigate("/contacts");
        // setForceRender((preForcreRender) => !preForcreRender);
      }
    } catch (error) {
      console.log(error);
      // setError(error.inner);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  // const updateContactInfo = async (e, id) => {
  //   e.preventDefault();
  //   try {
  //     setLoading((prevLoading) => !prevLoading);
  //     const { status } = await updateContact(id, contact);
  //     setLoading((prevLoading) => !prevLoading);
  //     if (status === 200) {
  //       navigate("/contacts");
  //     }
  //   } catch (error) {
  //     setLoading((prevLoading) => !prevLoading);
  //     console.log(error);
  //   }
  // };

  // const onContactChange = (event) => {
  //   setContact({ ...contact, [event.target.name]: event.target.value });
  // };

  const removeContact = (id, fullname) => {
    const contactsBackup = [...contacts];
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              // console.log(contacts, "before");
              setLoading((draft) => !draft);
              const { status } = await deleteContact(id);
              toast.error("The contact has been successfully deleted");
              // console.log(deleteItem, "delete");
              // setForceRender(true);
              if (status !== 200) {
                setContacts(contactsBackup);
                setFilteredContacts(contactsBackup);
              }
              getContactsData();
              // console.log(forceRender, "forc");
              setLoading((draft) => !draft);
              navigate("/contacts");
            } catch (error) {
              console.log(error);
              setContacts(contactsBackup);
              setFilteredContacts(contactsBackup);
              setLoading((draft) => !draft);
            }
          },
        },
        {
          label: "No",
          onClick: () => "",
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const leadingDebounce = (func, time) => {
    let timer;
    return (...args) => {
      if (!timer) {
        func(...args);
      }

      clearTimeout(timer);

      timer = setTimeout(() => (timer = undefined), time);
    };
  };

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        // contact,
        setContacts,
        contacts,
        filteredContacts,
        groups,
        // error,
        // onContactChange,
        // updateContactInfo,
        createContactForm,
        searchContacts,
        removeContact,
        leadingDebounce,
      }}
    >
      <div className="App">
        {/* <ToastContainer theme="colored" /> */}
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:contactId" element={<ViewContacts />} />
          <Route path="/contacts/add" element={<AddContacts />} />
          <Route path="/contacts/edit/:contactId" element={<EditContacts />} />
        </Routes>
      </div>
    </contactContext.Provider>
  );
};

export default App;
