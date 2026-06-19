// export default function ImageUpload({ setImage }) {
//   return (
//     <div>
//       <label style={{ display: "block", marginBottom: "5px" }}>1. Upload Image:</label>
//       <input 
//         type="file" 
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])} 
//       />
//     </div>
//   );
// }

// export default function ImageUpload({ setImage }) {
//   return (
//     <div>
//       <label><b>1. Upload Image</b></label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setImage(e.target.files[0])}
//       />
//     </div>
//   );
// }


import { useState } from "react";

export default function ImageUpload({ setImage }) {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <label><b>1. Upload Image</b></label>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
      />

      {preview && (
        <div
          style={{
            marginTop: "12px",
            width: "150px",
            height: "150px",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          <img
            src={preview}
            alt="Selected preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        </div>
      )}
    </div>
  );
}
