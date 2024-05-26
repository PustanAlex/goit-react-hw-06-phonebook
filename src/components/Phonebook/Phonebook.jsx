import AddContactInput from 'components/AddContactInput/AddContactInput';
import AddNumberInput from 'components/AddNumberInput/AddNumberInput';
import Contacts from 'components/Contacts/Contacts';
import style from './Phonebook.module.css';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useEffect } from 'react';

const Phonebook = () => {

    const [name, setName] = useState(localStorage.getItem('nameChange') || '');
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    const initialContacts = Array.isArray(storedContacts) ? storedContacts : [];
    const [contacts, setContacts] = useState(initialContacts);
    const [number, setNumber] = useState(localStorage.getItem('numberChange') || '');
    const [filter, setFilter] = useState('');


    useEffect( () => {
        localStorage.setItem('nameChange', name);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        localStorage.setItem('numberChange', number);
    }, [name, contacts, number]);

    const handleAddContact = () => {
        if (name.trim() !== '' && number.trim() !== '') {
            const existingContact = contacts.find(contact => contact.contactName === name || contact.phoneNumber === number)
            if (existingContact) {
                alert(`You already added this contact: ${existingContact.contactName} (${existingContact.phoneNumber})`);
            } else {
                const newContact = {
                    id: nanoid(),
                    contactName: name,
                    phoneNumber: number,
                } 
                setContacts([ ...contacts, newContact])
            }
            setName('')
            setNumber('')
        } 
    };

    const handleDeleteContact = (id) => {
        const updatedContactList = contacts.filter ( contact => contact.id !== id)
        setContacts(updatedContactList)
        localStorage.setItem('contact', JSON.stringify(updatedContactList));
    };

    const handleNameChange = e => {
        setName(e.target.value);
    };

    const handleNumberChange = e => {
        setNumber(e.target.value);
    };
    
    const handleContactFilter = e => {
        setFilter(e.target.value);
    };



  return (
    <div className={style.phonebook}>  
    <div className={style.addToContact}>
        <h2>Name</h2>
        <AddContactInput name={name} handleInputChange={handleNameChange}/>
        <AddNumberInput number={number}  handleNumberChange={handleNumberChange}/>
        <button onClick={handleAddContact}>Add Contact</button>
    </div>

    <div>
        <Contacts contacts={contacts} number={number} filter={filter} handleDeleteContact={handleDeleteContact} handleContactFilter={handleContactFilter}/>
    </div>

</div>
  );
};

export default Phonebook;
