import React, { PureComponent } from "react";
import axios from "axios";
const url = "https://shrinkpdf.com";

// id session
function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

// id upload
function randomString() {
  for (
    var t = "0123456789abcdefghiklmnopqrstuvwxyz", e = 16, i = "", n = 0;
    e > n;
    n++
  ) {
    var a = Math.floor(Math.random() * t.length);
    i += t.substring(a, a + 1);
  }
  return i;
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      compressFile: null,
      uploadProgress: false,
      id: null,
      uploadId: null,
      fileName: "",
    };
  }

  handleUpload = (file) => {
    if (file) {
      const formData = new FormData();
      const id = randomString();
      const uploadId = "qibgl5ikzekmny71";
      formData.append("file", file[0]);
      formData.append("name", file[0]?.name);
      formData.append("id", id);
      this.setState({ uploadProgress: true });
      axios
        .post(`${url}/upload/${uploadId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) =>
          this.setState({
            file: file[0],
            compressFile: res.data,
            uploadProgress: false,
            id: id,
            uploadId: uploadId,
            fileName: res.data.data.file,
          })
        );
    }
  };

  render() {
    return (
      <>
        <input
          type="file"
          onChange={(e) => this.handleUpload(e.target.files)}
        />

        {this.state.uploadProgress && (
          <>
            <h3>Loading....</h3>
          </>
        )}

        <h2>File before upload</h2>
        <ul>
          <li>name : {this.state.file?.name}</li>
          <li>zie : {this.state.file?.size / 1000} kb</li>
        </ul>
        <h2>File after upload</h2>
        <ul>
          <li>name : {this.state.compressFile?.data?.file}</li>
          <li>zie : {this.state.compressFile?.data?.file_size_human}</li>
          <li>
            link :{" "}
            <a
              href={`${url}/download/${this.state.uploadId}/o_1f50d371a5uk5j7bbd19hp1hfqg/${this.state.fileName}`}
            >
              Download file
            </a>
          </li>
        </ul>
      </>
    );
  }
}

export default App;
