import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

export class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
  };

  async componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }

  // handle collapse
  handleToggle = () => this.setState({ open: !this.state.open });

  // toggle arrow down and up
  handleAngle = () =>
    this.state.open ? (
      <FontAwesomeIcon icon={faAngleUp} className="icon" />
    ) : (
      <FontAwesomeIcon icon={faAngleDown} className="icon" />
    );

  // handle onChange of checkbox
  handleChange = id => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    currentIndex === -1
      ? newChecked.push(id)
      : newChecked.splice(currentIndex, 1);

    this.props.handleFilters(newChecked);

    this.setState({ checked: newChecked });
  };

  // Render Checkboxes
  renderLists = () =>
    this.props.lists
      ? this.props.lists.map(item => (
          <ListItem key={item._id} style={{ padding: "10px 0" }}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleChange(item._id)}
                checked={this.state.checked.indexOf(item._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleToggle}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List disablePadding component="div">
              {this.renderLists()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
