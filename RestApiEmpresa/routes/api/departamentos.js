const router = require('express').Router();

const Departamento = require('../../models/departamento');

// Recuperar la tabla departamento
router.get('/', (req, res) => {
    Departamento.getAll()
        .then((rows) => {
            res.json(rows);
        })
        .catch((err) => {
            res.json({ error: err.message });
        });
});

// Crear nuevo departamento
router.post('/', async (req, res) => {
    const result = await Departamento.create(req.body);
    if (result['affectedRows'] === 1) {
        const departamento = await Departamento.getById(result['insertId']);
        res.json({ success: 'Departamento creado', departamento: departamento });
    } else {
        res.json({ error: 'Departamento no creado' });
    }
});

// Editar departamento
router.put('/:idDepartamento', async (req, res) => {
    const result = await Departamento.updateById(req.params.idDepartamento, req.body);
    if(result['affectedRows'] === 1) {
        res.json({ success: 'Departamento actualizado' });
    }else {
        res.json({ error: 'Departamento no actualizado' });
    }
});

// Borrar departamento
router.delete('/:idDepartamento', async (req, res) => {
    const departamento = await Departamento.getById(req.params.idDepartamento);
    const result = await Departamento.deleteById(req.params.idDepartamento);
    if (result['affectedRows'] === 1){
        res.json({ success: 'Departamento eliminado', departamentoDeleted: departamento });
    }else {
        res.json({ error: 'Departamento no eliminado' });
    }
});

module.exports = router;