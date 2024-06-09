import { createSlice, nanoid } from '@reduxjs/toolkit';

const phonebookSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: JSON.parse(localStorage.getItem('contacts')) || [],
        name: localStorage.getItem('nameChange') || '',
        number: localStorage.getItem('numberChange') || '',
        filter: '',
    },
    reducers: {
        addContact: (state, action) => {
            const { contactName, phoneNumber } = action.payload;
            const existingContact = state.contacts.find(contact => contact.contactName === contactName || contact.phoneNumber === phoneNumber);
            if (existingContact) {
                const existisingContactNumber = `(${existingContact.phoneNumber.slice(0, 4)}) ${existingContact.phoneNumber.slice(3, 6)} - ${existingContact.phoneNumber.slice(6, 9)}`
                alert(`You have already added this contact: ${existingContact.contactName} ${existisingContactNumber}`);
            } else {
                state.contacts.push({
                    id: nanoid(),
                    contactName,
                    phoneNumber,
                });
                localStorage.setItem('contacts', JSON.stringify(state.contacts));
            }
        },
        deleteContact: (state, action) => {
            const updatedContacts = state.contacts.filter(contact => contact.id !== action.payload);
            state.contacts = updatedContacts;
            localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        },
        setName: (state, action) => {
            state.name = action.payload;
            localStorage.setItem('nameChange', state.name);
        },
        setNumber: (state, action) => {
            state.number = action.payload;
            localStorage.setItem('numberChange', state.number);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addContact, deleteContact, setName, setNumber, setFilter } = phonebookSlice.actions;

export default phonebookSlice.reducer;
