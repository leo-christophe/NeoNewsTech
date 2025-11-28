import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Ajouter le pipe de validation global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Retire automatiquement les champs qui ne sont pas dans le DTO
      forbidNonWhitelisted: true, // Renvoie une erreur si on envoie un champ inconnu
      transform: true, // Transforme automatiquement les types (ex: string -> Date si configuré)
    }),
  );

  // Module de rechargement à chaud
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
