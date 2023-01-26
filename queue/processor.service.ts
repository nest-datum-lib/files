import { Injectable } from '@nestjs/common';
import { DownloadProcessor } from './download.processor';

@Injectable()
export class ProcessorService {
	constructor(
		private readonly downloadProcessor: DownloadProcessor,
	) {
	}

	async listen() {
		this.downloadProcessor.listen();
	}
}
