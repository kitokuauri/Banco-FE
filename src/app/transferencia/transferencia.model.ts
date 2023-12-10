import { Cliente } from "../cliente/cliente.model";

export class Transferencia {
    constructor(
        public id: number,
        public id_remitente: Cliente,
        public id_destinatario: Cliente,
        public cantidad: number,
        public fecha: Date,
        public mensaje: String
    ) { }
}