export class Mensaje {
    constructor(
        public id: number,
        public id_remitente: number,
        public id_destinatario: number,
        public remitente: string,
        public destinatario: string,
        public mensaje: String,
        public fecha: Date
    ) { }
}