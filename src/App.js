import { useState } from "react";
import "./App.css";
import {
  AddContacts,
  EditContacts,
  ViewContacts,
  Contacts,
  Navbar,
} from "./components";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { useEffect } from "react";
import {
  deleteContact,
  getAllContacts,
  getAllGroups,
  createContact,
  updateContact,
} from "./services/contactServices";
import { contactContext } from "./context/contactContext";
import { confirmAlert } from "react-confirm-alert"; // Import

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    fullname: "",
    photo: "",
    mobile: 647,
    email: "",
    job: "",
    group: 0,
    id: 0,
  });
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactQuery, setContactQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContactsData();
    // console.log(forceRender, "forc");
    console.log(contacts, "after");
  }, []);

  const getContactsData = async () => {
    try {
      setLoading((prevLoading) => !prevLoading);
      const { data: contactsData } = await getAllContacts();
      setContacts(contactsData);
      const { data: groupsData } = await getAllGroups();
      setGroups(groupsData);
      setLoading((prevLoading) => !prevLoading);
    } catch (error) {
      console.log(error);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const searchContacts = (e) => {
    setContactQuery(e.target.value);
    console.log(e.target.value);
    const filtered = contacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    console.log(filtered);
    setFilteredContacts(filtered);
  };

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status, data } = await createContact(contact);

      /*
       * NOTE: Two ways to get all contacts after adding a new contact:
       * 1- Render -> forceRender, setForceRender
       * 2- setContact(data)
       */
      console.log(data, "data");
      if (status === 201) {
        // const allContacts = [...contacts, data];
        // console.log(allContacts, "allContacts");
        console.log(contacts, "contacts before");

        setContacts((prev) => {
          console.log(prev, "prev");
          return [...prev, data];
        });
        // setFilteredContacts((prev) => [...prev, data]);
        setContact({});
        getContactsData();
        console.log(contacts, "contacts after");
        setLoading((prevLoading) => !prevLoading);
        // setForceRender((preForcreRender) => !preForcreRender);
        navigate("/contacts");
        // setForceRender((preForcreRender) => !preForcreRender);
      }
    } catch (error) {
      console.log(error);
      setLoading((prevLoading) => !prevLoading);
    }
  };

  const updateContactInfo = async (e, id) => {
    e.preventDefault();
    try {
      setLoading((prevLoading) => !prevLoading);
      const { status } = await updateContact(id, contact);
      setLoading((prevLoading) => !prevLoading);
      if (status === 200) {
        navigate("/contacts");
      }
    } catch (error) {
      setLoading((prevLoading) => !prevLoading);
      console.log(error);
    }
  };

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const removeContact = (id, fullname) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              console.log(contacts, "before");
              setLoading((prevLoading) => !prevLoading);
              const deleteItem = await deleteContact(id);
              // console.log(deleteItem, "delete");
              // setForceRender(true);
              getContactsData();
              // console.log(forceRender, "forc");
              console.log(contacts, "after");
              setLoading((prevLoading) => !prevLoading);
              navigate("/contacts");
            } catch (error) {
              setLoading((prevLoading) => !prevLoading);
              console.log(error);
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

  return (
    <contactContext.Provider
      value={{
        loading,
        setLoading,
        contact,
        setContacts,
        contactQuery,
        contacts,
        filteredContacts,
        groups,
        onContactChange,
        updateContactInfo,
        createContactForm,
        searchContacts,
        removeContact,
      }}
    >
      <div className="App">
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
