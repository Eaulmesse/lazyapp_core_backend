import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAuditDto: CreateAuditDto) {
    return this.auditsService.create(createAuditDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditDto: UpdateAuditDto) {
    return this.auditsService.update(+id, updateAuditDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditsService.remove(+id);
  }
}
