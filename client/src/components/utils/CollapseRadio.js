import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";

export class CollapseRadio extends Component {
  state = {
    open: false,
    value: "0"
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

  handleChange = ({ target: { value } }) => {
    this.props.handleFilters(value);
    this.setState({ value });
  };

  renderLists = () =>
    this.props.lists
      ? this.props.lists.map(item => (
          <FormControlLabel
            key={item._id}
            value={`${item._id}`}
            control={<Radio />}
            label={item.name}
          />
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
              <RadioGroup
                arai-label="price"
                name="prices"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderLists()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
