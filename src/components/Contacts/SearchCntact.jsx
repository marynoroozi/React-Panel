import { Search } from "react-bootstrap-icons";
import { useContext } from "react";
import { contactContext } from "../../context/contactContext";

const SearchContact = () => {
  const { searchContacts } = useContext(contactContext);

  return (
    <>
      <form role="search">
        <div style={{ display: "flex" }}>
          <input
            className="form-control"
            type="search"
            onChange={(e) => searchContacts(e.target.value)}
            placeholder="Search"
            aria-label="Search"
          />
          <span
            className="border rounded mx-1"
            style={{
              color: "greenyellow",
              width: 57,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Search />
          </span>
        </div>
      </form>
    </>
  );
};

export default SearchContact;
