const fs = require("fs");
const path = require("path");

const express = require("express");
const multer = require("multer");
const pool = require("../config/db");

const FormData = require("form-data");
const axios = require("axios");

const router = express.Router();

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
   async (req, res) => {

      try {

         // validasi file
         if (!req.file) {
            return res.status(400).json({
               success: false,
               message: "Image wajib diupload"
            });
         }

         // convert image ke base64
         const imageBuffer =
            fs.readFileSync(req.file.path);

         const imageBase64 =
            `data:${req.file.mimetype};base64,${imageBuffer.toString("base64")}`;

         // data history baru
         const newHistory = {
            sessionId:
               req.body.sessionId ||
               Date.now().toString(),

            image: req.file.filename,

            imagePreview: imageBase64,

            category: "Organik",

            confidence: "95%"
         };

// ============= INTEGRASI AI DI SINI ================
         // kirim gambar ke AI
         const formData = new FormData();

         formData.append(
            "file",
            fs.createReadStream(req.file.path)
         );

         formData.append(
            "process_id",
            newHistory.sessionId
         );

         const aiResponse = await axios.post(
            "http://127.0.0.1:5001/predict_image",
            formData,
            {
               headers: formData.getHeaders()
            }
         );

         // hasil AI
         newHistory.category =
            aiResponse.data.category;

         newHistory.confidence =
            (
               aiResponse.data.confidence * 100
            ).toFixed(2) + "%";
// ===============================================

         // simpan history
         const result = await pool.query(
            `
            INSERT INTO histories
            (
               session_id,
               image,
               image_preview,
               category,
               confidence,
               created_at
            )
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING *
            `,
            [
               newHistory.sessionId,
               newHistory.image,
               newHistory.imagePreview,
               newHistory.category,
               newHistory.confidence
            ]
         );

         // hapus file uploads
         const imagePath = path.join(
            __dirname,
            "../../uploads",
            req.file.filename
         );

         fs.unlink(imagePath, (err) => {

            if (err) {

               console.log(
                  "Gagal hapus file:",
                  err
               );

            } else {

               console.log(
                  "File upload berhasil dihapus"
               );

            }

         });

         // response
         res.json({
            success: true,
            message: "Prediksi sampah berhasil",
            result: result.rows[0]
         });

      } catch (error) {

         console.error(error);

         res.status(500).json({
            success: false,
            message: "Server error"
         });

      }

   }
);

// PUT /predict/:id
router.put("/:id", async (req, res) => {

   try {

      const { id } = req.params;

      // cek data history di database
      const checkHistory = await pool.query(
         `
         SELECT * FROM histories
         WHERE id = $1
         `,
         [id]
      );

      // kalau tidak ditemukan
      if (checkHistory.rowCount === 0) {

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

      // delay loading
      await new Promise((resolve) =>
         setTimeout(resolve, 5000)
      );

      // update database
      const updatedHistory = await pool.query(
         `
         UPDATE histories
         SET
            category = $1,
            confidence = $2,
            created_at = NOW()
         WHERE id = $3
         RETURNING *
         `,
         [
            randomCategory,
            randomConfidence,
            id
         ]
      );

      res.json({
         success: true,
         message: "Hasil berhasil diperbarui",
         result: updatedHistory.rows[0]
      });

   } catch (error) {

      console.error(error);

      res.status(500).json({
         success: false,
         message: "Server error"
      });

   }

});

module.exports = router;