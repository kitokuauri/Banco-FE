export class Transferencia {
    constructor(
        public id: number,
        public id_remitente: number,
        public id_destinatario: number,
        public remitente: string,
        public destinatario: string,
        public cantidad: number,
        public fecha: Date,
        public mensaje: String
    ) { }
}