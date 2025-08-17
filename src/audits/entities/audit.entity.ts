import { ApiProperty } from '@nestjs/swagger';
import { AgentAnalysis } from './agent-analysis.entity';

export class Audit {
  @ApiProperty({ description: 'ID unique de l\'audit' })
  id: number;

  @ApiProperty({ description: 'ID de l\'utilisateur propriétaire' })
  user_id: number;

  @ApiProperty({ description: 'ID du site audité' })
  site_id: number;

  @ApiProperty({ 
    description: 'Statut de l\'audit', 
    enum: ['pending', 'running', 'completed', 'failed'],
    example: 'pending'
  })
  status: string;

  @ApiProperty({ 
    description: 'Score Lighthouse (0-100)', 
    required: false,
    example: 85.5
  })
  lighthouse_score?: number;

  @ApiProperty({ 
    description: 'Données brutes de Lighthouse', 
    required: false,
    example: {
      performance: 85,
      accessibility: 92,
      bestPractices: 88,
      seo: 95,
      categories: {
        performance: { score: 0.85 },
        accessibility: { score: 0.92 },
        'best-practices': { score: 0.88 },
        seo: { score: 0.95 }
      }
    }
  })
  lighthouse_data?: any;

  @ApiProperty({ 
    description: 'Score global combiné (0-100)', 
    required: false,
    example: 90.2
  })
  overall_score?: number;

  @ApiProperty({ 
    description: 'Date de création',
    example: '2024-01-15T10:30:00Z'
  })
  created_at: Date;

  @ApiProperty({ 
    description: 'Date de mise à jour',
    example: '2024-01-15T10:35:00Z'
  })
  updated_at: Date;

  @ApiProperty({ 
    description: 'Date de completion', 
    required: false,
    example: '2024-01-15T10:35:00Z'
  })
  completed_at?: Date;

  @ApiProperty({ 
    description: 'Analyse de l\'agent associée', 
    required: false,
    type: () => AgentAnalysis
  })
  agent_analysis?: AgentAnalysis;

  // Relations (optionnelles selon le contexte)
  @ApiProperty({ 
    description: 'Site audité', 
    required: false
  })
  site?: any;

  @ApiProperty({ 
    description: 'Utilisateur propriétaire', 
    required: false
  })
  user?: any;
}
