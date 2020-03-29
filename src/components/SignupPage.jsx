import React, { Component } from "react";
import {
  Container,
  TextField,
  FormHelperText,
  FormControl,
  Button
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

class SignupPage extends Component {
  state = {
    emailAddress: "",
    errorMessage: ""
  };

  handleSubmit = () => {
    this.setState({ didAttempt: true });
    if (!/^\S+@\S+\.\S+$/.test(this.state.emailAddress)) {
      this.setState({ errorMessage: "Invalid email" });
      return;
    }

    this.props
      .onSubmit({ email: this.state.emailAddress })
      .then(res => {
        switch (res.data.result) {
          case "created":
            window.location = "/success";
            break;
          case "exists":
            this.setState({ errorMessage: "Email already registered" });
            break;
          case "failed":
            break;
        }
        console.log(res.data.result);
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <Container
        style={{
          width: "100%",
          maxWidth: 800,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <h1 style={{ marginBottom: "2em" }}>
          Sign up for COVID-19 updates in Alabama!
        </h1>
        <FormControl
          fullWidth
          style={{ maxWidth: 600, margin: "0 auto" }}
          error={this.state.errorMessage.length}
        >
          <TextField
            label="Email Address"
            fullWidth
            value={this.state.emailAddress}
            onKeyPress={e => {
              if (e.key === "Enter") this.handleSubmit();
            }}
            onChange={e => this.setState({ emailAddress: e.target.value })}
          ></TextField>
          <FormHelperText>{this.state.errorMessage}</FormHelperText>
        </FormControl>
        <Button
          style={{ marginTop: "1em" }}
          onClick={this.handleSubmit}
          color="primary"
          variant="contained"
        >
          Sign Up
          <Send style={{ marginLeft: 8 }} />
        </Button>
      </Container>
    );
  }
}

export default SignupPage;
