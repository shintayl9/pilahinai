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

module.exports = {
   router,
   histories
};