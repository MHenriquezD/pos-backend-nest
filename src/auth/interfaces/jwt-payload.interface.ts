export interface JwtPayload {
  identidad: string;
  correo: string;
  nombre: string;
  apellido: string;
  activo: boolean;
}
