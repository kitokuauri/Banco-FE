import { Cliente } from "../cliente/cliente.model";

export class Mensaje {
    constructor(
        public id: number,
        public id_remitente: Cliente,
        public id_destinatario: Cliente,
        public mensaje: String,
        public fecha: Date
    ) { }
}