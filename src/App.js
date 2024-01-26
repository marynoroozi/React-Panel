import { useState } from "react";
import "./App.css";
import {
  AddContacts,
  EditContacts,
  ViewContacts,
  Contacts,
  Navbar,
} from "./components";
import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import {
  deleteContact,
  getAllContacts,
  getAllGroups,
} from "./services/contactServices";

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [forceRender, setForceRender] = useState();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    getContactsData();
  }, [forceRender]);

  const getContactsData = async () => {
    try {
      setLoading(true);
      const { data: contactsData } = await getAllContacts();
      setContacts(contactsData);
      setForceRender(false);
      const { data: groupsData } = await getAllGroups();
      setGroups(groupsData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const defineRender = (data) => {
    // console.log(data, "forcrender");
    setForceRender(data);
  };

  const searchContacts = (e) => {
    setQuery(e.target.value);
    console.log(e.target.value);
    const filtered = getContacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    console.log(filtered);
    setFilteredContacts(filtered);
  };
  const contacts = filteredContacts.length ? filteredContacts : getContacts;

  return (
    <div className="App">
      <Navbar searchContact={searchContacts} query={query} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={contacts}
              loading={loading}
              // forceRender={(data) => forceRende(data)}
              appRender={(data) => defineRender(data)}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContacts />} />
        <Route
          path="/contacts/add"
          element={
            <AddContacts
              getGroups={getGroups}
              loading={loading}
              appRender={(data) => defineRender(data)}
            />
          }
        />
        <Route
          path="/contacts/edit/:contactId"
          element={<EditContacts appRender={(data) => defineRender(data)} />}
        />
      </Routes>
    </div>
  );
};

export default App;
