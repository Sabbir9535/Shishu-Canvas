const pool = require('../config/db');

// GET /api/products
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error('[getAllProducts]', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('[getProductById]', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
};

module.exports = { getAllProducts, getProductById };
