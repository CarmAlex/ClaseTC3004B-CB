import React from 'react';
const UsuarioItem = ({ usuario, onDelete, onEdit }) => {
    return (
        <div className="usuario-item">
            <div className="usuario-info">
                <h3>{usuario.nombre}</h3>
                <p><strong>Correo:</strong> {usuario.correo || 'No especificado'}</p>
                <p><strong>Fecha de registro:</strong> {usuario.fecha ? new Date(usuario.fecha).toLocaleDateString() : 'No especificada'}</p>
            </div>
            <div className="usuario-actions">
                <button onClick={onEdit} className="edit-btn">Editar</button>
                <button onClick={onDelete} className="delete-btn">Eliminar</button>
            </div>
        </div>
    );
};
export default UsuarioItem;