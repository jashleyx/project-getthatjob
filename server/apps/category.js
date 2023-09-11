import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const categoryRouter = Router();

categoryRouter.post("/", async (req, res) => {
  try {
    const category = {
      category_name: req.body.category_name,
    };
    await pool.query("insert into job_categories (category_name) values ($1)", [
      category.category_name,
    ]);
    return res.json({
      message: "Category created!",
    });
  } catch (err) {
    console.log(err);
    return res.status(504).json({
      message: err,
    });
  }
});
categoryRouter.get("/", async (req, res) => {
    const result = await pool.query("SELECT * FROM job_categories ")
    return res.json({
        message: result.rows,
      });
})

export default categoryRouter;
