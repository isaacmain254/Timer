import React, { Component } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import PropTypes from "prop-types";

// project files import
import TimerButton from "./TimerButton";

export default class TimerForm extends Component {
  constructor(props) {
    super(props);

    const { id, title, project } = props;
    this.state = {
      title: id ? title : "",
      project: id ? project : "",
    };
  }

  // function to handle title change
  handleTitleChange = (title) => {
    this.setState({ title });
  };

  // function to handle project change
  handleProjectChange = (project) => {
    this.setState({ project });
  };

  // function to handle form submit
  handleSubmit = () => {
    const { onFormSubmit, id } = this.props;
    const { title, project } = this.state;
    onFormSubmit({ id, title, project });
  };

  // type checking with Prop Type
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    project: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
  };
  static defaultProps = {
    id: null,
    title: "",
    project: "",
  };
  render() {
    const { id, onFormClose } = this.props;
    const { title, project } = this.state;
    const SubmitText = id ? "Update" : "Create";

    return (
      <View style={styles.formContainer}>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Title</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleTitleChange}
              value={title}
            />
          </View>
        </View>
        <View style={styles.attributeContainer}>
          <Text style={styles.textInputTitle}>Project</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              underlineColorAndroid="transparent"
              onChangeText={this.handleProjectChange}
              value={project}
            />
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <TimerButton
            small
            color="#21ba45"
            title={SubmitText}
            onPress={this.handleSubmit}
          />
          <TimerButton
            small
            color="#db2828"
            title="Cancel"
            onPress={onFormClose}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: "#d6d7da",
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
