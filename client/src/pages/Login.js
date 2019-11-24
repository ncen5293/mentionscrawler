import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import LoginRegisterNavbar from "./LoginRegisterNavbar";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "25px"
  },
  formInput: {
    [`& fieldset`]: {
      borderRadius: "25px"
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const onSubmitHandler = event => {
    event.preventDefault();

    axios
      .post("http://localhost:4000/login", {
        username: event.target.email.value,
        password: event.target.password.value
      })
      .then(res => {
        if (res.data.success) {
          history.push("/dashboard");
        }
      });
  };
  return (
    <div>
      <LoginRegisterNavbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h4" variant="h4">
            Welcome Back!
          </Typography>
          <Typography component="h1">Login to your account</Typography>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              className={classes.formInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classes.formInput}
              InputProps={{ endAdornment: <Button>Forgot?</Button> }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
        </div>
        <Box mt={8}></Box>
      </Container>
    </div>
  );
};

export default Login;
