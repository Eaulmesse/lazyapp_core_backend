import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { CreateAgentAnalysisDto } from './dto/create-agent-analysis.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('audits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel audit' })
  @ApiResponse({ status: 201, description: 'Audit créé avec succès' })
  create(@Body() createAuditDto: CreateAuditDto, @Request() req) {
    return this.auditsService.create(createAuditDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les audits de l\'utilisateur' })
  @ApiResponse({ status: 200, description: 'Liste des audits récupérée' })
  findAll(@Request() req) {
    return this.auditsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un audit spécifique' })
  @ApiResponse({ status: 200, description: 'Audit récupéré' })
  @ApiResponse({ status: 404, description: 'Audit non trouvé' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.auditsService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour un audit' })
  @ApiResponse({ status: 200, description: 'Audit mis à jour' })
  update(@Param('id') id: string, @Body() updateAuditDto: UpdateAuditDto, @Request() req) {
    return this.auditsService.update(+id, updateAuditDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un audit' })
  @ApiResponse({ status: 200, description: 'Audit supprimé' })
  remove(@Param('id') id: string, @Request() req) {
    return this.auditsService.remove(+id, req.user.id);
  }

  @Post('agent-analysis')
  @ApiOperation({ summary: 'Créer une analyse d\'agent' })
  @ApiResponse({ status: 201, description: 'Analyse d\'agent créée' })
  createAgentAnalysis(@Body() createAgentAnalysisDto: CreateAgentAnalysisDto) {
    return this.auditsService.createAgentAnalysis(createAgentAnalysisDto);
  }

  @Get(':id/status')
  @ApiOperation({ summary: 'Récupérer le statut d\'un audit' })
  @ApiResponse({ status: 200, description: 'Statut de l\'audit' })
  async getAuditStatus(@Param('id') id: string, @Request() req) {
    const audit = await this.auditsService.findOne(+id, req.user.id);
    return {
      id: audit.id,
      status: audit.status,
      lighthouse_score: audit.lighthouse_score,
      overall_score: audit.overall_score,
      created_at: audit.created_at,
      completed_at: audit.completed_at,
      has_agent_analysis: !!audit.agent_analysis,
    };
  }
}
