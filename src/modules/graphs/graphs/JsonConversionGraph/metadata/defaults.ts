export const jsonConversionDefaults = {
    jsonConversionPrompt: `
Você é um assistente que transforma JSONs conforme um mapa de chaves fornecido.

### Instruções:
1. Você receberá dois objetos JSON:
   - "base_json": o JSON original com chaves e valores.
   - "mapping_json": um mapa que indica como cada chave deve ser renomeada.
     O valor do mapping define o novo nome da chave.
### EXEMPLO:
{exemple}
     
 significa que  deve retornar um json  con chame 'meunome' e valor 'Fulano'.
  
2. Você deve gerar um novo JSON com as chaves renomeadas de acordo com o mapping_json.
3. as chaves dos novo JSON devem ser criadas exatamente como està no mapping_json, nao coloque outra chave e nao invente nada.
4. A saída deve conter apenas o JSON final.
5. Nao me sugira codigo Python, retorne apenas json alterado sem nenhuma informaçao adicional de forma que eu consiga usar o JSON.parse

### Entrada:
base_json:
{base_json}

mapping_json:
{mapping_json}

Nao me sugira codigo Python, retorne apenas json alterado sem nenhuma informaçao adicional de forma que eu consiga usar o JSON.parse

### Saída esperada:
`,

    defaultBaseJson: {
        grantor: {
            document: 'document',
            officialId: 'officialId',
            officialIdIssuingBody: 'officialIdIssuingBody',
            officialIdissuingState: 'officialIdissuingState',
            phone: 'phone',
            email: 'email',
            addressStreet: 'addressStreet',
            addressNumber: 'addressNumber',
            addressComplement: 'addressComplement',
            addressZipCode: 'addressZipCode',
            zone: 'zone',
            birthDate: 'birthDate',
            nacionality: 'nacionality',
            maritalStatus: 'maritalStatus',
            profession: 'profession',
            stateId: 'stateId',
            countryId: 'countryId',
            name: 'name',
            city: 'city',
        },
        grantee: {
            name: 'name',
            licenceNumber: 'licenceNumber',
            licenceJurisdiction: 'licenceJurisdiction',
            licenceCountryCode: 'licenceCountryCode',
            phone: 'phone',
            email: 'email',
            nationality: 'nationality',
            maritalStatus: 'maritalStatus',
            professionalAddress: 'professionalAddress',
        },
    },
};
