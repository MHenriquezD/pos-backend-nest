import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Files } from 'src/files/entities/file.entity';

@Entity('detalle_producto')
export class ProductDetail {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Llave priamaria de la tabla detalle_producto',
  })
  @ApiProperty({
    description: 'Identificador del detalle del producto',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  id: string;

  @Column('uuid', {
    name: 'id_producto',
    nullable: false,
    comment: 'Llave foranea de la tabla productos',
  })
  @ApiProperty({
    description: 'Identificador del producto',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  id_producto: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Descripcion del producto',
  })
  @ApiProperty({
    description: 'Descripcion del producto',
    example: 'Descripcion del producto',
  })
  descripcion: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    comment: 'Precio del producto',
  })
  @ApiProperty({
    description: 'Precio del producto',
    example: 100.0,
  })
  precio: number;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'Imagen del producto',
  })
  @ApiProperty({
    description: 'Imagen del producto',
    example: 'imagen.png',
  })
  imagen: string;

  @Column({
    type: 'integer',
    nullable: false,
    comment: 'Impuesto del producto',
  })
  @ApiProperty({
    description: 'Impuesto del producto',
    example: 0,
  })
  impuesto: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Creado por',
  })
  @ApiProperty({
    description: 'Creador del producto',
    example: 'user@user.com',
  })
  creado_por: string;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Fecha de creacion del producto',
  })
  @ApiProperty({
    description: 'Fecha de creacion del producto',
    type: 'date',
    example: new Date(),
  })
  fecha_creacion: Date;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Fecha de modificacion del producto',
  })
  @ApiProperty({
    description: 'Fecha de modificacion del producto',
    type: 'date',
    example: new Date(),
  })
  fecha_modificacion: Date;

  @BeforeInsert()
  setCreationDate() {
    this.fecha_creacion = new Date();
  }

  //Relacion 1:1 con la tabla productos
  @OneToOne(() => Product)
  @JoinColumn({ name: 'id_producto' })
  product: Product;

  // Relacion 1:1 con la tabla archivos
  // @OneToOne(() => Files)
  // @JoinColumn({ name: 'imagen' })
  // image: File;
}
