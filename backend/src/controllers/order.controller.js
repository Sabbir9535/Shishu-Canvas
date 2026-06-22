const pool = require('../config/db');

const VALID_STATUSES = ['pending', 'confirmed', 'delivered'];

// POST /api/orders
const createOrder = async (req, res) => {
  const { product_id, customer_name, phone, address, quantity } = req.body;

  // Validate required fields
  if (!product_id || !customer_name || !phone || !address) {
    return res.status(400).json({
      success: false,
      message: 'product_id, customer_name, phone, and address are required',
    });
  }

  const qty = parseInt(quantity) || 1;
  if (qty < 1) {
    return res.status(400).json({ success: false, message: 'quantity must be at least 1' });
  }

  try {
    // Verify product exists and has enough stock
    const productResult = await pool.query(
      'SELECT id, name, stock FROM products WHERE id = $1',
      [product_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const product = productResult.rows[0];
    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${product.stock}`,
      });
    }

    // Begin transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Deduct stock
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [qty, product_id]
      );

      // Create order
      const orderResult = await client.query(
        `INSERT INTO orders (product_id, customer_name, phone, address, quantity)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [product_id, customer_name.trim(), phone.trim(), address.trim(), qty]
      );

      await client.query('COMMIT');

      res.status(201).json({ success: true, data: orderResult.rows[0] });
    } catch (txError) {
      await client.query('ROLLBACK');
      throw txError;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('[createOrder]', error.message);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

// GET /api/orders
const getAllOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.*, p.name AS product_name, p.price AS product_price
       FROM orders o
       LEFT JOIN products p ON o.product_id = p.id
       ORDER BY o.created_at DESC`
    );
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error('[getAllOrders]', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// GET /api/orders/:id
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT o.*, p.name AS product_name, p.price AS product_price, p.image AS product_image
       FROM orders o
       LEFT JOIN products p ON o.product_id = p.id
       WHERE o.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('[getOrderById]', error.message);
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
};

// PATCH /api/orders/:id
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'status is required' });
  }

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}`,
    });
  }

  try {
    const result = await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('[updateOrderStatus]', error.message);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus };
