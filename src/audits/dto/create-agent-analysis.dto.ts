import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsObject } from 'class-validator';

export class CreateAgentAnalysisDto {
  @ApiProperty({ description: 'ID de l\'audit associé' })
  @IsNumber()
  audit_id: number;

  @ApiProperty({ description: 'Version de l\'agent utilisé' })
  @IsString()
  agent_version: string;

  @ApiProperty({ description: 'Données d\'analyse complètes' })
  @IsObject()
  analysis_data: any;

  @ApiProperty({ description: 'Recommandations spécifiques' })
  @IsObject()
  recommendations: any;

  @ApiProperty({ description: 'Problèmes prioritaires', required: false })
  @IsOptional()
  @IsObject()
  priority_issues?: any;

  @ApiProperty({ description: 'Score d\'amélioration suggéré', required: false })
  @IsOptional()
  improvement_score?: number;

  @ApiProperty({ description: 'Temps de traitement en ms', required: false })
  @IsOptional()
  processing_time?: number;
}
