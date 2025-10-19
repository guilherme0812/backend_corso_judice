import { DocumentService } from './document.service';
import { FastifyReply, FastifyRequest } from 'fastify';

const documentService = new DocumentService();
export class DocumentController {
    async uploadAndReplace(request: FastifyRequest, reply: FastifyReply) {
        try {
            const file = await request.file();

            if (!file) {
                return reply.status(400).send({ message: 'Arquivo .docx é obrigatório.' });
            }

            const buffer = await file.toBuffer();

            // Os campos de texto do form vêm em file.fields
            const fields = file.fields;

            let parsedData: Record<string, any> = {};

            // `fields.data` pode ser Multipart ou Multipart[]
            const dataField = fields?.data;

            if (Array.isArray(dataField)) {
                // caso raro: múltiplos campos com o mesmo nome
                parsedData = JSON.parse((dataField[0] as any)?.value);
            } else if (dataField && 'value' in dataField) {
                parsedData = JSON.parse(dataField.value as string);
            }

            const newFile = await documentService.replacePlaceholders(buffer, parsedData);

            reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            reply.header('Content-Disposition', 'attachment; filename=documento-gerado.docx');

            return reply.send(newFile);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ message: 'Erro ao processar o documento.' });
        }
    }
}
