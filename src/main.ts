import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import { ConfigService } from '@nestjs/config';
import { ServiceAccount } from 'firebase-admin';
import * as firebase from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const configService: ConfigService = app.get(ConfigService);

  const firebaseConfig: ServiceAccount = {
    "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
    "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(firebaseConfig),
    databaseURL: "https://xxxxx.firebaseio.com",
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