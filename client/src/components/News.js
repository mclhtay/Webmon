import React from "react";
import PropTypes from "prop-types";
import { handleViewportChange } from "../actions/utils";
import { connect } from "react-redux";

const News = ({ viewport: { viewport }, handleViewportChange }) => {
  const handleViewport = () => {
    handleViewportChange("main", "");
  };

  return (
    <div className={viewport === "news" ? "come-in modal-frame" : "blind"}>
      <div className="modal-content">
        <span className="close-modal" onClick={handleViewport} name="exit">
          &#10008;
        </span>
        <h1 className="modal-title styled-font">
          {" "}
          Welcome to Webmon! <span className="leader-font">Beta</span>
        </h1>{" "}
        <p>
          As a token of appreciation, all registered players should receive a
          gift of coins and candies in their gifting center! First ones to
          register should also contact the developer for a special beta tester
          exclusive.
        </p>
        <div>
          <h2 className="modal-header">The Pokédex: </h2>
          <p>
            In the Pokédex you can find all the pokémons that are available in
            Webmon, with where you can find them and their{" "}
            <span id="bp">Battle Power</span> potential, so make sure you check
            before you go on pokémon hunts{" "}
          </p>
        </div>
        <div>
          <h2 className="modal-header">Leaderboard: </h2>
          <p>
            The leaderboard will automatically update everytime there is a
            player's battle power surpassing those on the board, so always keep
            an eye on whether or not you can claim a spot. Players on the
            leaderboard will receive amazing rewards, open the leaderboard to
            check the details
          </p>
        </div>
        <div>
          <h2 className="modal-header">Poké Center: </h2>
          <p>
            In the Poké Center, you can choose which partner you want to
            accompany you and train in battles. This is also the place where you
            can use your candies to level up your pokémons.
          </p>
        </div>
        <div>
          <h2 className="modal-header">Battle Fields: </h2>
          <p>
            You will unlock new battle fields as your pokémons grow, specific
            requirements are in each battle field section. <br /> You can catch
            new pokémon or merge new pokémon with your current exisiting pokémon
            in each battle fields, or battle a strong wild pokémon to gain some
            rewards.
          </p>
        </div>
        <div>
          <h2 className="modal-header">Event Field: </h2>
          <p>
            Special Events run periodically and with the launch of the beta, you
            can now catch event exclusive Charizard Mega-X! Catch one and
            surpass your peers on the leaderboard!
          </p>
        </div>
        <div className="giveMeSomeSpace">
          If you have any questions or concerns feel free to contact the
          developer{" "}
          <a
            href="https://www.facebook.com/carter.jin.16"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

News.propTypes = {
  viewport: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  viewport: state.viewport,
});

export default connect(mapStateToProps, { handleViewportChange })(News);
