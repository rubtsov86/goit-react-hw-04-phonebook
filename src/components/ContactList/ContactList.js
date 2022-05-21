import ContactListItem from '../ContactListItem';
import React from 'react';
import PropTypes from 'prop-types';

const ContactList = ({ arrayOfNames, deleteContact }) => {
  return (
    <ul>
      {arrayOfNames.map(({ name, number, id }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          deleteContact={deleteContact}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  arrayOfNames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
