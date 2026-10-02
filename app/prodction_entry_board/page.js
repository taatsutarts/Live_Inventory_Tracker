"use client";

import { useState } from "react";
import "./page.css";

export default function ProductionUploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a JPG, PNG, or WEBP image.");
      return;
    }

    setFile(selectedFile);

    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);
  };

  const processImage = () => {
    if (!file) {
      alert("Please upload a production board first.");
      return;
    }

    // OCR / Supabase / Google Sheets
    // will be connected here later.

    console.log("Processing:", file);
  };

  return (
    <main className="production-page">
      <div className="production-container">

        {/* Header */}
        <div className="page-header">
          <h1>Production Logger</h1>

          <p>
            Upload the daily production board
          </p>
        </div>

        {/* Upload Card */}
        <div className="upload-card">

          {!preview ? (
            <label
              htmlFor="board-image"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`upload-area ${
                isDragging ? "dragging" : ""
              }`}
            >
              <div className="upload-icon">
                📷
              </div>

              <h2>
                Upload Production Board
              </h2>

              <p className="upload-description">
                Drag & drop your board image here
              </p>

              <p className="upload-or">
                or click to browse
              </p>

              <p className="upload-formats">
                JPG, PNG or WEBP
              </p>

              <input
                id="board-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="file-input"
              />
            </label>
          ) : (
            <div className="preview-section">

              {/* Image Preview */}
              <div className="image-container">
                <img
                  src={preview}
                  alt="Production board preview"
                  className="board-image"
                />
              </div>

              {/* File Details */}
              <div className="file-details">

                <div>
                  <p className="file-name">
                    {file?.name}
                  </p>

                  <p className="file-size">
                    {file
                      ? `${(
                          file.size /
                          1024 /
                          1024
                        ).toFixed(2)} MB`
                      : ""}
                  </p>
                </div>

                <button
                  onClick={removeImage}
                  className="remove-button"
                >
                  Remove
                </button>

              </div>

              {/* Actions */}
              <div className="action-buttons">

                <button
                  onClick={removeImage}
                  className="change-button"
                >
                  Change Image
                </button>

                <button
                  onClick={processImage}
                  className="process-button"
                >
                  Process Image
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}