import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../spinner.gif";
import { handleViewportChange } from "../../actions/utils";
import { loadRanking } from "../../actions/master";
const Ranking = ({
  viewport: { viewport, secondary },
  master: {
    ranking: { rank, loading },
  },
  handleViewportChange,
  loadRanking,
}) => {
  useEffect(() => {
    if (loading && viewport === "master" && secondary === "ranking") {
      loadRanking();
    }
  }, [loading, secondary, viewport, loadRanking]);

  if (loading) {
    return (
      <div>
        <img src={Spinner} alt="loading" />
      </div>
    );
  }
  const list = rank.ranking.map((x, y) => (
    <div key={y} className="p20-0">
      <span className="styled-font ranking-font"> {y + 1}</span>
      <span className="modal-btn">{x.nickname}</span>
      <span>MP: {x.MP}</span>
    </div>
  ));

  return <div>{!loading && <div className="column"> {list}</div>}</div>;
};

Ranking.propTypes = {
  handleViewportChange: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
  master: PropTypes.object.isRequired,
  loadRanking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
  master: state.master,
});

export default connect(mapStateToProps, { handleViewportChange, loadRanking })(
  Ranking
);
