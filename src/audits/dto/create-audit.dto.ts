import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAuditDto {
  @ApiProperty({ description: 'ID du site à auditer' })
  @IsNumber()
  site_id: number;

  @ApiProperty({ description: 'URL du site à auditer (optionnel si site_id fourni)' })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ description: 'Configuration Lighthouse personnalisée', required: false })
  @IsOptional()
  lighthouse_config?: any;
}


