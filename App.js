import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// import project files
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import { newTimer } from "./utils/TimerUtils";

export default class App extends Component {
  state = {
    timers: [
      {
        title: "Mow the lawn",
        project: "House Chores",
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: "Bake squash",
        project: "Kitchen Chores",
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      },
    ],
  };
  handleCreateFormSubmit = (timer) => {
    const { timers } = this.state;

    this.setState({ timers: [newTimer(timer), ...timers] });
  };

  // handle form submit after edit
  handleFormSubmit = (attrs) => {
    const { timers } = this.state;

    this.setState({
      timers: timers.map((timer) => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
          };
        }
        return timer;
      }),
    });
  };

  // Remove a timer
  handleRemovePress = (timerId) => {
    this.setState({
      timers: this.state.timers.filter((t) => t.id !== timerId),
    });
  };

  componentDidMount() {
    const TIME_INTERVAL = 1000;
    this.intervalid = setInterval(() => {
      const { timers } = this.state;

      this.setState({
        timers: timers.map((timer) => {
          const { elapsed, isRuning } = timer;
          return {
            ...timer,
            elapsed: isRuning ? elapsed + TIME_INTERVAL : elapsed,
          };
        }),
      });
    }, TIME_INTERVAL);
  }

  // unmounting/removing  the timer
  componentWillUnmount() {
    clearInterval(this.intervalid);
  }

  // toggle timer
  toggleTimer = (timerId) => {
    this.setState((prevState) => {
      const { timers } = prevState;
      return {
        timers: timers.map((timer) => {
          const { id, isRuning } = timer;

          if (id === timerId) {
            return {
              ...timer,
              isRuning: !isRuning,
            };
          }
          return timer;
        }),
      };
    });
  };

  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <KeyboardAvoidingView style={styles.timerListContainer}>
          <ScrollView style={styles.timerList}>
            <ToggleableTimerForm
              isOpen={true}
              onFormSubmit={this.handleCreateFormSubmit}
            />
            {timers.map(({ title, project, id, elapsed, isRuning }) => (
              <EditableTimer
                key={id}
                id={id}
                title={title}
                project={project}
                elapsed={elapsed}
                isRunning={isRuning}
                onFormSubmit={this.handleFormSubmit}
                onRemovePress={this.handleRemovePress}
                onStartPress={this.toggleTimer}
                onStopPress={this.toggleTimer}
              />
            ))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d7da",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerList: {
    paddingBottom: 15,
  },
  timerListContainer: {
    flex: 1,
  },
});
