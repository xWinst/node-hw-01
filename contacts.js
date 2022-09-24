const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'db/contacts.json');

const updateContacts = newData => {
    fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
};

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async contactId => {
    const data = await listContacts();
    const result = data.find(({ id }) => id === contactId);
    return result || null;
};

const removeContact = async contactId => {
    const data = await listContacts();
    const index = data.findIndex(({ id }) => id === contactId);
    if (index < 0) return null;
    const [result] = data.splice(index, 1);
    updateContacts(data);
    return result;
};

const addContact = async (name, email, phone) => {
    const newContact = { id: nanoid(), name, email, phone };
    const data = await listContacts();
    data.push(newContact);
    updateContacts(data);
    return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
