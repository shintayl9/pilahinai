import React, {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import "../styles/Hasil.css";

// ROUTER
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

// ICON
import { RotateCcw } from "lucide-react";

function Hasil() {

  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.result;

  // DATA DARI HALAMAN SEBELUMNYA
  const [hasilDariAI, setHasilDariAI] =
    useState(
      location.state?.result
        ?.category?.toLowerCase() ||
      "organik"
    );

  useEffect(() => {
    if (
      location.state?.result?.category
    ) {
      setHasilDariAI(
        location.state.result.category.toLowerCase()
      );
    }
  }, [location.state]);

  const imageDariAI =
    location.state?.imagePreview ||
    "https://via.placeholder.com/250";

  const [feedback, setFeedback] =
    useState(null);

  const [feedbackText, setFeedbackText] =
    useState("");

  const [isSubmitted, setIsSubmitted] =
    useState(false);

  const [showNotif, setShowNotif] =
    useState(false);

  const [isRefreshing, setIsRefreshing] =
    useState(false);

  // DATA HASIL
  const hasilData = {

    organik: {
      kategori: "Organik",

      result:
        "Foto yang kamu kirim termasuk sampah Organik.",

      title:
        "Sampah Organik",

      description: `
        Sampah organik berasal dari bahan alami seperti sisa makanan, daun, buah, dan bahan yang mudah terurai secara alami.

        Jenis sampah ini umumnya berasal dari aktivitas rumah tangga maupun lingkungan sekitar dan dapat diolah kembali menjadi kompos yang bermanfaat bagi tanaman.
      `,

      image:
        "/images/organik.jpg",

      note:
        "Catatan: Sampah organik dapat diolah menjadi kompos untuk membantu mengurangi limbah rumah tangga.",

      points: [
        "Mudah terurai secara alami",
        "Berasal dari sisa makhluk hidup",
        "Dapat diolah menjadi pupuk kompos",
        "Lebih ramah lingkungan"
      ]
    },

    anorganik: {
      kategori: "Anorganik",

      result:
        "Foto yang kamu kirim termasuk sampah Anorganik.",

      title:
        "Sampah Anorganik",

      description: `
        Sampah anorganik merupakan jenis sampah yang sulit terurai seperti plastik, kaca, logam, dan kaleng.

        Sampah jenis ini membutuhkan proses daur ulang khusus agar tidak mencemari lingkungan dan dapat dimanfaatkan kembali menjadi produk baru.
      `,

      image:
        "/images/anorganik.jpg",

      note:
        "Catatan: Sampah anorganik sebaiknya dipilah untuk proses daur ulang agar tidak mencemari lingkungan.",

      points: [
        "Sulit terurai secara alami",
        "Dapat mencemari tanah dan laut",
        "Bisa didaur ulang",
        "Perlu pemilahan khusus"
      ]
    }

  };

  const data = hasilData[hasilDariAI];

  // ===== CHECK FEEDBACK =====
  useEffect(() => {

    const savedFeedback =
      JSON.parse(
        localStorage.getItem("feedbacks")
      ) || [];

    const alreadyFeedback =
      savedFeedback.some(
        (item) =>
          item.image === imageDariAI
      );

    if (alreadyFeedback) {
      setIsSubmitted(true);
    }

  }, []);

  // ===== SUBMIT FEEDBACK =====
  const handleSubmitFeedback = async () => {

    if (!feedback) {
      alert("Pilih feedback terlebih dahulu");
      return;
    }

    try {

      await axios.post(
        "http://localhost:5000/feedback",
        {
          feedback: feedbackText,
          rating: feedback,
          historyId: resultData?.id
        }
      );

      setShowNotif(true);

      setIsSubmitted(true);

      setTimeout(() => {
        setShowNotif(false);
      }, 2500);

    } catch (error) {

      console.error(
        "Gagal kirim feedback:",
        error
      );

    }

  };

  const handleRefreshResult = async () => {

    console.log(location.state);

    try {

      setIsRefreshing(true);

      const historyId =
        resultData?.id;

      console.log("ID HISTORY:", historyId);

      const response =
        await axios.put(
          `http://localhost:5000/predict/${historyId}`
        );

      setHasilDariAI(
        response.data.result.category.toLowerCase()
      );

      setIsRefreshing(false);

    } catch (error) {

      console.error(
        "Gagal refresh hasil:",
        error
      );

    } finally {

      setIsRefreshing(false);

    }
  };

  return (
    <div className="hasil-container">

      {/* HEADER */}
      <div className="hasil-header">

        <h1>EcoSortAI</h1>

      </div>

      {/* TITLE */}
      <div className="hasil-title-box">

        <h2>Hasil Klasifikasi AI</h2>

        <p>
          EcoSortAI berhasil menganalisis
          gambar sampah yang kamu upload
        </p>

      </div>

      {/* IMAGE */}
      <div className="hasil-image-section">

        <img
          src={imageDariAI}
          alt="hasil"
          className="hasil-img"
        />

      </div>

      {/* BADGE */}
      <div className="badge-group">

        <span
          className={`badge kategori ${hasilDariAI}`}
        >
          {data?.kategori}
        </span>

        <span className="badge akurasi">
          Accuracy {resultData?.confidence}
        </span>

      </div>

      {/* ACTION BUTTON */}
      <div className="action-buttons">

        {/* UPLOAD ULANG */}
        <button
          className="retry-btn"
          onClick={() => navigate("/upload")}
        >
          Upload Ulang
        </button>

        {/* REFRESH */}
        <button
          className="retry-btn secondary"
          onClick={handleRefreshResult}
          disabled={isRefreshing}
        >

          <RotateCcw
            size={18}
            className={
              isRefreshing
                ? "spin-icon"
                : ""
            }
          />

          {isRefreshing
            ? "Mendeteksi..."
            : "Deteksi Ulang"}

        </button>

        {/* HISTORY */}
        <button
          className="retry-btn history-btn"
          onClick={() =>
            navigate("/history")
          }
        >
          Lihat Riwayat
        </button>

      </div>

      {/* CONTENT */}
      <div className="hasil-content">

        {/* RESULT */}
        <div className="info-box">

          <h3>{data?.result}</h3>

        </div>

        {/* MODERN RESULT CARD */}
        <div className="modern-card">

          <h2 className="modern-title">
            {data?.title}
          </h2>

          <div className="modern-description">

            {data?.description
              ?.split("\n")
              .filter(
                (text) =>
                  text.trim() !== ""
              )
              .map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}

          </div>

          <img
            src={data?.image}
            alt={data?.kategori}
            className="modern-image"
          />

          <p className="modern-note">
            {data?.note}
          </p>

          <div className="point-wrapper">

            <h4>Poin Penting</h4>

            <ul className="modern-points">

              {data?.points.map(
                (item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                )
              )}

            </ul>

          </div>

        </div>

      </div>

      {/* FEEDBACK */}
      <div className="feedback-box">

        <p className="feedback-title">
          Apakah Anda puas dengan hasil
          EcoSortAI?
        </p>

        <div className="feedback-icons">

          {/* LIKE */}
          <div
            className={`feedback-item ${feedback === "like"
              ? "active"
              : ""
              }`}
            onClick={() =>
              !isSubmitted &&
              setFeedback("like")
            }
          >
            <img
              src="/like.png"
              alt="like"
              className="feedback-img"
            />

            <span>Ya</span>

          </div>

          {/* DISLIKE */}
          <div
            className={`feedback-item ${feedback === "dislike"
              ? "active"
              : ""
              }`}
            onClick={() =>
              !isSubmitted &&
              setFeedback("dislike")
            }
          >
            <img
              src="/dislike.png"
              alt="dislike"
              className="feedback-img"
            />

            <span>Tidak</span>

          </div>

        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="Tulis feedback anda disini..."
          value={feedbackText}
          onChange={(e) =>
            setFeedbackText(e.target.value)
          }
          disabled={isSubmitted}
        />

        {/* BUTTON */}
        <button
          className="kirim-btn"
          onClick={handleSubmitFeedback}
          disabled={isSubmitted}
        >
          {isSubmitted
            ? "Feedback Terkirim"
            : "Kirim Feedback"}
        </button>

      </div>

      {/* NOTIFICATION */}
      {showNotif && (
        <div className="feedback-notif">
          Feedback berhasil dikirim
        </div>
      )}

    </div>
  );
}

export default Hasil;