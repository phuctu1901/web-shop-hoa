import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { UploadModule } from './upload/upload.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3307'),
      username: process.env.DB_USER || 'bloomstore',
      password: process.env.DB_PASS || 'bloomstore_pass',
      database: process.env.DB_NAME || 'bloomstore',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      charset: 'utf8mb4',
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public', 'admin'),
        serveRoot: '/quanly',
        serveStaticOptions: {
          index: ['index.html'],
        },
      },
      {
        rootPath: join(__dirname, '..', 'public', 'uploads'),
        serveRoot: '/uploads',
        serveStaticOptions: {
          index: false,
          maxAge: '30d',
        },
      },
    ),
    CategoriesModule,
    ProductsModule,
    ReviewsModule,
    AuthModule,
    SettingsModule,
    UploadModule,
    GalleryModule,
  ],
})
export class AppModule { }
