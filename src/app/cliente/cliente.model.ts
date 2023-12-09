import { Gestor } from "../gestor/gestor.model";

export class Cliente {
    constructor(
        public id: number,
        public id_gestor: Gestor,
        public nombre: string,
        public apellido: string,
        public email: string
    ) {}
}