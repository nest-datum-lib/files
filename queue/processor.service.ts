import { Injectable } from '@nestjs/common';
import { GetDocumentProcessor } from './get-document.processor';
import { ResumeParserProcessor } from './resume-parser.processor';
import { FindImagesProcessor } from './find-images.processor';
import { DefineFaceProcessor } from './define-face.processor';
import { SavePreviousCvDataProcessor } from './save-previous-cv-data.processor';
import { ClearCvDataProcessor } from './clear-cv-data.processor';

@Injectable()
export class ProcessorService {
	constructor(
		private readonly getDocumentProcessor: GetDocumentProcessor,
		private readonly resumeParserProcessor: ResumeParserProcessor,
		private readonly findImagesProcessor: FindImagesProcessor,
		private readonly defineFaceProcessor: DefineFaceProcessor,
		private readonly savePreviousCvDataProcessor: SavePreviousCvDataProcessor,
		private readonly clearCvDataProcessor: ClearCvDataProcessor,
	) {
	}

	async listen() {
		this.getDocumentProcessor.listen();
		this.resumeParserProcessor.listen();
		this.findImagesProcessor.listen();
		this.defineFaceProcessor.listen();
		this.savePreviousCvDataProcessor.listen();
		this.clearCvDataProcessor.listen();
	}
}
