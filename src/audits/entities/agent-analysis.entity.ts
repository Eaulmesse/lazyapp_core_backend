import { ApiProperty } from '@nestjs/swagger';

export class AgentAnalysis {
  @ApiProperty({ description: 'ID unique de l\'analyse' })
  id: number;

  @ApiProperty({ description: 'ID de l\'audit associé' })
  audit_id: number;

  @ApiProperty({ description: 'Version de l\'agent utilisé' })
  agent_version: string;

  @ApiProperty({ description: 'Données d\'analyse complètes' })
  analysis_data: any;

  @ApiProperty({ description: 'Recommandations spécifiques' })
  recommendations: any;

  @ApiProperty({ description: 'Problèmes prioritaires', required: false })
  priority_issues?: any;

  @ApiProperty({ description: 'Score d\'amélioration suggéré', required: false })
  improvement_score?: number;

  @ApiProperty({ description: 'Temps de traitement en ms', required: false })
  processing_time?: number;

  @ApiProperty({ description: 'Date de création' })
  created_at: Date;
}
