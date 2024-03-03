import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('usuarios')
export class User {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Correo del usuario',
    required: true,
  })
  @PrimaryColumn('char', {
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  correo: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  @ApiProperty({
    example: '1234567890123',
    description: 'Identidad del usuario',
    required: true,
  })
  identidad: string;

  @ApiProperty({
    example: 'Juan',
    description: 'Nombre del usuario',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ApiProperty({
    example: 'Perez',
    description: 'Apellido del usuario',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  apellido: string;

  @ApiProperty({
    example: 'Password123',
    description: 'Contraseña del usuario',
    required: true,
  })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  contrasena: string;

  @ApiProperty({
    example: 'true',
    description: 'Estado del usuario',
    required: true,
  })
  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  activo: boolean;

  @ApiProperty({
    example: '2021-10-10 10:00:00',
    description: 'Fecha de creación del usuario',
    required: true,
  })
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  fecha_creacion: Date;

  @ApiProperty({
    example: '2021-10-10 10:00:00',
    description: 'Fecha de actualización del usuario',
    required: true,
  })
  @Column({
    type: 'timestamp',
    nullable: true,
  })
  fecha_actualizacion: Date;

  @BeforeInsert()
  setDefaultDates() {
    this.fecha_creacion = new Date();
  }

  //Relacion uno a muchos con la tabla productos
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
