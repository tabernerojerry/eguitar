import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

import UserLayout from "../../../hoc/UserLayout";

export class AddFile extends Component {
  state = {
    formSuccess: false,
    formError: false,
    uploading: false,
    files: []
  };

  // Dropzone Upload images to Cloudinary
  onDrop = async ([file]) => {
    this.setState({ uploading: true });

    let formData = new FormData();

    const config = {
      header: {
        "content-type": "multipart/form-data"
      }
    };

    formData.append("file", file);

    const { data } = await axios.post(
      "/api/users/uploadFile",
      formData,
      config
    );
    console.log(data);

    if (data.success) {
      this.setState(
        {
          uploading: false,
          formSuccess: true,
          formError: false
        },
        () => setTimeout(() => this.setState({ formSuccess: false }), 2000)
      );
    }
  };

  async componentDidMount() {
    const { data } = await axios.get("/api/users/adminFiles");
    console.log(data);
    this.setState({ files: data });
  }

  render() {
    return (
      <UserLayout>
        <div className=" clear">
          <h1>Upload File</h1>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
            className="dropzone_box"
          >
            <div className="wrap" style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </div>
          </Dropzone>
          {this.state.uploading && (
            <div
              className="dropzone_box"
              style={{ textAlign: "center", paddingTop: "60px" }}
            >
              <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
            </div>
          )}
        </div>
        <div>
          {this.state.formError && (
            <div className="error_label">Please Check your data.</div>
          )}
          {this.state.formSuccess && (
            <div className="form_success">Success!</div>
          )}
        </div>
        <hr />
        <div>
          {this.state.files.images
            ? this.state.files.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  style={{ width: "200px", paddingLeft: "4px" }}
                />
              ))
            : null}
        </div>
      </UserLayout>
    );
  }
}

export default AddFile;
