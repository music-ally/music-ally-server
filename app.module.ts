import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Mongoose } from 'mongoose';

@Module({
    imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI)],
})

export class AppModule {}