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
import { getAllContacts, getAllGroups } from "./services/contactServices";

const App = () => {
  const [getContacts, setContacts] = useState([]);
  const [getGroups, setGroups] = useState([]);
  const [forceRender, setForceRender] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getContactsData();
  }, [forceRender]);

  const getContactsData = async () => {
    try {
      setLoading(true);
      const { data: contactsData } = await getAllContacts();
      setContacts(contactsData);

      const { data: groupsData } = await getAllGroups();
      setGroups(groupsData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const defineRender = (data) => {
    setForceRender(data);
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
        <Route path="/contacts/edit/:contactId" element={<EditContacts />} />
      </Routes>
    </div>
  );
};

export default App;
