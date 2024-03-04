import { ApiProperty } from '@nestjs/swagger';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('imagenes')
export class Files {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Llave primaria de la tabla imagenes',
  })
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({
    name: 'id_detalle_producto',
    type: 'uuid',
    nullable: false,
    comment: 'Llave foranea de la tabla detalle_producto',
  })
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id_detalle_producto: string;

  @Column({
    name: 'nombre',
    type: 'uuid',
    nullable: false,
    comment: 'Nombre de la imagen',
  })
  @ApiProperty({ type: 'string', example: 'imagen.png' })
  nombre: string;

  @Column({
    name: 'nombre_completo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nombre completo de la imagen',
  })
  @ApiProperty({ type: 'string', example: 'image.png' })
  nombre_completo: string;

  @Column({ name: 'url', type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', example: 'https://www.example.com/image.png' })
  url: string;

  @Column({ name: 'creado_por', type: 'varchar', length: 255 })
  @ApiProperty({ type: 'string', example: 'example@gmail.com' })
  creado_por: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
  })
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2021-07-30T15:00:00',
  })
  fecha_creacion: Date;

  @Column({
    name: 'fecha_modificacion',
    type: 'timestamp',
    nullable: true,
  })
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2021-07-30T15:00:00',
  })
  fecha_modificacion: Date;

  @BeforeInsert()
  getCurrenDate() {
    this.fecha_creacion = new Date();
  }

  // Relacion 1:1 con la tabla detalle_producto
  @OneToOne(() => ProductDetail)
  @JoinColumn({ name: 'id_detalle_producto' })
  productDetail: ProductDetail;
}
