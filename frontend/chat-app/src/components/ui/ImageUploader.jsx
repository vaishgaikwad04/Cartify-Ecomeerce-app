import React from "react";

const ImageUploader = ({ onChange }) => {
  return (
    <div>
      <input type="file" multiple onChange={onChange} />
    </div>
  );
};

export default ImageUploader;