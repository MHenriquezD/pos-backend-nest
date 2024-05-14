import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/company/entities/company.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalle_empresa')
export class CompanyDetail {
  @PrimaryGeneratedColumn('increment', {
    name: 'id',
    comment: 'Unique identifier',
  })
  @ApiProperty({
    description: 'Identificador único de la empresa',
    example: '1',
  })
  id: number;

  @Column({
    name: 'id_empresa',
    type: 'uuid',
    nullable: false,
    comment: 'Identificador de la empresa',
  })
  @ApiProperty({
    description: 'Identificador de la empresa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id_empresa: string;

  @Column({
    name: 'correlativo',
    type: 'bigint',
    nullable: true,
    comment: 'Numero de correlativo de la empresa',
  })
  @ApiProperty({
    description: 'Numero de correlativo de la empresa',
    example: '1',
  })
  correlativo: number;

  @Column({
    name: 'creado_por',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Usuario que creo el registro',
  })
  @ApiProperty({
    description: 'Usuario que creo el registro',
    example: 'admin',
  })
  creado_por: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    nullable: false,
    comment: 'Fecha de creación del registro',
  })
  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '2021-10-10 12:00:00',
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
    example: '2021-10-10 12:00:00',
  })
  fecha_modificado: Date;

  @Column({
    name: 'modificado_por',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Usuario que modifico el registro',
  })
  @ApiProperty({
    description: 'Usuario que modifico el registro',
    example: 'admin',
  })
  modificado_por: string;

  @BeforeInsert()
  setDefaults() {
    this.fecha_creacion = new Date();
  }

  @ManyToOne(() => Company, (company) => company.companyDetails)
  @JoinColumn({ name: 'id_empresa' })
  company: Company;
}
