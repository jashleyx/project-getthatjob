import { Router } from "express";
import { pool } from "../utils/db_connection.js";

const applyappliRouter = Router();

applyappliRouter.post("/:user_Id/job-list/:job_Id", async (req, res) => {
  try {
    const job_Id = req.params.job_Id;
    const user_Id = req.params.user_Id;
    const { currentCV, interestedReason, professionalExperience } = req.body;
    try {
      const userdata = await pool.query(
        "INSERT INTO application (user_id, job_id, professional_experience, cv, interested_reason, application_status, sent_date) VALUES ($1, $2, $3, $4, $5, 'pending', now()) RETURNING *",
        [user_Id, job_Id, professionalExperience, currentCV, interestedReason]
      );

      console.log("Application submitted successfully:", userdata.rows[0]);

      res.json(userdata.rows[0]);
    } catch (error) {
      console.error("Error submitting application:", error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the application." });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(400).json({ error: "Invalid request data." });
  }
});

applyappliRouter.get("/:job_id", async (req, res) => {
  const job_id = req.params.job_id;
  try {
    const userdata = await pool.query(
      "SELECT * FROM jobs INNER JOIN recruiter_informations on jobs.recruiter_id = recruiter_informations.recruiter_id WHERE job_id = $1",
      [job_id]
    );
    res.json(userdata.rows[0]);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
});

applyappliRouter.get("/u/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  console.log("user_id:", user_id);
  try {
    const userdata = await pool.query(
      "SELECT * FROM user_profiles  WHERE user_id = $1",
      [user_id]
    );
    console.log("Application submitted successfully :", userdata.rows[0]);
    res.json(userdata.rows[0]);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the application." });
  }
});

//recruiter ใช้
applyappliRouter.get("/recruiter/:job_id", async (req, res) => {
  console.log(req);
  try {
    const job_id = req.params.job_id;
    const status = req.query.status || null; // status query
    
    let query = `
    SELECT
    application.job_id,
    application.application_id,
    application.user_id,
    user_name,
    user_linkedin,
    email,
    user_phone,
    sent_date,
    application_status,
    professional_experience,
    interested_reason,
    cv
  FROM
    application
  INNER JOIN users ON application.user_id = users.user_id
  INNER JOIN user_profiles ON application.user_id = user_profiles.user_id
  WHERE
    application.job_id = $1
    `;
    // const queryOrder = `ORDER BY application_status DESC`;
    const queryParams = [job_id];

    if (status !== "all") {
      query += " AND application_status = $2";
      queryParams.push(status);
    }
    // query += queryOrder;
    
    const result = await pool.query(query, queryParams);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

applyappliRouter.put("/recruiter/:application_id", async (req, res) => {
  console.log(req);
  try {
    const application_id = req.params.application_id;
    const updateApplication = {
      application_status: req.body.application_status,
    };

    await pool.query(
      "UPDATE application SET application_status = $1 WHERE application_id = $2",
      [updateApplication.application_status, application_id]
    );

    return res.json({
      message: `Status of Application ${application_id} has been updated`,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// สำหรับ professional ใช้ เพื่อดู application ตัวเอง
// เดี๋ยวถามพี่กัน or กาก้า
applyappliRouter.get("/myapplication/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // const filter = req.query.filter || null; // status query

    if (!user_id) {
      return res.status(404).json({ error: "Invalid user_id" });
    }

    let query = `
    SELECT 
      *
       FROM application
       INNER JOIN user_profiles ON application.user_id = user_profiles.user_id
       INNER JOIN jobs ON application.job_id = jobs.job_id
       INNER JOIN recruiter_informations ON jobs.recruiter_id = recruiter_informations.recruiter_id
       inner join job_categories on jobs.job_category_id=job_categories.job_category_id
       inner join job_types on jobs.job_type_id=job_types.job_type_id
       WHERE application.user_id = $1
  `;

    const queryParams = [user_id];

    const result = await pool.query(query, queryParams);

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// // professional wants to decline the application
// applyappliRouter.put("/:user_id", async (res, req)=>{

// })

export default applyappliRouter;
//("/apply/xxxxxxxxx", applyappliRouter);
