import React, { useState, useEffect } from 'react';
import { createUsuario, updateUsuario } from '../services/api.js';
const UsuarioForm = ({ usuario, onSubmitSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        password: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (usuario) {
            setFormData({
                nombre: usuario.nombre || '',
                correo: usuario.correo || '',
                password: usuario.password || ''
            });
        }
    }, [usuario]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) {
            setError('El nombre del usuario es obligatorio');
            return;
        }
        if (!formData.password.trim()) {
            setError('La contraseña del usuario es obligatoria');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            if (usuario) {
                await updateUsuario(usuario.id, formData);
            } else {
                await createUsuario(formData);
            }
            setFormData({ nombre: '', correo: '', password: '' });
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (err) {
            setError('Error al guardar el usuario');
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="usuario-form">
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <label htmlFor="nombre">Nombre*:</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre}
                    onChange={handleChange} disabled={submitting} required />
            </div>
            <div className="form-group">
                <label htmlFor="correo">Correo:</label>
                <input type="email" id="correo" name="correo" value={formData.correo}
                    onChange={handleChange} disabled={submitting} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña*:</label>
                <input type="password" id="password" name="password" value={formData.password}
                    onChange={handleChange} disabled={submitting} required />
            </div>
            <div className="form-actions">
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} disabled={submitting}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};
export default UsuarioForm;
