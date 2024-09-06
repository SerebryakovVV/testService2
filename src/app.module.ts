import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetflagController } from './setflag/setflag.controller';

@Module({
  imports: [],
  controllers: [AppController, SetflagController],
  providers: [AppService],
})
export class AppModule {}
