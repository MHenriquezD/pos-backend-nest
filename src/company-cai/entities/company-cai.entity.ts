import { ApiProperty } from '@nestjs/swagger';
import { Company } from 'src/company/entities/company.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cai_empresa')
export class CompanyCai {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'Unique identifier',
  })
  @ApiProperty({
    description: 'Identificador único de la empresa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @PrimaryColumn({
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
    name: 'cai',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Número de CAI',
  })
  @ApiProperty({
    description: 'Número de CAI',
    example: '6A9ASDF-15SADF-ASD548-ASODF5-ASDF54-AS',
  })
  cai: string;

  @Column({
    name: 'desde',
    type: 'bigint',
    nullable: true,
    comment: 'Inicio del correlativo',
  })
  @ApiProperty({
    description: 'Inicio del correlativo',
    example: '1',
  })
  desde: number;

  @Column({
    name: 'hasta',
    type: 'bigint',
    nullable: true,
    comment: 'Fin del correlativo',
  })
  @ApiProperty({
    description: 'Fin del correlativo',
    example: '1000',
  })
  hasta: number;

  @Column({
    name: 'fecha_inicio',
    type: 'date',
    nullable: false,
    comment: 'Fecha de inicio de vigencia',
  })
  @ApiProperty({
    description: 'Fecha de inicio de vigencia',
    example: '2021-01-01',
  })
  fecha_inicio: Date;

  @Column({
    name: 'fecha_limite',
    type: 'date',
    nullable: false,
    comment: 'Fecha de fin de vigencia',
  })
  @ApiProperty({
    description: 'Fecha de fin de vigencia',
    example: '2021-12-31',
  })
  fecha_limite: Date;

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

  @BeforeInsert()
  setDefaults() {
    this.fecha_creacion = new Date();
  }

  @ManyToOne(() => Company, (company) => company.companyDetails)
  @JoinColumn({ name: 'id_empresa' })
  company: Company;
}
