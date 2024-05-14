import { ApiProperty } from '@nestjs/swagger';
import { CompanyCai } from 'src/company-cai/entities/company-cai.entity';
import { CompanyDetail } from 'src/company-detail/entities/company-detail.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('empresa')
export class Company {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Unique identifier',
  })
  @ApiProperty({
    description: 'Identificador único de la empresa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({
    name: 'nombre',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nombre de la empresa',
  })
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Empresa de ejemplo',
  })
  nombre: string;

  @Column({
    name: 'direccion',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Dirección de la empresa',
  })
  @ApiProperty({
    description: 'Dirección de la empresa',
    example: 'Calle 123',
  })
  direccion: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Teléfono de la empresa',
  })
  @ApiProperty({
    description: 'Teléfono de la empresa',
    example: '1234567890',
  })
  telefono: string;

  @Column({
    name: 'correo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Correo de la empresa',
  })
  @ApiProperty({
    description: 'Correo de la empresa',
    example: 'empresa.correo@gmail.com',
  })
  correo: string;

  @Column({
    name: 'rtn',
    type: 'varchar',
    length: 14,
    nullable: false,
    comment: 'RTN de la empresa',
  })
  @ApiProperty({
    description: 'RTN de la empresa',
    example: '12345678901234',
  })
  rtn: string;

  @Column({
    name: 'local',
    type: 'smallint',
    nullable: true,
    comment: 'Numero de local de la empresa',
  })
  @ApiProperty({
    description: 'Numero de local de la empresa',
    example: '1',
  })
  local: number;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha de creación del registro',
  })
  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2021-01-01 00:00:00',
  })
  fecha_creacion: Date;

  @Column({
    name: 'fecha_modificado',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de modificación del registro',
  })
  @ApiProperty({
    description: 'Fecha de modificación del registro',
    example: '2021-01-01 00:00:00',
  })
  fecha_modificado: Date;

  @Column({
    name: 'fecha_eliminacion',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminación del registro',
  })
  @ApiProperty({
    description: 'Fecha de eliminación del registro',
    example: '2021-01-01 00:00:00',
  })
  fecha_eliminacion: Date;

  @Column({
    name: 'borrado',
    type: 'boolean',
    nullable: false,
    default: false,
    comment: 'Estado del registro',
  })
  @ApiProperty({
    description: 'Estado del registro',
    example: 'false',
  })
  borrado: boolean;

  @Column({
    name: 'creado_por',
    type: 'varchar',
    nullable: false,
    comment: 'Usuario que creó el registro',
  })
  @ApiProperty({
    description: 'Usuario que creó el registro',
    example: 'example@example.com',
  })
  creado_por: string;

  @Column({
    name: 'modificado_por',
    type: 'varchar',
    nullable: true,
    comment: 'Usuario que modificó el registro',
  })
  @ApiProperty({
    description: 'Usuario que modificó el registro',
    example: 'example@example.com',
  })
  modificado_por: string;

  @Column({
    name: 'eliminado_por',
    type: 'varchar',
    nullable: true,
    comment: 'Usuario que eliminó el registro',
  })
  @ApiProperty({
    description: 'Usuario que eliminó el registro',
    example: 'example@example.com',
  })
  eliminado_por: string;

  @BeforeInsert()
  setDefaultValues() {
    this.fecha_creacion = new Date();
  }

  @OneToMany(() => CompanyDetail, (companyDetail) => companyDetail.company)
  companyDetails: CompanyDetail[];

  @OneToMany(() => CompanyCai, (companyCai) => companyCai.company)
  companyCais: CompanyCai[];
}
