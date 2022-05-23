import React, { useEffect, useState } from 'react';
import Phonebook from './Phonebook';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

const data = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const [contacts, setContacts] = useState(data);
  const [filter, setFilter] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    setFirstRender(false);
    const savedContacts = localStorage.getItem('contacts');

    if (!savedContacts) {
      return;
    }

    const parsedContacts = JSON.parse(savedContacts);
    setContacts([...parsedContacts]);
  }, []);

  useEffect(() => {
    if (firstRender) {
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts, firstRender]);

  const handleInput = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = evt => {
    const filter = evt.currentTarget.id;
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== filter)
    );
  };

  const formSubmitHandler = data => {
    const find = contacts
      .map(({ name }) => name.toLowerCase())
      .includes(data.name.toLowerCase());

    find
      ? alert(`${data.name} is already in contacts`)
      : setContacts(prevState => [...prevState, { ...data, id: nanoid() }]);
  };

  return (
    <div
      style={{
        // height: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontSize: 40,
        paddingLeft: 20,
        textTransform: 'uppercase',
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <Phonebook onSubmit={formSubmitHandler} />

      <h2>Contacts</h2>
      <Filter filter={filter} onInput={handleInput} />

      <ContactList
        arrayOfNames={contacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )}
        deleteContact={deleteContact}
      />
    </div>
  );
}
