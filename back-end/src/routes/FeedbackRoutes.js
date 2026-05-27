const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// POST /feedback
router.post("/", async (req, res) => {

   try {

      const {
         feedback,
         rating,
         historyId
      } = req.body;

      // VALIDASI
      if (!rating || !historyId) {
         return res.status(400).json({
            success: false,
            message: "Rating dan historyId wajib"
         });
      }

      // SIMPAN KE DATABASE
      const result = await pool.query(
         `
         INSERT INTO feedbacks
         (
            history_id,
            feedback,
            rating
         )
         VALUES ($1, $2, $3)
         RETURNING *
         `,
         [
            historyId,
            feedback,
            rating
         ]
      );

      res.json({
         success: true,
         data: result.rows[0]
      });

   } catch (error) {

      console.error(error);

      res.status(500).json({
         success: false,
         message: "Gagal kirim feedback"
      });

   }

});

module.exports = router;