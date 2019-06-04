import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import "./style.css"
const CLOUDINARY_UPLOAD_PRESET = 'hp8e1mzk';
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dl6ycbftz/image/upload";


class MyDropzone extends Component {

  state =
    {
      uploadedFileCloudinaryUrl: ''
    };

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
    console.log(this.props)
  }
  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.props.helper(this.state.uploadedFileCloudinaryUrl)
        
      }
    });
  }

  render() {

    return (
      <Dropzone
        onDrop={this.onImageDrop}
        accept="image/*"
        multiple={false}
        onChange={this.props.change}
        >
        {({ getRootProps, getInputProps }) => {
          return (
            <div
              className="drop-container"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {
                <p className="dropzone-text">Drag an image here or click here to upload</p>
              }
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                  <div>
                    <p>Preview of: {this.state.uploadedFile.name}</p>
                    <img className="pic-preview" alt="preview" src={this.state.uploadedFileCloudinaryUrl} />
                  </div>}
              </div>
            </div>
          )
        }}
      </Dropzone>)
  }
}

export default MyDropzone;