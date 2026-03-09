import React, { useState, useEffect } from 'react';
import { getUsuarios, deleteUsuario } from '../services/api';
import UsuarioItem from './CountryItem';
import UsuarioForm from './CountryForm';

const UsuarioList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const data = await getUsuarios();
            setUsuarios(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUsuarios();
    }, []);
    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await deleteUsuario(id);
                setUsuarios(usuarios.filter(usuario => usuario.id !== id));
            } catch (err) {
                setError('Error al eliminar el usuario');
            }
        }
    };
    const handleEdit = (id) => {
        setEditingId(id);
    };
    const handleCancelEdit = () => {
        setEditingId(null);
    };
    const handleFormSubmit = () => {
        fetchUsuarios();
        setEditingId(null);
    };
    if (loading) return <div>Cargando usuarios...</div>;
    if (error) return <div className="error">{error}</div>;
    return (
        <div className="usuario-list">
            <h2>Lista de Usuarios</h2>
            {!editingId && (
                <div className="new-usuario">
                    <h3>Agregar Nuevo Usuario</h3>
                    <UsuarioForm onSubmitSuccess={handleFormSubmit} />
                </div>
            )}
            <div className="usuarios">
                {usuarios.length === 0 ? (
                    <p>No hay usuarios registrados.</p>
                ) : (
                    usuarios.map(usuario => (
                        <div key={usuario.id}>
                            {editingId === usuario.id ? (
                                <div className="edit-form">
                                    <h3>Editar Usuario</h3>
                                    <UsuarioForm
                                        usuario={usuario}
                                        onSubmitSuccess={handleFormSubmit}
                                        onCancel={handleCancelEdit}
                                    />
                                </div>
                            ) : (
                                <UsuarioItem
                                    usuario={usuario}
                                    onDelete={() => handleDelete(usuario.id)}
                                    onEdit={() => handleEdit(usuario.id)}
                                />
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default UsuarioList;

