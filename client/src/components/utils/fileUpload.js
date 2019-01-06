import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

export class FileUpload extends Component {
  state = {
    uploadedFiles: [],
    uploading: false
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
      "/api/users/uploadimage",
      formData,
      config
    );

    //console.log(data);

    await this.setState({
      uploading: false,
      uploadedFiles: [...this.state.uploadedFiles, data]
    });

    this.props.uploadImagesHandler(this.state.uploadedFiles);
  };

  // Display uploaded images to UI
  showUploadedImages = () =>
    this.state.uploadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={this.removeImage(item.public_id)}
        style={{ cursor: "pointer" }}
      >
        <div
          className="wrap"
          style={{ background: `url(${item.url}) no-repeat` }}
        />
      </div>
    ));

  // Delete Uploaded Images from Cloudinary
  removeImage = id => async () => {
    await axios.get(`/api/users/removeimage?public_id=${id}`);

    let images = this.state.uploadedFiles.filter(item => item.public_id !== id);

    await this.setState({ uploadedFiles: images });

    this.props.uploadImagesHandler(images);
  };

  // Update uploadedFiles state to empty array when Form successfully submitted
  static getDerivedStateFromProps = (props, state) => {
    if (props.reset) {
      state = {
        uploadedFiles: []
      };
      return state;
    }

    return null;
  };

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <Dropzone
              onDrop={this.onDrop}
              multiple={false}
              className="dropzone_box"
            >
              <div className="wrap" style={{ cursor: "pointer" }}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
            </Dropzone>

            {this.showUploadedImages()}

            {this.state.uploading && (
              <div
                className="dropzone_box"
                style={{ textAlign: "center", paddingTop: "60px" }}
              >
                <CircularProgress style={{ color: "#00bcd4" }} thickness={7} />
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
