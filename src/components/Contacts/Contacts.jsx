import ContactFilter from 'components/ContactFilter/ContactFilter';
import style from './Contacts.module.css';

const Contacts = ({handleContactFilter, handleDeleteContact,contacts, filter}) => {

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 4)}) ${phoneNumber.slice(3, 6)} - ${phoneNumber.slice(6, 9)}`;
    };

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        } else {
            const filteredByName = contacts.filter( contact => contact.contactName.toLowerCase().includes(filter.toLowerCase()));
            const filteredByNumber = contacts.filter( contact => contact.phoneNumber.includes(filter));
            const filteredContacts = [...filteredByName, ...filteredByNumber];
            return filteredContacts;
        }
    };

    const filteredContacts = getFilteredContacts();

    return (
        <div className={style.contacts}>
        <h2>Contacts</h2>
        <ContactFilter handleContactFilter={handleContactFilter}/>
        <ul className={style.contacts}>
            {Array.isArray(filteredContacts) && filteredContacts.map(contact => (
                <li key={contact.id}>
                    {contact.contactName}: {formatPhoneNumber(contact.phoneNumber)}<button onClick={() => handleDeleteContact(contact.id)}>Delete Contact</button>
                </li>
            ))}
        </ul>
    </div>
    )
}

export default Contacts;
