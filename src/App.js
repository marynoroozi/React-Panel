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

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getContacts = () => {};

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
