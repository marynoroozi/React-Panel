import { Search } from "react-bootstrap-icons";

const SearchContact = ({ searchContact, query }) => {
  return (
    <>
      <form role="search">
        <div style={{ display: "flex" }}>
          <input
            className="form-control"
            type="search"
            onChange={searchContact}
            value={query}
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
