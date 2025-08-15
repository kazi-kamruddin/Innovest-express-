const db = require("../config/database"); 

const getAllPitches = async (req, res) => {
  try {
    let sql = `
      SELECT pitches.*, users.id AS user_id, users.name AS user_name, users.email AS user_email
      FROM pitches
      JOIN users ON pitches.user_id = users.id
      WHERE 1=1
    `;
    const params = [];

    if (req.query.industry) {
      sql += " AND pitches.industry LIKE ?";
      params.push(`%${req.query.industry}%`);
    }
    if (req.query.stage) {
      sql += " AND pitches.stage LIKE ?";
      params.push(`%${req.query.stage}%`);
    }
    if (req.query.country) {
      sql += " AND pitches.country LIKE ?";
      params.push(`%${req.query.country}%`);
    }

    const [rows] = await db.execute(sql, params);
    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pitches" });
  }
};

const createPitch = async (req, res) => {
    try {
        const {
            user_id,
            title,
            company_location,
            country,
            cell_number,
            industry,
            stage,
            ideal_investor_role,
            total_raising_amount,
            minimum_investment,
            the_business,
            the_market,
            progress,
            objective
        } = req.body;

        if (!user_id || !title || !industry) {
            return res.status(400).json({ error: 'user_id, title, and industry are required' });
        }

        // const [userRows] = await db.execute('SELECT id FROM users WHERE id = ?', [user_id]);
        // if (userRows.length === 0) {
        //     return res.status(400).json({ error: 'User does not exist' });
        // }


        const [result] = await db.execute(
            `INSERT INTO pitches 
            (user_id, title, company_location, country, cell_number, industry, stage, ideal_investor_role, 
            total_raising_amount, minimum_investment, the_business, the_market, progress, objective) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                title,
                company_location || null,
                country || null,
                cell_number || null,
                industry,
                stage || null,
                ideal_investor_role || null,
                total_raising_amount || null,
                minimum_investment || null,
                the_business || null,
                the_market || null,
                progress || null,
                objective || null
            ]
        );

        const [pitchRows] = await db.execute('SELECT * FROM pitches WHERE id = ?', [result.insertId]);
        res.status(201).json(pitchRows[0]);

    } catch (err) {
        console.error('Pitch creation failed:', err);
        res.status(500).json({ error: 'Pitch creation failed' });
    }
};

module.exports = {
  getAllPitches,
  createPitch,
};
