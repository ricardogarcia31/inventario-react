import React, { useState } from 'react';

import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaHome,
  FaSignOutAlt
} from 'react-icons/fa';

export default function App() {

  // =========================
  // LOGIN
  // =========================

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [logueado, setLogueado] = useState(false);

  // =========================
  // PANTALLAS
  // =========================

  const [pantalla, setPantalla] = useState('dashboard');

  // =========================
  // INVENTARIO
  // =========================

  const [productos, setProductos] = useState([]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');

  // =========================
  // COMPRAS
  // =========================

  const [compras, setCompras] = useState([]);

  const [proveedor, setProveedor] = useState('');
  const [productoCompra, setProductoCompra] = useState('');
  const [cantidadCompra, setCantidadCompra] = useState('');
  const [precioCompra, setPrecioCompra] = useState('');

  // =========================
  // CLIENTES
  // =========================

  const [clientes, setClientes] = useState([]);

  const [nombreCliente, setNombreCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');

  // =========================
  // LOGIN
  // =========================

  const iniciarSesion = (e) => {

    e.preventDefault();

    if (
      usuario === 'admin' &&
      password === '1234'
    ) {

      setLogueado(true);

    } else {

      alert('Usuario o contraseña incorrectos');

    }
  };

  // =========================
  // PRODUCTOS
  // =========================

  const agregarProducto = () => {

    if (
      nuevoNombre === '' ||
      nuevoPrecio === '' ||
      nuevoStock === ''
    ) {

      alert('Complete todos los campos');
      return;
    }

    const nuevoProducto = {

      id: Date.now(),

      nombre: nuevoNombre,

      precio: nuevoPrecio,

      stock: nuevoStock
    };

    setProductos([
      ...productos,
      nuevoProducto
    ]);

    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevoStock('');
  };

  const eliminarProducto = (id) => {

    setProductos(
      productos.filter(
        (producto) => producto.id !== id
      )
    );
  };

  // =========================
  // COMPRAS
  // =========================

  const agregarCompra = () => {

    if (
      proveedor === '' ||
      productoCompra === '' ||
      cantidadCompra === '' ||
      precioCompra === ''
    ) {

      alert('Complete todos los campos');
      return;
    }

    const nuevaCompra = {

      id: Date.now(),

      proveedor,

      producto: productoCompra,

      cantidad: cantidadCompra,

      precio: precioCompra,

      total:
        cantidadCompra * precioCompra
    };

    setCompras([
      ...compras,
      nuevaCompra
    ]);

    setProveedor('');
    setProductoCompra('');
    setCantidadCompra('');
    setPrecioCompra('');
  };

  // =========================
  // CLIENTES
  // =========================

  const agregarCliente = () => {

    if (
      nombreCliente === '' ||
      telefonoCliente === ''
    ) {

      alert('Complete todos los campos');
      return;
    }

    const nuevoCliente = {

      id: Date.now(),

      nombre: nombreCliente,

      telefono: telefonoCliente
    };

    setClientes([
      ...clientes,
      nuevoCliente
    ]);

    setNombreCliente('');
    setTelefonoCliente('');
  };

  // =========================
  // LOGIN SCREEN
  // =========================

  if (!logueado) {

    return (

      <div style={loginContainer}>

        <div style={loginBox}>

          <div style={logoCircle}>
            🔐
          </div>

          <h1 style={loginTitle}>
            FASTECH SYSTEM
          </h1>

          <p style={loginSubtitle}>
            Sistema de Inventario Empresarial
          </p>

          <form
            onSubmit={iniciarSesion}
            style={loginForm}
          >

            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) =>
                setUsuario(e.target.value)
              }
              style={loginInput}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={loginInput}
            />

            <button style={loginButton}>
              Iniciar Sesión
            </button>

          </form>

        </div>

      </div>
    );
  }

  // =========================
  // SISTEMA
  // =========================

  return (

    <div style={container}>

      {/* SIDEBAR */}

      <div style={sidebar}>

        <h2 style={logo}>
          FASTECH
        </h2>

        <button
          style={menuBtn}
          onClick={() => setPantalla('dashboard')}
        >
          <FaHome /> Dashboard
        </button>

        <button
          style={menuBtn}
          onClick={() => setPantalla('inventario')}
        >
          <FaBoxOpen /> Inventario
        </button>

        <button
          style={menuBtn}
          onClick={() => setPantalla('compras')}
        >
          <FaShoppingCart /> Compras
        </button>

        <button
          style={menuBtn}
          onClick={() => setPantalla('clientes')}
        >
          <FaUsers /> Clientes
        </button>

        <button
          style={menuBtn}
          onClick={() => setPantalla('reportes')}
        >
          <FaChartBar /> Reportes
        </button>

        <button
          style={menuBtn}
          onClick={() => setPantalla('configuracion')}
        >
          <FaCog /> Configuración
        </button>

        <button
          style={logoutBtn}
          onClick={() => setLogueado(false)}
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>

      </div>

      {/* CONTENIDO */}

      <div style={contenido}>

        {/* DASHBOARD */}

        {pantalla === 'dashboard' && (

          <div>

            <h1>Dashboard</h1>

            <div style={cardsContainer}>

              <div style={card}>
                <h2>{productos.length}</h2>
                <p>Productos</p>
              </div>

              <div style={card}>
                <h2>{compras.length}</h2>
                <p>Compras</p>
              </div>

              <div style={card}>
                <h2>{clientes.length}</h2>
                <p>Clientes</p>
              </div>

            </div>

          </div>

        )}

        {/* INVENTARIO */}

        {pantalla === 'inventario' && (

          <div>

            <h1>Inventario</h1>

            <div style={panel}>

              <input
                type="text"
                placeholder="Nombre producto"
                value={nuevoNombre}
                onChange={(e) =>
                  setNuevoNombre(e.target.value)
                }
                style={input}
              />

              <input
                type="number"
                placeholder="Precio"
                value={nuevoPrecio}
                onChange={(e) =>
                  setNuevoPrecio(e.target.value)
                }
                style={input}
              />

              <input
                type="number"
                placeholder="Stock"
                value={nuevoStock}
                onChange={(e) =>
                  setNuevoStock(e.target.value)
                }
                style={input}
              />

              <button
                style={btn}
                onClick={agregarProducto}
              >
                Agregar Producto
              </button>

            </div>

            <table style={table}>

              <thead>

                <tr>

                  <th style={th}>Producto</th>
                  <th style={th}>Precio</th>
                  <th style={th}>Stock</th>
                  <th style={th}>Acción</th>

                </tr>

              </thead>

              <tbody>

                {productos.map((producto) => (

                  <tr key={producto.id}>

                    <td style={td}>
                      {producto.nombre}
                    </td>

                    <td style={td}>
                      ${producto.precio}
                    </td>

                    <td style={td}>
                      {producto.stock}
                    </td>

                    <td style={td}>

                      <button
                        style={deleteBtn}
                        onClick={() =>
                          eliminarProducto(producto.id)
                        }
                      >
                        Eliminar
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* COMPRAS */}

        {pantalla === 'compras' && (

          <div>

            <h1>Compras</h1>

            <div style={panel}>

              <input
                type="text"
                placeholder="Proveedor"
                value={proveedor}
                onChange={(e) =>
                  setProveedor(e.target.value)
                }
                style={input}
              />

              <input
                type="text"
                placeholder="Producto"
                value={productoCompra}
                onChange={(e) =>
                  setProductoCompra(e.target.value)
                }
                style={input}
              />

              <input
                type="number"
                placeholder="Cantidad"
                value={cantidadCompra}
                onChange={(e) =>
                  setCantidadCompra(e.target.value)
                }
                style={input}
              />

              <input
                type="number"
                placeholder="Precio"
                value={precioCompra}
                onChange={(e) =>
                  setPrecioCompra(e.target.value)
                }
                style={input}
              />

              <button
                style={btn}
                onClick={agregarCompra}
              >
                Registrar Compra
              </button>

            </div>

            <table style={table}>

              <thead>

                <tr>

                  <th style={th}>Proveedor</th>
                  <th style={th}>Producto</th>
                  <th style={th}>Cantidad</th>
                  <th style={th}>Precio</th>
                  <th style={th}>Total</th>

                </tr>

              </thead>

              <tbody>

                {compras.map((compra) => (

                  <tr key={compra.id}>

                    <td style={td}>
                      {compra.proveedor}
                    </td>

                    <td style={td}>
                      {compra.producto}
                    </td>

                    <td style={td}>
                      {compra.cantidad}
                    </td>

                    <td style={td}>
                      ${compra.precio}
                    </td>

                    <td style={td}>
                      ${compra.total}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* CLIENTES */}

        {pantalla === 'clientes' && (

          <div>

            <h1>Clientes</h1>

            <div style={panel}>

              <input
                type="text"
                placeholder="Nombre cliente"
                value={nombreCliente}
                onChange={(e) =>
                  setNombreCliente(e.target.value)
                }
                style={input}
              />

              <input
                type="text"
                placeholder="Teléfono"
                value={telefonoCliente}
                onChange={(e) =>
                  setTelefonoCliente(e.target.value)
                }
                style={input}
              />

              <button
                style={btn}
                onClick={agregarCliente}
              >
                Agregar Cliente
              </button>

            </div>

            <table style={table}>

              <thead>

                <tr>

                  <th style={th}>Nombre</th>
                  <th style={th}>Teléfono</th>

                </tr>

              </thead>

              <tbody>

                {clientes.map((cliente) => (

                  <tr key={cliente.id}>

                    <td style={td}>
                      {cliente.nombre}
                    </td>

                    <td style={td}>
                      {cliente.telefono}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

        {/* REPORTES */}

        {pantalla === 'reportes' && (

          <div>

            <h1>Reportes</h1>

            <div style={cardsContainer}>

              <div style={card}>
                <h2>{productos.length}</h2>
                <p>Productos Registrados</p>
              </div>

              <div style={card}>
                <h2>{compras.length}</h2>
                <p>Compras Registradas</p>
              </div>

              <div style={card}>
                <h2>{clientes.length}</h2>
                <p>Clientes Registrados</p>
              </div>

            </div>

          </div>

        )}

        {/* CONFIGURACIÓN */}

        {pantalla === 'configuracion' && (

          <div>

            <h1>Configuración</h1>

            <div style={panel}>

              <input
                type="text"
                placeholder="Nombre empresa"
                style={input}
              />

              <input
                type="email"
                placeholder="Correo"
                style={input}
              />

              <button style={btn}>
                Guardar Configuración
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

// =========================
// ESTILOS
// =========================

const loginContainer = {
  minHeight: '100vh',
  background:
    'linear-gradient(135deg,#141e30,#243b55)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const loginBox = {
  width: '400px',
  background: 'white',
  borderRadius: '25px',
  padding: '40px',
  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
  textAlign: 'center'
};

const logoCircle = {
  width: '90px',
  height: '90px',
  background:
    'linear-gradient(135deg,#2563eb,#00c6ff)',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  fontSize: '40px',
  color: 'white',
  marginBottom: '20px'
};

const loginTitle = {
  fontSize: '32px'
};

const loginSubtitle = {
  color: '#6b7280',
  marginBottom: '30px'
};

const loginForm = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
};

const loginInput = {
  padding: '15px',
  borderRadius: '12px',
  border: '1px solid #ccc'
};

const loginButton = {
  padding: '15px',
  border: 'none',
  borderRadius: '12px',
  background:
    'linear-gradient(135deg,#2563eb,#00c6ff)',
  color: 'white',
  cursor: 'pointer'
};

const container = {
  display: 'flex',
  minHeight: '100vh',
  fontFamily: 'Arial'
};

const sidebar = {
  width: '250px',
  background: '#111827',
  color: 'white',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const logo = {
  textAlign: 'center'
};

const menuBtn = {
  background: '#1f2937',
  color: 'white',
  border: 'none',
  padding: '15px',
  borderRadius: '10px',
  cursor: 'pointer',
  textAlign: 'left'
};

const logoutBtn = {
  marginTop: 'auto',
  background: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '15px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const contenido = {
  flex: 1,
  padding: '30px',
  background: '#f3f4f6'
};

const cardsContainer = {
  display: 'flex',
  gap: '20px',
  marginTop: '20px'
};

const card = {
  background: 'white',
  padding: '25px',
  borderRadius: '15px',
  flex: 1,
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
};

const panel = {
  background: 'white',
  padding: '25px',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  maxWidth: '500px',
  marginBottom: '20px'
};

const input = {
  padding: '15px',
  borderRadius: '10px',
  border: '1px solid #ccc'
};

const btn = {
  padding: '15px',
  border: 'none',
  background: '#2563eb',
  color: 'white',
  borderRadius: '10px',
  cursor: 'pointer'
};

const deleteBtn = {
  background: '#dc2626',
  color: 'white',
  border: 'none',
  padding: '10px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  background: 'white'
};

const th = {
  padding: '15px',
  background: '#2563eb',
  color: 'white'
};

const td = {
  padding: '15px',
  borderBottom: '1px solid #ddd'
};