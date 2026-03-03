import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table, Button, Container, FormGroup,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";

const data = [
            { id: 1, nombre: "Jorge Carranza", empresa: "Tec", correo: "jorge@example.com", contraseña: "pass123" },
            { id: 2, nombre: "Ramon Velez", empresa: "Banorte", correo: "ramon@example.com", contraseña: "pass456" },
            { id: 3, nombre: "Hugo Sanchez ", empresa: "Real Madrid", correo: "hugo@example.com", contraseña: "pass789" },
            { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", correo: "rafael@example.com", contraseña: "pass321" },
            { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", correo: "carlos@example.com", contraseña: "pass654" },
            { id: 6, nombre: "N.Djokovic", empresa: "Serbia", correo: "novak@example.com", contraseña: "pass987" },
            { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", correo: "sergio@example.com", contraseña: "pass147" },
            { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing", correo: "max@example.com", contraseña: "pass258" },
            { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", correo: "sainz@example.com", contraseña: "pass369" },
        ];

class Usuarios extends React.Component {


    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            empresa: "",
            correo: "",
            contraseña: "",
        },
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].nombre = dato.nombre;
                arreglo[contador].empresa = dato.empresa;
                arreglo[contador].correo = dato.correo;
                arreglo[contador].contraseña = dato.contraseña;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };
    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {

        return (
            <>
                <Container>
                    <br />
                    <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
                    <br />
                    <br />
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Empresa</th>
                                <th>Correo</th>
                                <th>Contraseña</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.nombre}</td>
                                    <td>{dato.empresa}</td>
                                        <td>{dato.correo}</td>
                                        <td>{dato.contraseña}</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} >Editar
                                        </Button>{" "}
                                        <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div><h3>Insertar nombre</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Id: </label>
                            <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre: </label>
                            <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Empresa: </label>
                            <input className="form-control" name="empresa" type="text" onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Correo: </label>
                            <input className="form-control" name="correo" type="email" onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Contraseña: </label>
                            <input className="form-control" name="contraseña" type="password" onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
                        <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}
                        >Cancelar</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label> Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id} />
                        </FormGroup>
                        <FormGroup>
                            <label>Nombre:</label>
                            <input className="form-control" name="nombre" type="text"
                                onChange={this.handleChange} value={this.state.form.nombre} />
                        </FormGroup>
                        <FormGroup>
                            <label>Empresa:</label>
                            <input className="form-control" name="empresa" type="text"
                                onChange={this.handleChange} value={this.state.form.empresa} />
                        </FormGroup>
                        <FormGroup>
                            <label>Correo:</label>
                            <input className="form-control" name="correo" type="email"
                                onChange={this.handleChange} value={this.state.form.correo} />
                        </FormGroup>
                        <FormGroup>
                            <label>Contraseña:</label>
                            <input className="form-control" name="contraseña" type="password"
                                onChange={this.handleChange} value={this.state.form.contraseña} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)} >
                            Editar</Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
                            Cancelar</Button>
                    </ModalFooter>
                </Modal>


            </>
        );
    }

}
export default Usuarios;

