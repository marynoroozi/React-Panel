import axios from "axios";
const contactServer_url = "http://localhost:9000";


// @desc Get All Contacts
// @route GET http://localhost:9000/contacts
export const getAllContacts = () => {
  const url = `${contactServer_url}/contacts`;
  return axios.get(url);
};

// @desc Get Contact With Contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const getContact = (contactId) => {
  const url = `${contactServer_url}/contacts/${contactId}`;
  return axios.get(url);
};

// @desc Get All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = () => {
  const url = `${contactServer_url}/groups`;
  return axios.get(url);
};

// @desc Get Group With Group ID
// @route GET http://localhost:9000/groups
export const getGroup = (groupId) => {
  const url = `${contactServer_url}/groups/${groupId}`;
  return axios.get(url);
};

// @desc Create New Contact
// @route GET http://localhost:9000/contacts
export const createContact = (contact) => {
  const url = `${contactServer_url}/contacts`;
  return axios.post(url, contact);
};

// @desc Update a Contact with Contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const updateContact = (contactId, contact) => {
  const url = `${contactServer_url}/contacts/${contactId}`;
  return axios.get(url, contact);
};

// @desc Delete a Contact with a Contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
  const url = `${contactServer_url}/contacts/${contactId}`;
  return axios.get(url);
};

