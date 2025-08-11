import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }


  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.siteService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    return this.siteService.update(+id, updateSiteDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id);
  }
}
