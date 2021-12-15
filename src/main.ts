import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter-exception/all-exception.filter';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  await app.init();
  app.enableCors();
  app.use(multer);
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.text({type: 'text/html'}))
  app.use(bodyParser.json())

  // const httpAdapterHost = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(3000);
}
bootstrap();