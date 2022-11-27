import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

//project files
import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

export default class ToggleableTimerForm extends Component {
  state = {
    isOpen: false,
  };
  // function that toggle the state of the form to open
  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  // hanlding form close
  handleFormClose = () => {
    this.setState({ isOpen: false });
  };
  // handle form submit
  handleFormSubmit = (timer) => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.setState({ isOpen: false });
  };

  // type checking with PropTypes
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };
  render() {
    const { isOpen } = this.state;
    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm
            onFormSubmit={this.props.onFormSubmit}
            onFormClose={this.handleFormClose}
          />
        ) : (
          <TimerButton title="+" color="black" onPress={this.handleFormOpen} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  buttonPadding: {
    paddingHorizontal: 15,
  },
});
