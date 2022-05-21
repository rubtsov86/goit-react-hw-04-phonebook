import React from 'react';
import Phonebook from './Phonebook';
import ContactList from './ContactList';
import Filter from './Filter';
import { nanoid } from 'nanoid';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    console.log('componentDidMount');
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);

    if (parsedContacts) {
      this.setState({
        contacts: [...parsedContacts],
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    if (prevState.contacts !== this.state.contacts) {
      console.log('обновились контакты');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // componentWillUnmount() {
  //   console.log('componentWillUnmount');
  // }

  formSubmitHandler = data => {
    const find = this.state.contacts
      .map(({ name }) => name.toLowerCase())
      .includes(data.name.toLowerCase());

    find
      ? alert(`${data.name} is already in contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...data, id: nanoid() }],
        }));
  };

  handleInput = evt => {
    this.setState({
      [evt.currentTarget.name]: evt.currentTarget.value,
    });
  };

  deleteContact = evt => {
    const filter = evt.currentTarget.id;

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts.filter(contact => contact.id !== filter),
      ],
    }));
  };

  render() {
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
        <Phonebook onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onInput={this.handleInput} />

        <ContactList
          arrayOfNames={this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
          )}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
