import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { promises as fs } from 'fs';
import { marked } from 'marked';

@ApiTags('app')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'главная страница' })
  @ApiResponse({
    status: 200,
    description: 'Вернёт содержимое README.md',
  })
  async getReadme(): Promise<string> {
    const readmeContent = await fs.readFile('README.md', 'utf-8');
    const addon =
      '<h3 style="color:green"> Вы зашли на запущенный сервер </h3>';
    return addon + marked(readmeContent);
  }
}
