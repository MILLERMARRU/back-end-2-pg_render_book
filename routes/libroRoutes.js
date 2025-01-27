const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const libroController = require("../controllers/libroController");

router.get("/", libroController.obtenerLibros);

router.get("/:id", libroController.obtenerLibroPorId);

router.post(
  "/",
  [
    body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
    body("autor").notEmpty().withMessage("El autor es obligatorio"),
    body("edicion").notEmpty().withMessage("La edicion es obligatorio"),
  ],
  libroController.crearLibro
);

router.put(
  "/:id",
  [
    body("titulo").notEmpty().withMessage("El titulo es obligatorio"),
    body("autor").notEmpty().withMessage("El autor es obligatorio"),
    body("edicion").notEmpty().withMessage("La edicion es obligatorio"),
  ],
  libroController.actualizarLibro
);

router.delete("/:id", libroController.eliminarLibro);

/* router.get('/one', (req, res) => {
    res.send('API one');
});

router.get('/tree', (req, res) => {
    res.send('API tree');
});
 */

module.exports = router;
