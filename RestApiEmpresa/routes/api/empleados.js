const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const Empleado = require('../../models/empleado');

// Recuperar tabla empleados
router.get('/', (req, res) => {
    Empleado.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

// Crear nuevo empleado
router.post('/', [
    check('nombre', 'Nombre es obligatorio').exists(),
    check('dni', 'DNI es obligatorio y/o debe tener un formato valido').exists(),
    check('sexo', 'Sexo es obligatorio').exists(),
    check('fecha_nacimiento', 'Fecha de nacimiento es obligatoria').exists(),
    check('salario', 'Salario es obligatorio').exists(),
    check('cargo', 'Cargo es obligatorio').exists(),
    check('departamento_id', 'Departamento es obligatorio').exists(),
    check('jefe_id', 'Jefe_id es obligatorio y/o null').exists()
    ], async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.json(errores.array());
    }

    const result = await Empleado.create(req.body);
    if (result['affectedRows'] === 1) {
        const empleado = await Empleado.getById(result['insertId']);
        res.json({ success: 'Empleado creado', empleado: empleado });
    } else {
        res.json({ error: 'Empleado no creado' });
    }
});

// Editar empleado
router.put('/:idEmpleado', async (req, res) => {
    const result = await Empleado.updateById(req.params.idEmpleado, req.body);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Empleado actualizado' });
    }else {
        res.json({ error: 'Empleado no actualizado' });
    }
});

// Borrar empleado
router.delete('/:idEmpleado', async (req, res) => {
    const empleado = await Empleado.getById(req.params.idEmpleado);
    const result = await Empleado.deleteById(req.params.idEmpleado);
    if (result['affectedRows'] === 1){
        res.json({ success: 'Empleado eliminado', empleadoDeleted: empleado });
    }else {
        res.json({ error: 'Empleado no eliminado' });
    }
});

module.exports = router;