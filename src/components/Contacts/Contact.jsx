import {
  PINK,
  FOREGROUND,
  ORANGE,
  PURPLE,
  GREEN,
  CYAN,
  RED,
} from "../../helpers/colors";

const Contact = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card my-2">
            <div className="card-body">
              <div className="row align-items-center d-flex justify-content-around ">
                <div className="col-md-4 col-sm-4">
                  <img
                    src="https://placehold.co/200"
                    alt=""
                    style={{ border: `px solid ${GREEN}` }}
                    className="img-fluid rounded"
                  ></img>
                </div>
                <div className="col-md-7 col-sm-7">
                  <ul className="list-group">
                    <li class="list-group-item list-group-item-dark">
                      Name: <span className="fw-bold"> Maryam Noroozi</span>
                    </li>
                    <li class="list-group-item list-group-item-dark">
                      Phone Number: <span className="fw-bold"> 6476191000</span>
                    </li>
                    <li class="list-group-item list-group-item-dark">
                      Email: <span className="fw-bold"> mm@bb.com</span>
                    </li>
                  </ul>
                </div>
                <div className="col-md-1 col-sm-1 d-flex flex-column align-item-center ">
                  <button
                    className="btn my-1 align-self-center"
                    style={{ backgroundColor: ORANGE }}
                  >
                    <i className="fa fa-eye" />
                  </button>
                  <button
                    className="btn my-1 align-self-center"
                    style={{ backgroundColor: CYAN }}
                  >
                    <i className="fa fa-pen" />
                  </button>
                  <button
                    className="btn my-1 align-self-center"
                    style={{ backgroundColor: PURPLE }}
                  >
                    <i className="fa fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
