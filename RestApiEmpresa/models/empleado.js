const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados', (err, rows) => {
        if (err) reject(err)
        resolve(rows);
        });
    });
    
};

const create = ({ nombre, dni, sexo, fecha_nacimiento, fecha_incorporacion, salario, cargo, departamento_id, jefe_id }) => { 
    return new Promise ((resolve, reject) => {
        db.query('insert into empleados (nombre, dni, sexo, fecha_nacimiento, fecha_incorporacion, salario, cargo, departamento_id, jefe_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [nombre, dni, sexo, fecha_nacimiento, fecha_incorporacion, salario, cargo, departamento_id, jefe_id],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });

};

const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from empleados where id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id no existe');
            resolve(rows[0]);
        })
    });
};

const deleteById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from empleados where id = ?', [pEmpleadoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const updateById = (pEmpleadoId, { nombre, dni, sexo, fecha_nacimiento, salario, cargo, departamento_id, jefe_id }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update clientes set nombre = ?, dni = ?, sexo = ?, fecha_nacimiento = ?, salario = ?, cargo = ?, departamento_id = ?, jefe_id = ? where id = ?',
            [nombre, dni, sexo, fecha_nacimiento, salario, cargo, departamento_id, jefe_id, pEmpleadoId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}

module.exports = {
    getAll, create, getById, deleteById, updateById
}