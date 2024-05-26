const AddNumberInput = ({number, handleNumberChange}) => {
    return (
        <input
        type="tel"
        name="number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
        placeholder="Add phone number"
        onKeyDown={(e) => {
            if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        }}
    />
);
}

export default AddNumberInput;