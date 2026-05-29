import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/upload.css";

function Upload() {

  const [image, setImage] =
    useState(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const fileInputRef =
    useRef(null);

  const navigate =
    useNavigate();

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async () => {

    try {

      navigate("/loading");

      const formData =
        new FormData();

      formData.append(
        "file",
        image.file
      );

      const sessionId =
        Date.now().toString();

      formData.append(
        "session_id",
        sessionId
      );

      const response =
        await axios.post(
          "http://localhost:5001/predict_image",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const historyResponse =
        await axios.post(
          "http://localhost:5000/history",
          {
            session_id: sessionId,
            category:
              response.data.category,
            confidence:
              `${response.data.confidence}%`,
            image:
              image.file.name,
            image_preview:
              image.preview,
          }
        );

      navigate("/loading", {
        state: {
          imagePreview:
            image.preview,
          result:
            historyResponse.data.data
        }
      });

    } catch (error) {

      console.error(
        "Upload gagal:",
        error
      );

    }

  };

  // ===== PROSES FILE GAMBAR =====
  const processImage = (file) => {
    if (!file) return;

    const img =
      new Image();

    const canvas =
      document.createElement("canvas");

    const ctx =
      canvas.getContext("2d");

    img.onload = () => {

      const MAX_WIDTH = 300;

      const scaleSize =
        MAX_WIDTH / img.width;

      canvas.width =
        MAX_WIDTH;

      canvas.height =
        img.height * scaleSize;

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const compressedBase64 =
        canvas.toDataURL(
          "image/jpeg",
          0.5
        );

      setImage({
        file: file,
        preview:
          compressedBase64,
      });
    };

    img.src =
      URL.createObjectURL(file);
  };

  // ===== HANDLE KLIK UPLOAD =====

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    processImage(file);

  };

  // ===== HAPUS GAMBAR =====

  const removeImage = () => {

    setImage(null);

  };

  // ===== DRAG & DROP =====

  const onDragEnter = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setIsDragging(true);

  };

  const onDragLeave = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setIsDragging(false);

  };

  const onDragOver = (e) => {

    e.preventDefault();

    e.stopPropagation();

  };

  const onDrop = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setIsDragging(false);

    const file =
      e.dataTransfer.files[0];

    if (
      file &&
      file.type.startsWith("image/")
    ) {

      processImage(file);

    }

  };

  // ===== TRIGGER INPUT =====

  const onButtonClick = () => {

    fileInputRef.current.click();

  };

  return (

    <div className="upload-page">

      <div className="upload-header">

        <h1>
          EcoSortAI
        </h1>

      </div>

      <div className="upload-content">

        <h2>
          Halaman Upload
        </h2>

        <div
          className={`upload-box ${isDragging
            ? "dragging"
            : ""
            }`}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >

          {!image ? (

            <>

              <img
                src="/upload-icon.png"
                alt="Upload"
                className="upload-icon"
              />

              <p className="upload-text">

                {isDragging
                  ? "Lepaskan untuk upload"
                  : "Drop file here"}

              </p>

              <span className="upload-or">
                OR
              </span>

              <label className="upload-btn">

                Upload File

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />

              </label>

            </>

          ) : (

            <>

              <div className="preview-wrapper">

                <button
                  className="remove-image"
                  onClick={removeImage}
                >
                  ✕
                </button>

                <img
                  src={image.preview}
                  alt="Preview"
                  className="preview-image"
                />

              </div>

              <p className="file-name">

                {image.file.name}

              </p>

              <button
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit
              </button>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default Upload;