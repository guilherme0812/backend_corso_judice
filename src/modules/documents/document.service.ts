import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export class DocumentService {
    async replacePlaceholders(buffer: Buffer, data: Record<string, any>): Promise<Buffer> {
        const zip = new PizZip(buffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: {
                start: '[[', // usa [[name]] ao invés de {{name}}
                end: ']]',
            },
        });

        // Substitui as tags no formato {{campo}}
        doc.render(data);

        const out = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        return out;
    }
}
