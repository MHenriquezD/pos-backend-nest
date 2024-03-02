import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Product {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Llave priamaria de la tabla productos',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nombre del producto',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Descripcion del producto',
  })
  creado_por: string;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Descripcion del producto',
  })
  fecha_creacion: Date;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Descripcion del producto',
  })
  fecha_modificacion: Date;
}
