import React, { Component } from "react";

import ImageLigthBox from "../utils/ImageLightbox";

class ProductImage extends Component {
  state = {
    ligthbox: false,
    imagePosition: 0,
    ligthboxImages: []
  };

  componentDidMount() {
    const {
      detail: { images }
    } = this.props;

    if (images.length > 0) {
      let newLigthboxImages = [];

      images.forEach(item => newLigthboxImages.push(item.url));

      this.setState({ ligthboxImages: newLigthboxImages });
    }
  }

  // Display Main Image
  renderCardImage = images =>
    images.length > 0 ? images[0].url : "/images/image_not_available.png";

  // Display Thumbnail Images
  renderThumbsImage = images =>
    images.map((item, index) =>
      index > 0 ? (
        <div
          key={index}
          onClick={this.handleLightBox(index)}
          className="thumb"
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );

  // Open Lightbox
  handleLightBox = position => () => {
    if (this.state.ligthboxImages.length > 0) {
      this.setState({
        ligthbox: true,
        imagePosition: position
      });
    }
  };

  // Close Lightbox
  handleLightBoxClose = () => this.setState({ ligthbox: false });

  render() {
    const { detail } = this.props;

    return (
      <div className="product_image_container">
        <div className="main_pic" onClick={this.handleLightBox(0)}>
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
          />
        </div>
        <div className="main_thumbs">
          {this.renderThumbsImage(this.state.ligthboxImages)}
        </div>
        {this.state.ligthbox ? (
          <ImageLigthBox
            id={detail.id}
            images={this.state.ligthboxImages}
            open={this.state.open}
            pos={this.state.imagePosition}
            onclose={this.handleLightBoxClose}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductImage;
