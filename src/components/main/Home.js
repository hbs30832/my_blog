import React from "react";
import { axiosInstance } from "../../custom_axios";

function Home() {
  const uploadImage = (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    axiosInstance
      .post("/cats/upload/cats", form)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <input type="file" onChange={uploadImage} />
    </div>
  );
}

export default Home;
