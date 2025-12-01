// routes/productos.routes.js
import { Router } from 'express';
import * as productosController from '../controllers/productos.controller.js';
 
const productosrouter = Router();
 
/**
 * ==========================================
 * 📦 RUTAS DE PRODUCTOS
 * ==========================================
 */
 
// Obtener todos los productos
productosrouter.get('/', productosController.getProductos);

 
 
export default productosrouter;