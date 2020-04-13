import React, { useState, Fragment } from "react";
import "./styles.css";
import spinner from "./spinner.gif";
import { createPlayer } from "../actions/game";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const InitializeComponent = ({ player: { msg }, username, createPlayer }) => {
  const [initialData, setData] = useState({
    username: username,
    nickname: "",
    gender: "",
    starter: "",
  });

  const [inputs, setInputs] = useState({
    nicknameSelected: false,
    genderSelected: false,
    starterSelected: false,
  });
  const { nicknameSelected, genderSelected, starterSelected } = inputs;
  const { nickname, gender, starter } = initialData;

  const changeHandler = (e) => {
    setData({
      ...initialData,
      [e.target.name]: e.target.value,
    });
  };
  const submitNickname = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      nicknameSelected: true,
    });
  };

  const submitGender = (sex) => {
    setData({
      ...initialData,
      gender: sex,
    });
    setInputs({
      ...inputs,
      genderSelected: true,
    });
  };

  const handleClick = (name) => {
    setData({
      ...initialData,
      starter: name,
    });
  };

  const submitStarter = (e) => {
    e.preventDefault();
    setInputs({
      ...inputs,
      starterSelected: true,
    });

    createPlayer(initialData);
  };

  const handleFinish = (e) => {};

  return (
    <div className="home-container">
      <h1 className="styled-font">Welcome Trainer</h1>
      <h3 className="styled-font">
        {msg ? "You're all set!" : "Let's get you set up!"}
      </h3>
      <div className={nicknameSelected ? "blind" : "come-in initialize-comp"}>
        <form onSubmit={(e) => submitNickname(e)}>
          <h4 className="styled-font">What should we call you?</h4>
          <input
            value={nickname}
            name="nickname"
            className="styled-font initialize-nickname"
            minLength="3"
            maxLength="12"
            placeholder="Nickname"
            onChange={changeHandler}
            required
            autoFocus
          />

          <button type="submit" className="btn-primary home-button btn-lg">
            Confirm!
          </button>
        </form>
      </div>
      <div
        className={
          nicknameSelected && !genderSelected ? "initialize-gender" : "blind"
        }
      >
        <h4 className="styled-font" style={{ margin: "auto" }}>
          Are you a boy or a girl?
        </h4>
        <div
          name="male"
          title={gender}
          onClick={(e) => submitGender("male")}
          className={nicknameSelected ? "come-in-left trainer" : ""}
        >
          <img
            className="trainer-sprite1"
            src="https://marriland.com/wp-content/uploads/2019/06/Player_Character_Boy_Official_Art-258x600.png"
            alt="male trainer"
          />
        </div>
        <div
          name="female"
          title={gender}
          onClick={(e) => submitGender("female")}
          className={nicknameSelected ? "come-in-right trainer" : ""}
        >
          <img
            className="trainer-sprite2"
            src="https://cdn.bulbagarden.net/upload/thumb/5/5e/Sword_Shield_Female_Trainer.png/170px-Sword_Shield_Female_Trainer.png"
            alt="female trainer"
          />
        </div>
      </div>
      <div
        className={
          nicknameSelected && genderSelected && !starterSelected
            ? "initialize-comp"
            : "blind"
        }
      >
        <h4 className="styled-font">Choose Your Starter!</h4>
        <div
          id="starter"
          name="starter"
          className={nicknameSelected && genderSelected ? "come-in" : ""}
        >
          <form onSubmit={(e) => submitStarter(e)} className="flex">
            <span>
              <h5>Charmander</h5>
              <img
                onClick={(e) => handleClick("charmander")}
                className={
                  starter === "charmander" ? "selected starter" : "starter"
                }
                src="http://play.pokemonshowdown.com/sprites/ani/charmander.gif"
                alt="pokeball"
                height="100px"
                width="100px"
              />
            </span>
            <span>
              <h5>Squirtle</h5>
              <img
                onClick={(e) => handleClick("squirtle")}
                className={
                  starter === "squirtle" ? "selected starter" : "starter"
                }
                src="http://play.pokemonshowdown.com/sprites/ani/squirtle.gif"
                alt="pokeball"
                height="100px"
                width="100px"
              />
            </span>
            <span>
              <h5>Bulbasaur</h5>
              <img
                onClick={(e) => handleClick("bulbasaur")}
                className={
                  starter === "bulbasaur" ? "selected starter" : "starter"
                }
                src="http://play.pokemonshowdown.com/sprites/ani/bulbasaur.gif"
                alt="pokeball"
                height="100px"
                width="100px"
              />
            </span>
            <span style={{ flexBasis: "100%", height: "0" }} />
            <button
              className={starter ? "btn-lg btn-primary home-button" : "blind"}
              type="submit"
            >
              Start!
            </button>
          </form>
        </div>
      </div>
      <div className={starterSelected ? "initialize-comp" : "blind"}>
        {msg ? (
          <form onSubmit={(e) => handleFinish(e)}>
            <button className="btn btn-lg btn-primary finish-button home-button">
              Log in to continue
            </button>
          </form>
        ) : (
          <Fragment>
            <img src={spinner} alt="loading" />{" "}
            <h4 className="styled-font">
              Hold on, we're creating your profile
            </h4>
          </Fragment>
        )}
      </div>
    </div>
  );
};

InitializeComponent.propTypes = {
  player: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  createPlayer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});
export default connect(mapStateToProps, { createPlayer })(InitializeComponent);
