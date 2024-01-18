import { useState } from "react";
import "./App.css";
import {
  AddContacts,
  EditContacts,
  ViewContacts,
  Contacts,
  Navbar,
} from "./components";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={contacts} loading={loading} />
    </div>
  );
};

export default App;
