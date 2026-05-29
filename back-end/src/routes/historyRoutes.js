const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// tempat simpan history sementara
const histories = [];

// GET /history
router.get("/", async (req, res) => {

   const result = await pool.query(
      `
   SELECT * FROM histories
   ORDER BY created_at DESC
   `
   );

   res.json({
      success: true,
      data: result.rows
   });

});

// POST /history
router.post("/", async (req, res) => {

   const {
      session_id,
      category,
      confidence,
      image,
      image_preview
   } = req.body;

   const result = await pool.query(
      `
      INSERT INTO histories
      (
         session_id,
         category,
         confidence,
         image,
         image_preview
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
         session_id,
         category,
         confidence,
         image,
         image_preview
      ]
   );

   res.status(201).json({
      success: true,
      data: result.rows[0]
   });

});

// DELETE /history/:id
router.delete("/:id", async (req, res) => {

   const { id } = req.params;

   const result = await pool.query(
      `
   DELETE FROM histories
   WHERE id = $1
   RETURNING *
   `,
      [id]
   );

   if (result.rowCount === 0) {
      return res.status(404).json({
         success: false,
         message: "History tidak ditemukan"
      });
   }

   res.json({
      success: true,
      message: `History ${id} berhasil dihapus`
   });

});

// PUT /history/:id
router.put("/:id", async (req, res) => {

   const { id } =
      req.params;

   const {
      category,
      confidence
   } = req.body;

   const result =
      await pool.query(
         `
         UPDATE histories
         SET
            category = $1,
            confidence = $2
         WHERE id = $3
         RETURNING *
         `,
         [
            category,
            confidence,
            id
         ]
      );

   res.json({
      success: true,
      data: result.rows[0]
   });
});

module.exports = {
   router,
   histories
};