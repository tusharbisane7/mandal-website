import { useState } from "react";
import API from "../../services/axios";

function ManageNotices() {

  const [title,setTitle] =
    useState("");

  const [message,setMessage] =
    useState("");

  const [file,setFile] =
    useState(null);

  const submitNotice =
    async (e) => {

      e.preventDefault();

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "message",
        message
      );

      if(file){
        formData.append(
          "file",
          file
        );
      }

      await API.post(
        "/notice/create",
        formData,
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Notice Published"
      );
    };

  return(
    <div className="container">

      <h1>
        Notice Board
      </h1>

      <form
        onSubmit={
          submitNotice
        }
      >

        <input
          type="text"
          placeholder="Title"
          onChange={(e)=>
            setTitle(
              e.target.value
            )
          }
        />

        <textarea
          placeholder="Message"
          onChange={(e)=>
            setMessage(
              e.target.value
            )
          }
        />

        <input
          type="file"
          onChange={(e)=>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button>
          Publish Notice
        </button>

      </form>

    </div>
  );
}

export default ManageNotices;