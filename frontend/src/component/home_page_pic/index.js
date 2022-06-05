import React, { useState } from "react";
import axios from "axios";
function Getphotosmain() {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");



const








  const addImage = (method, http, id) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Data Pirates");
    data.append("cloud_name", "doxxh3kej");
    fetch("https://api.cloudinary.com/v1_1/doxxh3kej/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        axios(http, {
          method: method,
          data: {
            url: data.url,
            product_Id: id,
          },
        })
          .then((resulat) => {
            console.log(resulat);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <button
          onClick={() => {
            addImage("post", `http://localhost:5000/Homeiteams/${10}`, 5);
          }}
        >
          update
        </button>
      </div>
    </div>
  );
}
export default Getphotosmain;
