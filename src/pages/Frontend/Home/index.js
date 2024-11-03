import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-6 p-0 pt-2 pb-2">
          <Link to="/catagories/khari">
            <div className="jumbotron jumbotron-fluid bg-image1 hover-effect">
              <div className="container text-center d-flex justify-content-center align-items-center">
                <h1 className="display-4">Khari</h1>
              </div>
            </div>
          </Link>
          <Link to="/catagories/fastFood">
            <div className="jumbotron jumbotron-fluid bg-image2 hover-effect">
              <div className="container text-center d-flex justify-content-center align-items-center">
                <h1 className="display-4">Fast Food</h1>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-6 p-0 pt-2 pb-2">
          <Link to="/catagories/barBQ">
            <div className="jumbotron jumbotron-fluid bg-image3 hover-effect">
              <div className="container text-center d-flex justify-content-center align-items-center">
                <h1 className="display-4">Bar BQ</h1>
              </div>
            </div>
          </Link>
          <Link to="/catagories/beverges">
            <div className="jumbotron jumbotron-fluid bg-image4 hover-effect">
              <div className="container text-center d-flex justify-content-center align-items-center">
                <h1 className="display-4">Beverges</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
};

export default App;
