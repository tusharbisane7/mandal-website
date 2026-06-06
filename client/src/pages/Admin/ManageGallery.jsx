import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

function ManageGallery() {
  const [images, setImages] =
    useState([]);

  const [imageUrl, setImageUrl] =
    useState("");

  useEffect(() => {
    const savedImages =
      JSON.parse(
        localStorage.getItem(
          "galleryImages"
        )
      ) || [];

    setImages(savedImages);
  }, []);

  const addImage = () => {
    if (!imageUrl) {
      alert(
        "Please Enter Image URL"
      );
      return;
    }

    const newImages = [
      ...images,
      {
        id: Date.now(),
        image: imageUrl,
      },
    ];

    setImages(newImages);

    localStorage.setItem(
      "galleryImages",
      JSON.stringify(
        newImages
      )
    );

    setImageUrl("");
  };

  const deleteImage = (
    id
  ) => {
    const updatedImages =
      images.filter(
        (img) =>
          img.id !== id
      );

    setImages(
      updatedImages
    );

    localStorage.setItem(
      "galleryImages",
      JSON.stringify(
        updatedImages
      )
    );
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          Manage Gallery
        </h1>

        <input
          type="text"
          placeholder="Paste Image URL"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(
              e.target.value
            )
          }
        />

        <button
          onClick={addImage}
        >
          Add Image
        </button>

        <div
          style={{
            display:
              "flex",
            flexWrap:
              "wrap",
            gap: "20px",
            marginTop:
              "20px",
          }}
        >
          {images.map(
            (img) => (
              <div
                key={img.id}
              >
                <img
                  src={
                    img.image
                  }
                  alt=""
                  width="250"
                  height="200"
                  style={{
                    objectFit:
                      "cover",
                  }}
                />

                <br />
                <br />

                <button
                  onClick={() =>
                    deleteImage(
                      img.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>

      </div>
    </>
  );
}

export default ManageGallery;