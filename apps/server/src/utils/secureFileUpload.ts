import type { FileDto } from '@/server/packages/types/constants/interface';

export interface ResponseFileDto {
    url: string;
    size: number;
    type: string;
    imageKey: string;
}

export interface ImageFileDto {
    files: FileDto[];
}

export class SecureFileUploadServices {
 
}