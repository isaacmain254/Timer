import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

// project files import
import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

export default class Timer extends Component {
  handleRemovePress = () => {
    const { id, onRemovePress } = this.props;
    onRemovePress(id);
  };

  // start timer on button press event handler
  handleStartPress = () => {
    const { id, onStartPress } = this.props;
    onStartPress(id);
  };

  // handle stop timer event
  handleStopPress = () => {
    const { id, onStopPress } = this.props;
    onStopPress(id);
  };

  // conditionally show start or stop button
  renderActionButton() {
    const { isRunning } = this.props;
    if (isRunning) {
      return (
        <TimerButton
          color="#db2828"
          title="stop"
          onPress={this.handleStopPress}
        />
      );
    }
    return (
      <TimerButton
        color="#21ba45"
        title="Start"
        onPress={this.handleStartPress}
      />
    );
  }

  // Type checking with PropTypes
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    elapsed: PropTypes.number.isRequired,
    isRunning: PropTypes.bool,
    onEditPress: PropTypes.func.isRequired,
    onRemovePress: PropTypes.func.isRequired,
    onStartPress: PropTypes.func.isRequired,
    onStopPress: PropTypes.func.isRequired,
  };

  render() {
    const { elapsed, title, project, onEditPress } = this.props;
    const elapsedString = millisecondsToHuman(elapsed);
    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{project}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" small title="Edit" onPress={onEditPress} />
          <TimerButton
            color="blue"
            small
            title="Remove"
            onPress={this.handleRemovePress}
          />
        </View>
        {/* <TimerButton color="#21ba45" title="Start" /> */}
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
