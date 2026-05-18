import React, { useState, useEffect } from 'react';
import { FaTrash, FaBoxOpen, FaDollarSign } from 'react-icons/fa';

export default function App() {

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const API = 'http://localhost:5000';

  // OBTENER PRODUCTOS
  useEffect(() => {
    fetch(`${API}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  // AGREGAR PRODUCTO
  const agregarProducto = async (e) => {

    e.preventDefault();

    if (!nombre || precio <= 0 || stock < 0) {
      alert('Datos inválidos');
      return;
    }

    const nuevo = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };

    const res = await fetch(`${API}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevo)
    });

    const productoGuardado = await res.json();

    setProductos([...productos, productoGuardado]);

    setNombre('');
    setPrecio('');
    setStock('');
  };

  // ELIMINAR
  const eliminarProducto = async (id) => {

    await fetch(`${API}/productos/${id}`, {
      method: 'DELETE'
    });

    setProductos(
      productos.filter(p => p.id !== id)
    );
  };

  // FILTRAR
  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(
      busqueda.toLowerCase()
    )
  );

  // ESTADÍSTICAS
  const totalProductos = productos.length;

  const valorInventario = productos.reduce(
    (acc, p) => acc + (p.precio * p.stock),
    0
  );

  return (
    <div style={container}>

      <div style={card}>

        <h1 style={title}>
          Sistema de Inventario
        </h1>

        {/* ESTADÍSTICAS */}

        <div style={statsContainer}>

          <div style={statCard}>
            <FaBoxOpen size={30} />
            <h2>{totalProductos}</h2>
            <p>Productos</p>
          </div>

          <div style={statCard}>
            <FaDollarSign size={30} />
            <h2>${valorInventario}</h2>
            <p>Valor Inventario</p>
          </div>

        </div>

        {/* BUSCADOR */}

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={searchInput}
        />

        {/* FORMULARIO */}

        <form
          onSubmit={agregarProducto}
          style={form}
        >

          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={input}
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            style={input}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={input}
          />

          <button style={button}>
            Guardar Producto
          </button>

        </form>

        {/* TABLA */}

        <table style={table}>

          <thead>
            <tr style={thead}>
              <th style={thtd}>Producto</th>
              <th style={thtd}>Precio</th>
              <th style={thtd}>Stock</th>
              <th style={thtd}>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {productosFiltrados.map((p) => (

              <tr key={p.id}>

                <td style={thtd}>
                  {p.nombre}
                </td>

                <td style={thtd}>
                  ${p.precio}
                </td>

                <td style={thtd}>
                  {p.stock}
                </td>

                <td style={thtd}>

                  <button
                    onClick={() => eliminarProducto(p.id)}
                    style={deleteButton}
                  >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}

// ESTILOS

const container = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #141e30, #243b55)',
  padding: '40px',
  fontFamily: 'Arial'
};

const card = {
  maxWidth: '1000px',
  margin: 'auto',
  background: 'white',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
};

const title = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#222'
};

const statsContainer = {
  display: 'flex',
  gap: '20px',
  marginBottom: '20px'
};

const statCard = {
  flex: 1,
  background: '#007bff',
  color: 'white',
  padding: '20px',
  borderRadius: '15px',
  textAlign: 'center'
};

const searchInput = {
  width: '100%',
  padding: '14px',
  marginBottom: '20px',
  borderRadius: '10px',
  border: '1px solid #ccc'
};

const form = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginBottom: '30px'
};

const input = {
  padding: '14px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const button = {
  padding: '14px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const table = {
  width: '100%',
  borderCollapse: 'collapse'
};

const thead = {
  backgroundColor: '#007bff',
  color: 'white'
};

const thtd = {
  padding: '15px',
  border: '1px solid #ddd',
  textAlign: 'center'
};

const deleteButton = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};