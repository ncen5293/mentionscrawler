import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { withSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  bodyContainer: {
    backgroundColor: "#fafbff",
    height: "100vh",
    padding: "5vh"
  },
  companyContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  companyTitle: {
    fontSize: "20px"
  },
  userEmailInput: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5vh"
  },
  emailTitle: {
    marginleft: "1vh",
    fontSize: "20px"
  },
  companyNameInput: {
    border: "none",
    width: "600px",
    outline: "none",
    height: "25px"
  },
  companyNamesContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: "2vh",
    width: "600px"
  },
  buttonAdornment: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    width: "70px",
    height: "30px"
  },
  companyInputForm: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: "10px",
    width: "600px",
    alignItems: "center"
  },
  listOfCompanies: {
    borderRadius: "25px",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    margin: "1vh",
    border: "1px solid #eeeeef",
    padding: " 10px ",
    width: "600px",
    marginLeft: "258px",
    alignItems: "center"
  },
  error: {
    color: "red",
    display: "flex",
    justifyContent: "center"
  },
  listOfInputs: {
    display: "flex",
    flexDirection: "column"
  },
  companyEmailInput: {
    width: "600px",
    outline: "none",
    backgroundColor: "white",
    height: "25px",
    border: "1px solid #eeeeef",
    borderRadius: "25px",
    alignItems: "center",
    padding: "10px"
  },
  saveButton: {
    backgroundColor: "#6583f2 ",
    borderRadius: "25px",
    color: "white",
    fontSize: "15px",
    marginLeft: "5vh",
    width: "90px",
    height: "35px"
  }
}));

const SettingsBody = ({ enqueueSnackbar }) => {
  const classes = useStyles();
  const history = useHistory();
  const [companyNameSaveError, setCompanyNameSaveError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [companyNameInput, setCompanyNameInput] = useState("");

  useEffect(() => {
    axios
      .get(`/settings/${localStorage.getItem("email")}/company`)
      .then(res => setCompanyNames(res.data.companies));
  }, []);

  const onClickHandler = event => {
    event.preventDefault();
    if (companyNames.length > 0) {
      history.push("/dashboard");
    } else {
      setCompanyNameSaveError("Add at least one company name");
    }
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    event.persist();
    if (companyNames.includes(event.target.companyName.value)) {
      setCompanyNameError("Company Name already exists");
    } else {
      axios
        .put(
          `/settings/${localStorage.getItem("email")}/company/${
            event.target.companyName.value
          }`
        )
        .then(() => enqueueSnackbar("Successfully fetched the data."))
        .catch(() => enqueueSnackbar("Failed fetching data."));
      setCompanyNames([...companyNames, event.target.companyName.value]);
    }

    setCompanyNameInput("");
  };

  const onAddHandler = () => {
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };
  const onRemoveHandler = name => {
    setCompanyNames(companyNames.filter(item => item !== name));
    axios.delete(`/settings/${localStorage.getItem("email")}/company/${name}`);
    setCompanyNameError("");
    setCompanyNameSaveError("");
  };

  return (
    <div className={classes.bodyContainer}>
      <div className={classes.companyContainer}>
        <div className={classes.companyTitle}>
          <b>Your company</b>
        </div>

        <div className={classes.companyNamesContainer}>
          <form onSubmit={onSubmitHandler} className={classes.companyInputForm}>
            <input
              type="text"
              placeholder="Add Company name"
              title="Add a tag"
              value={companyNameInput}
              id="companyName"
              onChange={event => setCompanyNameInput(event.target.value)}
              className={classes.companyNameInput}
            />

            <button onClick={onAddHandler} className={classes.buttonAdornment}>
              <b> ADD</b>
            </button>
          </form>
        </div>
      </div>
      {companyNames.length > 0 &&
        companyNames.map((company, index) => {
          return (
            <div className={classes.listOfCompanies}>
              <span className="" key={index}>
                {company}
              </span>
              <button
                onClick={() => onRemoveHandler(company)}
                className={classes.buttonAdornment}
              >
                <b> REMOVE</b>
              </button>
            </div>
          );
        })}
      <p className={classes.error}>{companyNameError}</p>

      <div className={classes.userEmailInput}>
        {" "}
        <b className={classes.emailTitle}>Weekly report </b>
        <span className={classes.companyEmailInput}>
          {" "}
          {localStorage.getItem("email")}
        </span>
      </div>

      <p className={classes.error}>{companyNameSaveError}</p>
      <button onClick={onClickHandler} className={classes.saveButton}>
        <b> SAVE</b>
      </button>
    </div>
  );
};

export default withSnackbar(SettingsBody);
