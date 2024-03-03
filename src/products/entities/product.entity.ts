import { ApiProperty } from '@nestjs/swagger';
import { ProductDetail } from 'src/product-detail/entities/product-detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productos')
export class Product {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Llave priamaria de la tabla productos',
  })
  @ApiProperty({
    description: 'Identificador del producto',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nombre del producto',
  })
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Producto 1',
  })
  nombre: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Descripcion del producto',
  })
  @ApiProperty({
    description: 'Creador del producto',
    example: 'usuario@gmail.com',
  })
  creado_por: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
    comment: 'Estado del producto',
  })
  @ApiProperty({
    description: 'Estado del producto',
    example: true,
  })
  visible: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    comment: 'Descripcion del producto',
  })
  @ApiProperty({
    description: 'Fecha de creacion del producto',
    example: '2021-09-01',
  })
  fecha_creacion: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Descripcion del producto',
  })
  @ApiProperty({
    description: 'Fecha de modificacion del producto',
    example: '2021-09-01',
  })
  fecha_modificacion: Date;

  @BeforeInsert()
  setDefaults() {
    this.fecha_creacion = new Date();
    this.visible = true;
  }

  //Relacion muchos a uno con la tabla usuarios
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'creado_por' })
  user: User;

  //Relacion 1:1 con la tabla detalles_productos
  @OneToMany(() => ProductDetail, (productDetail) => productDetail.product)
  productDetails: ProductDetail[];
}
