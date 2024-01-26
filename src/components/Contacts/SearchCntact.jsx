import { Search } from "react-bootstrap-icons";

const SearchContact = () => {
  return (
    <>
      <form role="search">
        <div style={{ display: "flex" }}>
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <span
            className="bi bi-search border rounded mx-1"
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
