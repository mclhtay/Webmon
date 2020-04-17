import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import { submitCode } from "../actions/game";
const Admin = ({
  handleViewportChange,
  submitCode,
  viewport: { viewport },
  user: { name, msg },
}) => {
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCode(code, name);
  };
  const handleViewport = () => {
    handleViewportChange("main", "");
  };
  return (
    <div className={viewport === "admin" ? "come-in modal-frame" : "blind"}>
      <div className="modal-content">
        <div className="modal-foreground">
          <h3 className="modal-title styled-font">Admin</h3>
          <span className="close-modal" onClick={handleViewport} name="exit">
            &#10008;
          </span>
          <form onSubmit={(e) => handleSubmit(e)}>
            <h4>{msg}</h4>
            <input value={code} onChange={(e) => setCode(e.target.value)} />
            <button type="submit" className="btn btn-sm btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Admin.propTypes = {
  user: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
  submitCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  viewport: state.viewport,
});

export default connect(mapStateToProps, { handleViewportChange, submitCode })(
  Admin
);
