import React, { Component } from "react";
import { Container, Button } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";

class SuccessPage extends Component {
  state = {};
  render() {
    return (
      <Container
        style={{
          width: "100%",
          height: "100vh",
          background: "green",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <CheckCircle style={{ fontSize: 100, color: "white" }} />
        <h1 style={{ color: "white" }}>You're on the list!</h1>
        <Button
          onClick={() => (window.location = "/")}
          variant="contained"
          style={{ background: "#fff" }}
        >
          Back to the Site
        </Button>
      </Container>
    );
  }
}

export default SuccessPage;
