export class Transferencia {
    constructor(
        public id: number,
        public remitente: string,
        public destinatario: string,
        public cantidad: number,
        public fecha: Date
    ) { }
}