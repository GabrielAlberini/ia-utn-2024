// src/pages/AdminProducts.jsx
import { useEffect, useState } from "react";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/products";

import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  }); // Añadido 'imageUrl'
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      console.log(data, "aca");
      setProducts(data);
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await addProduct(form);
    }
    setForm({ name: "", description: "", price: "", imageUrl: "" }); // Reseteo del campo 'imageUrl'
    setEditingId(null);
    // Fetch products again
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || "", // Asegúrate de manejar la imagen
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    const data = await fetchProducts();
    setProducts(data);
  };

  return (
    <div>
      <h1>Administrar Productos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción del producto"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio del producto"
          required
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="URL de la imagen"
          required // Campo requerido
        />
        <button type="submit">{editingId ? "Actualizar" : "Agregar"}</button>
      </form>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} />
              )}
            </div>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Precio: ${product.price}</p>
            </div>
            <div className="product-actions">
              <button className="btn-edit" onClick={() => handleEdit(product)}>
                Editar
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
