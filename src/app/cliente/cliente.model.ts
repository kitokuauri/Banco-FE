import { Gestor } from "../gestor/gestor.model";

export class Cliente {
    constructor(
        public id: number,
        public id_gestor: number,
        public nombre: string,
        public apellido: string,
        public email: string
    ) {}
}