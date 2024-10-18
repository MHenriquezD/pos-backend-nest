import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Client {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Identificador único del cliente',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Nombre del cliente',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Apellido del cliente',
  })
  apellido: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Correo del cliente',
    unique: true,
  })
  correo: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Teléfono del cliente',
  })
  telefono: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: 'Identidad del cliente',
    unique: true,
  })
  identidad: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Creador del cliente',
  })
  creado_por: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: 'Fecha de creación del cliente',
  })
  fecha_creacion: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de actualización del cliente',
  })
  fecha_actualizacion: Date;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
    comment: 'Estado del cliente',
  })
  eliminado: boolean;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Eliminado por',
  })
  eliminado_por: string;

  @BeforeInsert()
  setDefaultDates() {
    this.fecha_creacion = new Date();
  }
  @BeforeInsert()
  setCorreo() {
    this.correo = this.correo.toLowerCase();
  }
}
