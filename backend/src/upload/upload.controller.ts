import {
    Controller,
    Post,
    UseGuards,
    UseInterceptors,
    UploadedFiles,
    BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sharp = require('sharp');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'public', 'uploads');

@ApiTags('Upload')
@Controller('api/upload')
export class UploadController {
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload images (auto-converts to WebP for SEO)' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } },
        },
    })
    @UseInterceptors(
        FilesInterceptor('files', 10, {
            storage: diskStorage({
                destination: (_req, _file, cb) => {
                    // Ensure directory exists
                    if (!fs.existsSync(UPLOAD_DIR)) {
                        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
                    }
                    cb(null, UPLOAD_DIR);
                },
                filename: (_req, file, cb) => {
                    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
                    const ext = path.extname(file.originalname);
                    cb(null, `${uniqueName}${ext}`);
                },
            }),
            fileFilter: (_req, file, cb) => {
                const allowed = /\.(jpg|jpeg|png|gif|webp|bmp|tiff|svg)$/i;
                if (!allowed.test(path.extname(file.originalname))) {
                    return cb(new BadRequestException('Only image files are allowed'), false);
                }
                cb(null, true);
            },
            limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
        }),
    )
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException('No files uploaded');
        }

        const results = [];

        for (const file of files) {
            const webpFilename = `${path.parse(file.filename).name}.webp`;
            const webpPath = path.join(UPLOAD_DIR, webpFilename);

            try {
                // Convert to WebP with optimization
                await sharp(file.path)
                    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(webpPath);

                // Remove original if it's not already WebP
                if (file.filename !== webpFilename) {
                    fs.unlinkSync(file.path);
                }

                results.push({
                    url: `/uploads/${webpFilename}`,
                    originalName: file.originalname,
                    size: fs.statSync(webpPath).size,
                    format: 'webp',
                });
            } catch (err) {
                // If sharp fails (e.g. SVG), keep the original
                results.push({
                    url: `/uploads/${file.filename}`,
                    originalName: file.originalname,
                    size: file.size,
                    format: path.extname(file.originalname).slice(1),
                });
            }
        }

        return { files: results };
    }
}
