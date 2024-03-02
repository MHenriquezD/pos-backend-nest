import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_producto')
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Llave priamaria de la tabla detalle_producto',
  })
  id: string;

  @Column('uuid', {
    name: 'id_producto',
    nullable: false,
    comment: 'Llave foranea de la tabla productos',
  })
  id_producto: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Descripcion del producto',
  })
  descripcion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: 'Precio del producto',
  })
  precio: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Imagen del producto',
  })
  imagen: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Impuesto del producto',
  })
  impuesto: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    comment: 'estado',
  })
  visible: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Creado por',
  })
  creado_por: string;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Fecha de creacion del producto',
  })
  fecha_creacion: Date;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de modificacion del producto',
  })
  fecha_modificacion: Date;
}
