const fs = require('fs').promises;
const libre = require('libreoffice-convert');

(async () => {
	if (process.argv[3] === 'pdf'
		|| process.argv[3] === 'PDF') {
		libre['convertAsync'] = require('util').promisify(libre.convert);

		const docxBuf = await fs.readFile(process.argv[2]);
		const pdfBuf = await libre['convertAsync'](docxBuf, '.pdf', undefined);

		await fs.writeFile(process.argv[2], pdfBuf);
	}
})();
