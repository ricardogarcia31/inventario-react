import React, { useState, useEffect } from 'react';

export default function App() {

  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  // IP DE TU PC
  const API = 'http://192.168.1.248:5000';

  // OBTENER PRODUCTOS
  useEffect(() => {
    fetch(`${API}/productos`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.log(err));
  }, []);

  // AGREGAR PRODUCTO
  const agregarProducto = async (e) => {

    e.preventDefault();

    const nuevo = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock)
    };

    try {

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

    } catch (error) {
      console.log(error);
      alert('Error conectando con el servidor');
    }
  };

  // ELIMINAR PRODUCTO
  const eliminarProducto = async (id) => {

    try {

      await fetch(`${API}/productos/${id}`, {
        method: 'DELETE'
      });

      const nuevosProductos = productos.filter(
        producto => producto.id !== id
      );

      setProductos(nuevosProductos);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f4f6f9',
      padding: '40px',
      fontFamily: 'Arial'
    }}>

      <div style={{
        maxWidth: '850px',
        margin: 'auto',
        background: 'white',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>

        <h1 style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#222'
        }}>
          Sistema de Inventario
        </h1>

        <form
          onSubmit={agregarProducto}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            marginBottom: '30px'
          }}
        >

          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            style={inputStyle}
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            style={buttonStyle}
          >
            Guardar Producto
          </button>

        </form>

        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>

          <thead>
            <tr style={{
              backgroundColor: '#007bff',
              color: 'white'
            }}>
              <th style={thtd}>Producto</th>
              <th style={thtd}>Precio</th>
              <th style={thtd}>Stock</th>
              <th style={thtd}>Acciones</th>
            </tr>
          </thead>

          <tbody>

            {productos.map((p) => (
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
                    Eliminar
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

const inputStyle = {
  padding: '14px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '16px',
  outline: 'none'
};

const buttonStyle = {
  padding: '14px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const deleteButton = {
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '8px 14px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const thtd = {
  padding: '14px',
  border: '1px solid #ddd',
  textAlign: 'center'
};