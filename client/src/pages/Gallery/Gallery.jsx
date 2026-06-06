import {
  useEffect,
  useState,
} from "react";

import API from "../../services/axios";
import Navbar from "../../components/Navbar/Navbar";

import AOS from "aos";
import "aos/dist/aos.css";

function Gallery() {
  const [images, setImages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadImages =
    async () => {
      try {
        const res =
          await API.get(
            "/gallery"
          );

        setImages(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    loadImages();
  }, []);

  return (
    <>
      <Navbar />

      <div className="gallery-page">

        <div
          className="gallery-hero"
          data-aos="zoom-in"
        >
          <h1>
            📸 Gallery
          </h1>

          <p>
            Explore memorable
            moments of BAAL
            MITRA GANESH
            UTSAV MANDAL.
          </p>
        </div>

        {loading ? (
          <div className="loading-container">

            <div className="loader"></div>

            <h2>
              Loading Gallery...
            </h2>

          </div>
        ) : images.length ===
          0 ? (
          <div
            className="empty-gallery"
            data-aos="fade-up"
          >
            <h2>
              😔 No Images Found
            </h2>

            <p>
              Images will appear
              here when uploaded
              by admin.
            </p>
          </div>
        ) : (
          <div className="gallery-grid">

            {images.map(
              (
                img,
                index
              ) => (
                <div
                  key={img.id}
                  className="gallery-card"
                  data-aos="zoom-in"
                  data-aos-delay={
                    index * 100
                  }
                >

                  <div className="image-wrapper">

                    <img
                      src={
                        img.imageUrl
                      }
                      alt={
                        img.title
                      }
                    />

                  </div>

                  <div className="gallery-content">

                    <h3>
                      {
                        img.title
                      }
                    </h3>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </>
  );
}

export default Gallery;