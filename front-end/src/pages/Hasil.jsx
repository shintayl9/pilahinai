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
  useEffect(() => {

    window.scrollTo(0, 0);

  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.result;

  const aiCategory =
    location.state?.result?.category?.toLowerCase() || "organic";

  const categoryMapping = {
    organic: "Organik",

    plastik: "Anorganik",
    kaca: "Anorganik",
    logam: "Anorganik",
    kardus: "Anorganik",
    kertas: "Anorganik",
    recyclable: "Anorganik",

    residu: "Residu",

    hazard: "B3"
  };

  const frontendCategory =
    categoryMapping[aiCategory] || "Anorganik";

  // DATA DARI HALAMAN SEBELUMNYA
  const [hasilDariAI, setHasilDariAI] =
    useState(frontendCategory.toLowerCase());

  useEffect(() => {
    if (
      location.state?.result?.category
    ) {
      const aiResult =
        location.state.result.category.toLowerCase();

      const mappedCategory =
        categoryMapping[aiResult] || "Anorganik";

      setHasilDariAI(
        mappedCategory.toLowerCase()
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

  // DATA KATEGORI
  const kategoriData = {
    organik: {
      title: "Kategori Organik",
      description:
        "Sampah organik merupakan sampah yang berasal dari makhluk hidup seperti sisa makanan, daun, ranting, dan bahan alami lainnya yang mudah terurai secara alami oleh mikroorganisme."
    },

    anorganik: {
      title: "Kategori Anorganik",
      description:
        "Sampah anorganik merupakan sampah yang sulit terurai secara alami dan umumnya berasal dari bahan non-hayati seperti plastik, kaca, logam, kertas, dan kardus. Jenis sampah ini dapat dikelola melalui proses daur ulang."
    },

    residu: {
      title: "Kategori Residu",
      description:
        "Sampah residu adalah sampah yang tidak dapat didaur ulang atau diolah kembali sehingga memerlukan penanganan khusus sebelum dibuang ke tempat pembuangan akhir."
    },

    b3: {
      title: "Kategori B3",
      description:
        "Sampah B3 (Bahan Berbahaya dan Beracun) merupakan limbah yang dapat membahayakan kesehatan manusia maupun lingkungan sehingga memerlukan penanganan khusus."
    }
  };

  // DATA HASIL
  const hasilData = {
    organik: {
      kategori: "Organik",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Organik.",

      title:
        "Jenis Sampah Organik (Contoh: Sisa Makanan, Daun Kering, Teh Celup)",

      description: `
Sampah Organik adalah material sisa yang berasal dari makhluk hidup (hewan dan tumbuhan) yang bersifat hayati dan mudah membusuk. Berbeda dengan residu, B3, atau recyclable, jenis sampah ini dapat diurai kembali oleh alam (biodegradabel) secara cepat melalui proses dekomposisi alami oleh mikroorganisme menjadi unsur hara tanah.
`,
      image:
        "/organik-1.png",
      image2:
        "/organik-2.png",

      handlingTitle:
        "Berikut adalah tahapan penanganan sampah organik yang benar di lingkup rumah tangga:",

      handling: [
        "Bagi sampah organik menjadi dua jenis Organik hijau (Basah/Kaya Nitrogen) dan Organik coklat (Kering/Kaya Karbon) untuk mempermudah pengolahan.",

        "Potong atau cacah sisa sayuran, kulit buah, atau daun kering menjadi ukuran sekitar 2–5 cm. Semakin kecil ukurannya, semakin cepat mikroorganisme mengurainya menjadi kompos.",

        "Pilih salah satu metode pengolahan seperti membuat kompos dengan mencampurkan sampah organik hijau dan coklat, kemudian ditambahkan sedikit tanah atau cairan EM4 (Starter Bakteri), atau metode Lubang Biopori dengan membuat lubang silindris vertikal ke dalam tanah di halaman rumah, kemudian masukkan sampah organik secara berkala ke dalamnya untuk menyuburkan tanah dan meningkatkan daya resap air hujan."
      ],

      publicGuideTitle:
        "Jika Anda berada di ruang publik dan tidak menemukan tempat sampah khusus organik, lakukan langkah berikut:",

      publicGuide: [
        "Bawa Pulang dalam Wadah Tertutup: Masukkan sisa makanan ke dalam kotak makan kosong atau kantong ramah lingkungan agar bau dan cairannya tidak bocor di dalam tas.",

        "Kubur di Tanah (Jika Memungkinkan): Jika Anda sedang berkemah atau berada di alam terbuka, sampah organik non-olahan (seperti kulit buah) bisa dikubur langsung di dalam tanah untuk menjadi pupuk alami.",

        "Kelola di Rumah: Setibanya di rumah, masukkan sampah organik ini ke dalam wadah komposter atau biopori keluarga."
      ],

      benefitsTitle:
        "Memisahkan dan mengolah sampah organik dengan benar memiliki dampak paling krusial terhadap keberlanjutan lingkungan, yaitu:",

      benefits: [
        "Mencegah Ledakan Gas Metana di TPA: Sampah organik yang tertumpuk dan tertimbun bersama plastik di TPA akan membusuk tanpa oksigen, menghasilkan gas metana yang berpotensi memicu ledakan dan kebakaran TPA, serta menjadi gas rumah kaca yang 25 kali lebih merusak daripada CO2.",

        "Menghilangkan Air Lindi (Cairan Sampah): Sampah organik adalah pemicu utama munculnya cairan hitam berbau busuk (air lindi) di truk sampah dan TPA yang dapat mencemari sumur air warga sekitar.",

        "Menghasilkan Pupuk Alami (Kompos): Mengubah limbah menjadi pupuk organik kaya nutrisi yang dapat menyuburkan tanah, memperbaiki struktur lahan pertanian, dan mengurangi ketergantungan pada pupuk kimia.",

        "Sumber Pakan Alternatif (Maggot BSF): Sampah organik kering/basah dapat diolah menjadi pakan larva Black Soldier Fly (Maggot BSF), yang nantinya menjadi pakan ternak tinggi protein dan bernilai ekonomi tinggi."
      ],
    },

    anorganik: {
      kategori: "Anorganik",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Anorganik.",

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
    },

    b3: {
      kategori: "B3",

      result:
        "Foto yang kamu kirim termasuk kategori sampah B3.",

      title:
        "Sampah B3",

      description: `
    Sampah B3 merupakan limbah bahan berbahaya dan beracun yang dapat membahayakan lingkungan maupun kesehatan manusia.

    Jenis sampah ini memerlukan penanganan khusus dan tidak boleh dibuang sembarangan.
  `,

      image:
        "/images/anorganik.jpg",

      note:
        "Catatan: Sampah B3 harus dipisahkan dan dibuang sesuai prosedur khusus.",

      points: [
        "Berbahaya bagi lingkungan",
        "Memerlukan penanganan khusus",
        "Tidak boleh dibuang sembarangan",
        "Berpotensi beracun"
      ]
    },

    residu: {
      kategori: "Residu",

      result:
        "Foto yang kamu kirim termasuk kategori sampah Residu.",

      title:
        "Jenis Sampah Residu (Contoh: Masker, Pembalut, Popok)",

      description: `
      Sampah yang tidak bisa didaur ulang karena kontaminasi biologis atau sifat materialnya yang kompleks sehingga tidak bisa didaur ulang, seperti tisu bekas, pembalut, popok sekali pakai, puntung rokok, dan styrofoam.
      `,

      image:
        "/residu-1.png",

      handlingTitle:
        "Sampah residu harus ditangani dengan penanganan khusus meliputi:",

      handling: [
        "Wajib dibungkus rapat dalam plastik/wadah tertutup sebelum dibuang ke tempat sampah.",
        "Khusus masker: Gunting tali dan bagian tengah masker untuk mencegah penyalahgunaan kembali oleh pihak tidak bertanggung jawab."
      ],

      facilityImage:
        "/residu-2.png",

      publicGuideTitle:
        "Jika tidak ditemukan tempat sampah khusus residu apa yang dilakukan?",

      publicGuide: [
        "Bawa Kembali: Masukkan sampah ke dalam kantong plastik klip atau wadah tertutup di dalam tas Anda, lalu buang setibanya di rumah atau di tempat yang menyediakan fasilitas pilah sampah yang memadai."
      ],

      benefitsText:
        "Tujuan utama dari pengolahan sampah residu yang baik adalah mengurangi volume sampah yang berakhir di TPA (Tempat Pembuangan Akhir) dan mencegah pencemaran lingkungan. Dan mencegah penyebaran penyakit serta menjaga kebersihan lingkungan dari limbah medis rumah tangga."
    }
  };

  const data = hasilData[hasilDariAI];
  const kategoriInfo =
    kategoriData[hasilDariAI];

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

      const imageResponse =
        await fetch(imageDariAI);

      const blob =
        await imageResponse.blob();

      const formData =
        new FormData();

      formData.append(
        "file",
        blob,
        "redetect.jpg"
      );

      formData.append(
        "session_id",
        resultData?.session_id
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

      const aiResult =
        response.data.category.toLowerCase();

      const mappedCategory =
        categoryMapping[aiResult] || "Anorganik";

      setHasilDariAI(
        mappedCategory.toLowerCase()
      );

      resultData.category =
        response.data.category;

      resultData.confidence =
        `${response.data.confidence}%`;

      await axios.put(
        `http://localhost:5000/history/${historyId}`,
        {
          category:
            response.data.category,

          confidence:
            `${response.data.confidence}%`
        }
      );

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
          Kategori: {frontendCategory}
        </span>

        <span
          className={`badge jenis ${hasilDariAI}`}
        >
          Jenis: {resultData?.category}
        </span>

        <span className="badge akurasi">
          Akurasi: {resultData?.confidence}
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
          <p>
            {kategoriInfo?.description}
          </p>
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

          {data?.handling && (
            <div className="point-wrapper">
              <h4>{data?.handlingTitle}</h4>
              <ul className="modern-points">
                {data.handling.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {data?.facilityImage && (
            <img
              src={data.facilityImage}
              alt="fasilitas"
              className="modern-image"
            />
          )}

          {data?.image2 && (
            <img
              src={data.image2}
              alt="Fasilitas Organik"
              className="modern-image"
            />
          )}

          {data?.publicGuide && (

            <div className="point-wrapper">
              <h4>{data?.publicGuideTitle}</h4>
              <ul className="modern-points">
                {data.publicGuide.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {data?.benefitsText && (
            <div className="modern-description">
              <p>{data.benefitsText}</p>
            </div>
          )}

          {data?.benefits && (

            <div className="point-wrapper">
              <h4>
                {data?.benefitsTitle}
              </h4>
              <ul className="modern-points">
                {data.benefits.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          <p className="modern-note">
            {data?.note}
          </p>
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