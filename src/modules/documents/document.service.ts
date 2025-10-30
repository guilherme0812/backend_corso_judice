import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import expressions from 'docxtemplater/expressions.js';

export class DocumentService {
    async replacePlaceholders(buffer: Buffer, data: Record<string, any>): Promise<Buffer> {
        console.log('data: ', data);
        const zip = new PizZip(buffer);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            delimiters: {
                start: '[[', // usa [[name]] ao invés de {{name}}
                end: ']]',
            },
            parser: expressions,
        });

        console.log('---- data ----', data);

        // Substitui as tags no formato {{campo}}
        doc.render(data);

        const out = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE',
        });

        return out;
    }
}
