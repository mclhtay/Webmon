import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleViewportChange } from "../actions/utils";
import { claimGift } from "../actions/game";

const Gift = ({
  user: { name },
  player: { gifts, pokemons, bagSize },
  viewport: { viewport },
  handleViewportChange,
  claimGift,
}) => {
  const handleClaim = (_id) => {
    claimGift(name, _id);
  };
  const giftRows = gifts.map((g, i) => (
    <div key={i} className="row">
      <div className="col-lg-8 ma gift-bg">
        <p className="styled-font giveMeSomeSpace roll-bp">{g.gift.giftMsg}</p>
        <div>
          Congratulations! You received:{" "}
          {g.gift.giftType === "Reward" ? (
            <div>
              <i className="fas fa-coins" /> x {g.gift.giftContent.coins}
              &nbsp;&nbsp; and&nbsp;&nbsp;
              <i className="fas fa-candy-cane" /> x{g.gift.giftContent.candies}
              &nbsp;&nbsp; and&nbsp;&nbsp;
              <i className="fas fa-cookie-bite" /> x{g.gift.giftContent.cookies}
            </div>
          ) : (
            <div>
              {g.gift.giftContent.name[0].toUpperCase() +
                g.gift.giftContent.name.slice(1)}
              &nbsp;&nbsp;
              <img
                src={
                  "http://play.pokemonshowdown.com/sprites/ani/" +
                  g.gift.giftContent.name +
                  ".gif"
                }
                alt="gift"
              />
              &nbsp;&nbsp;
              <span className="giveMeSomeSpace">
                {" "}
                BP: {g.gift.giftContent.bp}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={(e) => handleClaim(g._id)}
          disabled={g.gift.giftType !== "Reward" && pokemons.length === bagSize}
          className="btn btn-sm btn-primary home-button"
        >
          {g.gift.giftType !== "Reward" && pokemons.length === bagSize
            ? "Bag Full"
            : "Claim"}
        </button>
      </div>
    </div>
  ));
  const handleViewport = () => {
    handleViewportChange("main", "");
  };

  return (
    <div className={viewport === "gift" ? "come-in modal-frame" : "blind"}>
      <div className="modal-content">
        <div className="modal-foreground">
          <h3 className="modal-title styled-font">Gift Center</h3>
          <span className="close-modal" onClick={handleViewport} name="exit">
            &#10008;
          </span>
          <div className="container">{giftRows}</div>
        </div>
      </div>
    </div>
  );
};

Gift.propTypes = {
  player: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  claimGift: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
  user: state.user,
  viewport: state.viewport,
});

export default connect(mapStateToProps, { handleViewportChange, claimGift })(
  Gift
);
