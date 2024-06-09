import AddContactInput from 'components/AddContactInput/AddContactInput';
import AddNumberInput from 'components/AddNumberInput/AddNumberInput';
import Contacts from 'components/Contacts/Contacts';
import style from './Phonebook.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setName, setNumber, setFilter } from 'components/Redux/phonebookSlice';

const Phonebook = () => {

   const dispatch = useDispatch();
   const name = useSelector( state => state.contacts.name );
   const contacts = useSelector (state => state.contacts.contacts);
   const number = useSelector ( state => state.contacts.number);
   const filter = useSelector ( state => state.contacts.filter);

    const handleAddContact = () => {
        if (name.trim() !== '' && number.trim() !== '') {
            dispatch(addContact({ contactName: name, phoneNumber: number}));
            dispatch(setName(''));
            dispatch(setNumber(''));
        }
    }

    const handleDeleteContact = (id) => {
      dispatch(deleteContact(id));
    };

    const handleNameChange = e => {
        dispatch(setName(e.target.value));
    };

    const handleNumberChange = e => {
        dispatch(setNumber(e.target.value));
    };
    
    const handleContactFilter = e => {
        dispatch(setFilter(e.target.value));
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
