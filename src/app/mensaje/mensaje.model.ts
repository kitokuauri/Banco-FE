export class Mensaje {
    constructor(
        public id: number,
        public remitente: string,
        public destinatario: string,
        public mensaje: String,
        public fecha: Date
    ) { }
}