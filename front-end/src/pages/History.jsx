import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "../styles/History.css";

import {
  ChevronLeft,
  ChevronRight,
  Trash2,
  Check,
  X,
} from "lucide-react";

function History() {

  const [historyData, setHistoryData] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(0);

  const [lastRead, setLastRead] =
    useState("");

  const [selectMode, setSelectMode] =
    useState(false);

  const [selectedItems, setSelectedItems] =
    useState([]);

  // ===== MODAL =====
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const response =
          await axios.get(
            "http://localhost:5000/history"
          );

        const sortedData =
          response.data.data.sort(
            (a, b) => b.id - a.id
          );

        setHistoryData(sortedData);

      } catch (error) {

        console.error(
          "Gagal mengambil history:",
          error
        );

      }

    };

    const savedLastRead =
      localStorage.getItem("lastRead");

    setLastRead(savedLastRead || "");

    fetchHistory();

  }, []);

  // ===== PAGINATION =====
  const itemsPerPage = 4;

  const startIndex =
    currentPage * itemsPerPage;

  const currentItems =
    historyData.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  // ===== OPEN HISTORY =====
  const handleOpenHistory = (item) => {

    if (selectMode) {

      toggleSelect(item.id);

      return;

    }

    localStorage.setItem(
      "lastRead",
      item.created_at
    );

    setLastRead(item.created_at);

    navigate("/hasil", {
      state: {
        hasil:
          item.category.toLowerCase(),
        imagePreview:
          item.image_preview,
        result: item
      },
    });

  };

  // ===== TOGGLE SELECT =====
  const toggleSelect = (id) => {
    if (
      selectedItems.includes(id)
    ) {
      setSelectedItems(
        selectedItems.filter(
          (item) => item !== id
        )
      );
    } else {
      setSelectedItems([
        ...selectedItems,
        id,
      ]);
    }
  };

  // ===== DELETE SELECTED =====
  const deleteSelected = async () => {

    try {

      await Promise.all(
        selectedItems.map((id) =>
          axios.delete(
            `http://localhost:5000/history/${id}`
          )
        )
      );

      const updatedHistory =
        historyData.filter(
          (item) =>
            !selectedItems.includes(
              item.id
            )
        );

      setHistoryData(updatedHistory);

      setSelectedItems([]);

      setSelectMode(false);

    } catch (error) {

      console.error(
        "Gagal menghapus history terpilih:",
        error
      );

    }

  };

  // ===== DELETE ONE =====
  const deleteOne = async (
    e,
    id
  ) => {

    e.stopPropagation();

    try {

      await axios.delete(
        `http://localhost:5000/history/${id}`
      );

      const updatedHistory =
        historyData.filter(
          (item) => item.id !== id
        );

      setHistoryData(updatedHistory);

    } catch (error) {

      console.error(
        "Gagal menghapus history:",
        error
      );

    }

  };

  // ===== DELETE ALL =====
  const clearAllHistory = () => {

    setShowDeleteModal(true);

  };

  // ===== CONFIRM DELETE =====
  const confirmDeleteAll = async () => {

    try {

      await Promise.all(
        historyData.map((item) =>
          axios.delete(
            `http://localhost:5000/history/${item.id}`
          )
        )
      );

      setHistoryData([]);

      setShowDeleteModal(false);

    } catch (error) {

      console.error(
        "Gagal menghapus semua history:",
        error
      );

    }

  };

  return (
    <div className="history-page">

      {/* ===== HEADER ===== */}

      <div className="history-top">

        <div>

          <h1>History</h1>

          <p className="history-subtitle">
            Semua gambar yang pernah dicek
            oleh PilahinAI
          </p>

        </div>

        {/* ===== ACTION ===== */}

        <div className="history-actions">

          {!selectMode ? (
            <>

              <button
                className="action-btn"
                onClick={() =>
                  setSelectMode(true)
                }
              >
                Pilih
              </button>

              <button
                className="delete-all-btn"
                onClick={clearAllHistory}
              >
                Hapus Semua
              </button>

            </>
          ) : (
            <>

              <button
                className="delete-selected-btn"
                onClick={deleteSelected}
              >
                <Check size={16} />

                Hapus Terpilih
              </button>

              <button
                className="cancel-btn"
                onClick={() => {

                  setSelectMode(false);

                  setSelectedItems([]);

                }}
              >
                <X size={16} />

                Batal
              </button>

            </>
          )}

        </div>

      </div>

      {/* ===== WRAPPER ===== */}

      <div className="history-wrapper">

        {/* ===== BUTTONS ===== */}

        <div className="slider-buttons">

          {/* LEFT */}

          <button
            className="left-btn"
            onClick={() =>
              setCurrentPage((prev) =>
                prev > 0
                  ? prev - 1
                  : prev
              )
            }
          >
            <ChevronLeft size={20} />
          </button>

          {/* RIGHT */}

          <button
            className="right-btn"
            onClick={() =>
              setCurrentPage((prev) =>
                (prev + 1) *
                  itemsPerPage <
                  historyData.length
                  ? prev + 1
                  : prev
              )
            }
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* ===== GRID ===== */}

        <div className="history-slider">

          {currentItems.length > 0 ? (
            currentItems.map(
              (item, index) => {

                const splitDate =
                  item.created_at
                    ? new Date(item.created_at)
                      .toLocaleString("id-ID")
                      .split(",")
                    : ["Tanggal", "Tidak ada"];

                const latestId =
                  Math.max(
                    ...historyData.map(
                      (item) => item.id
                    )
                  );

                const isNewest =
                  item.id === latestId;

                const isLastRead =
                  lastRead === item.created_at;

                const isNewestAndRead =
                  isNewest &&
                  isLastRead;

                const isOld =
                  !isNewest &&
                  !isLastRead;

                return (

                  <div
                    className={`history-card

                      ${isNewestAndRead
                        ? "mix-card"
                        : ""
                      }

                      ${isNewest &&
                        !isNewestAndRead
                        ? "latest"
                        : ""
                      }

                      ${isLastRead &&
                        !isNewestAndRead
                        ? "read-card"
                        : ""
                      }

                      ${isOld
                        ? "old-card"
                        : ""
                      }

                      ${selectedItems.includes(
                        item.id
                      )
                        ? "selected-card"
                        : ""
                      }
                    `}
                    key={index}
                    onClick={() =>
                      handleOpenHistory(item)
                    }
                  >

                    {/* ===== BADGES ===== */}

                    {isNewest && (
                      <div className="new-badge">
                        NEW
                      </div>
                    )}

                    {isLastRead && (
                      <div className="read-badge">
                        LAST READ
                      </div>
                    )}

                    {/* ===== CHECKBOX ===== */}

                    {selectMode && (

                      <div className="checkbox">

                        {selectedItems.includes(
                          item.id
                        ) && "✓"}

                      </div>

                    )}

                    {/* ===== DELETE ONE ===== */}

                    {!selectMode && (

                      <button
                        className="trash-btn"
                        onClick={(e) =>
                          deleteOne(
                            e,
                            item.id
                          )
                        }
                      >
                        <Trash2 size={16} />
                      </button>

                    )}

                    {/* ===== DATE ===== */}

                    <div className="date-box">

                      <span>
                        {splitDate[0]}
                      </span>

                      <small>
                        {splitDate[1]}
                      </small>

                    </div>

                    {/* ===== IMAGE ===== */}

                    <img
                      src={
                        item.image_preview ||
                        "https://via.placeholder.com/250"
                      }
                      alt="history"
                    />

                    {/* ===== BOTTOM ===== */}
                    <div className="history-bottom">

                      <span
                        className={`history-category ${item.category?.toLowerCase()}`}
                      >
                        <span className="dot"></span>

                        Jenis: {item.category}
                      </span>

                      <small>
                        Akurasi: {item.confidence}
                      </small>

                    </div>

                  </div>

                );
              }
            )
          ) : (
            <p className="empty-text">
              Belum ada riwayat 🌱
            </p>
          )}

        </div>

      </div>

      {/* ===== DELETE MODAL ===== */}

      {showDeleteModal && (

        <div className="modal-overlay">

          <div className="delete-modal">

            <h3>
              Anda yakin akan menghapusnya?
            </h3>

            <p>
              Semua riwayat klasifikasi berdasarkan gambar yang dicek oleh PilahinAI akan
              dihapus permanen.
            </p>

            <div className="modal-buttons">

              <button
                className="cancel-modal-btn"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Batal
              </button>

              <button
                className="confirm-modal-btn"
                onClick={confirmDeleteAll}
              >
                Hapus
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default History;