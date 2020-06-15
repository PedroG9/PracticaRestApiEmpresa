const router = require('express').Router();

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
router.post('/', async (req, res) => {
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