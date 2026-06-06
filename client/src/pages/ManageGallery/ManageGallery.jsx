import { useEffect, useState } from "react";
import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

function ManageGallery() {
  const [images, setImages] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const loadImages =
    async () => {
      try {
        const res =
          await API.get(
            "/gallery"
          );

        setImages(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadImages();
  }, []);

  const addImage =
    async () => {
      try {
        if (
          !title ||
          !imageUrl
        ) {
          alert(
            "Please Enter Title and Image URL"
          );
          return;
        }

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/gallery",
          {
            title,
            imageUrl,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Image Added Successfully"
        );

        setTitle("");
        setImageUrl("");

        loadImages();

      } catch (error) {
        console.log(error);
        alert(
          "Failed To Add Image"
        );
      }
    };

  const deleteImage =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/gallery/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Image Deleted"
        );

        loadImages();

      } catch (error) {
        console.log(error);
      }
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
          placeholder="Image Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <br />
        <br />

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

        <br />
        <br />

        <button
          onClick={
            addImage
          }
        >
          Add Image
        </button>

        <hr />

        <div
          style={{
            display:
              "flex",
            flexWrap:
              "wrap",
            gap: "20px",
          }}
        >
          {images.map(
            (img) => (
              <div
                key={
                  img.id
                }
                style={{
                  border:
                    "1px solid #ddd",
                  padding:
                    "10px",
                }}
              >
                <img
                  src={
                    img.imageUrl
                  }
                  alt=""
                  width="250"
                  height="200"
                  style={{
                    objectFit:
                      "cover",
                  }}
                />

                <h4>
                  {
                    img.title
                  }
                </h4>

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