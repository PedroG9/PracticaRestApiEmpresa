const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento', (err, rows) => {
        if (err) reject(err)
        resolve(rows);
        });
    });
    
};

const create = ({ nombre, ciudad }) => { 
    return new Promise ((resolve, reject) => {
        db.query('insert into departamento (nombre, ciudad) values (?, ?)', 
            [nombre, ciudad],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });

};

const getById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from departamento where id = ?', [pDepartamentoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) reject('El id del departamento no existe');
            resolve(rows[0]);
        })
    });
};

const deleteById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from departamento where id = ?', [pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}


const updateById = (pDepartamentoId, { nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'update clientes set nombre = ?, ciudad = ? where id = ?',
            [nombre, ciudad, pDepartamentoId],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
    });
}

module.exports = {
    getAll, create, getById, deleteById, updateById
}