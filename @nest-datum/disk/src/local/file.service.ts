const fs = require('fs/promises');

import { Injectable } from '@nestjs/common';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { LocalService } from './local.service';

@Injectable()
export class FileService extends LocalService {
	public async createProcess(processedPayload: object, payload: object): Promise<object> {
		let i = 0,
			output = { files: [] };

		while (i < processedPayload['files'].length) {
			const buffer = Buffer.from(processedPayload['files'][i]['buffer']);
			let destinationPath = this.path(`${processedPayload['path']}/${processedPayload['files'][i]['originalname']}`);

			if (await fs.exists(destinationPath)) {
				if (!processedPayload['force']) {
					throw new MethodNotAllowedException(`Folder "${destinationPath}" already exists.`);
				}
				destinationPath = this.path(`${processedPayload['path']}/${this.uniqueName(processedPayload['files'][i]['originalname'])}`);
			}
			fs.createWriteStream(destinationPath).write(processedPayload['buffer']);
			output.files.push(destinationPath);

			if (processedPayload['chmod']) {
				await fs.chmod(destinationPath, processedPayload['chmod']);
			}
			i++;
		}
		return output;
	}
}
