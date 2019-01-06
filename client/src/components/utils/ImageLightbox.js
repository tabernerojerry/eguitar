import React, { Component } from "react";
import Lightbox from "react-images";

export class ImageLightbox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.images) {
      const images = [];

      // add src to images array to work on react-images lightbox
      props.images.forEach(image => images.push({ src: `${image}` }));

      state = { images };

      return state;
    }

    return false;
  }

  closeLightBox = () => this.props.onclose();

  gotoPrevious = () =>
    this.setState({ currentImage: this.state.currentImage - 1 });

  gotoNext = () => this.setState({ currentImage: this.state.currentImage + 1 });

  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightBox}
      />
    );
  }
}

export default ImageLightbox;
