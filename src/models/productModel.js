const db = require("../config/db");

module.exports = {
  getAllProducts: async () => {
    const { rows } = await db.query("SELECT * FROM product");
    return rows;
  },

  getProductByCode: async (code) => {
    const { rows } = await db.query("SELECT * FROM product WHERE code = $1", [
      code,
    ]);
    return rows[0];
  },

  createProduct: async (productData) => {
    const { code, name, description, weight, unit_of_measurement, category } =
      productData;
    const { rows } = await db.query(
      "INSERT INTO product (code, name, description, weight, unit_of_measurement, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [code, name, description, weight, unit_of_measurement, category]
    );
    return rows[0];
  },

  updateProduct: async (code, productData) => {
    const { name, description, weight, unit_of_measurement, category } =
      productData;
    const { rows } = await db.query(
      "UPDATE product SET name = $1, description = $2, weight = $3, unit_of_measurement = $4, category = $5, updated_at = CURRENT_TIMESTAMP WHERE code = $6 RETURNING *",
      [name, description, weight, unit_of_measurement, category, code]
    );
    return rows[0];
  },

  deleteProduct: async (code) => {
    const { rowCount } = await db.query("DELETE FROM product WHERE code = $1", [
      code,
    ]);
    return rowCount > 0;
  },
};
