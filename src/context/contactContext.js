import React from "react";

export const contactContext = React.createContext({
  loading: false,
  setLoading: () => {},
  // contact: {},
  setContacts: () => {},
  contacts: [],
  groups: [],
  // error: [],
  filteredContacts: [],
  searchContacts: () => {},
  onContactChange: () => {},
  createContactForm: () => {},
  // updateContactInfo: () => {},
  removeContact: () => {},
  // debounce: () => {},
  leadingDebounce: () => {},
});
