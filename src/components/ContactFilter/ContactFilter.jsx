const ContactFilter = ({handleContactFilter}) => {
    return (
        <div>
        <p>Find contacts by name</p>
        <input
            type="text"
            name="filter"
            title="Contact Filter"
            required
            onChange={handleContactFilter}
            placeholder="Search contact"
        />
    </div>
    )
}

export default ContactFilter;