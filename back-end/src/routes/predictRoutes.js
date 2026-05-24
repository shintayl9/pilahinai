const express = require("express");
const multer = require("multer");

const router = express.Router();

const { histories } = require("./historyRoutes");

// konfigurasi penyimpanan file
const storage = multer.diskStorage({

   destination: (req, file, cb) => {
      cb(null, "uploads/");
   },

   filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
   }

});

// middleware upload
const upload = multer({ storage });

// POST /predict
router.post(
   "/",
   upload.single("image"),
   (req, res) => {

      // validasi file
      if (!req.file) {
         return res.status(400).json({
            success: false,
            message: "Image wajib diupload"
         });
      }

      // data history baru
      const newHistory = {
         id: histories.length + 1,
         sessionId:
            req.body.sessionId ||
            Date.now().toString(),
         image: req.file.filename,
         category: "Organik",
         confidence: "95%",
         date:
            new Date().toLocaleString(
               "id-ID"
            )
      };

      // simpan history
      histories.push(newHistory);

      res.json({
         success: true,
         message: "Prediksi sampah berhasil",
         result: newHistory
      });

   }
);

// PUT /predict/:id
router.put("/:id", async (req, res) => {

   const { id } = req.params;

   // cari history berdasarkan id
   const history = histories.find(
      (item) => item.id == id
   );

   // kalau tidak ditemukan
   if (!history) {
      return res.status(404).json({
         success: false,
         message: "History tidak ditemukan"
      });
   }

   // simulasi hasil AI random
   const randomCategory =
      Math.random() > 0.5
         ? "Organik"
         : "Anorganik";

   const randomConfidence =
      Math.floor(
         Math.random() * 10
      ) + 90 + "%";

   // update history
   history.category =
      randomCategory;

   history.confidence =
      randomConfidence;

   history.date =
      new Date().toLocaleString("id-ID");

   await new Promise((resolve) =>
      setTimeout(resolve, 5000)
   );

   res.json({
      success: true,
      message: "Hasil berhasil diperbarui",
      result: history
   });

});

module.exports = router;