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

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContactsData();
  }, []);

  const getContactsData = async () => {
    try {
      setLoading(true);
      const { data: contactsData } = await axios.get(
        "http://localhost:9000/contacts"
      );
      setContacts(contactsData);
      const { data: groupsData } = await axios.get(
        "http://localhost:9000/groups"
      );
      setGroups(groupsData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={<Contacts contacts={getContacts} loading={loading} />}
        />
        <Route path="/contacts/:contactId" element={<ViewContacts />} />
        <Route path="/contacts/edit/:contactId" element={<EditContacts />} />
      </Routes>
    </div>
  );
};

export default App;
