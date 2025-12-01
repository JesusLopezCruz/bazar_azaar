// models/clientes.model.js
// Modelo orientado a registro, login y consulta de perfil
// Adaptado a la guía oficial del proyecto BAZAR

import pool from '../config/db.js';

/**
 * Buscar cliente por email
 * ------------------------
 * Se utiliza cuando el usuario intenta iniciar sesión.
 * Devuelve:
 *  - id, nombre, email, password_hash, rol, activo
 *  - undefined si el email no existe
 */
export async function buscarPorEmail(email) {
  const [rows] = await pool.query(
    'SELECT id, nombre, email, password, creado_en FROM clientes WHERE email = ?',
    [email]
  );
  return rows[0];
}

/**
 * Crear nuevo cliente (registro)
 * ------------------------------
 * Recibe: nombre, email, passwordHash (bcrypt)
 * Inserta un nuevo cliente con:
 *  - email normalizado
 *  - rol 'cliente'
 *  - activo = 1
 */
export async function crearCliente({ nombre, email, password }) {
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, email, password) VALUES (?, ?, ?)',
    [nombre, email, password]
  );

  return {
    insertId: result.insertId,
    id: result.insertId,
    nombre,
    email
  };
}

/**
 * Obtener datos del perfil
 * ------------------------
 * Esta función se usa para la página de perfil.
 * (Recordemos que el usuario no puede editar sus datos
 * en este proyecto, solo verlos).
 */
export async function obtenerPerfil(idCliente) {
  const [rows] = await pool.query(
    `
      SELECT 
        id,
        nombre,
        email,
        domicilio,
        telefono,
        fecha_registro,
        rol
      FROM clientes
      WHERE id = ?
    `,
    [idCliente]
  );

  return rows[0];
}

export default {
  buscarPorEmail,
  crearCliente,
  obtenerPerfil
};