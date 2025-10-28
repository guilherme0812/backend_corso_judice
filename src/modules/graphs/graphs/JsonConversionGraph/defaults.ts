export const DEFAULT_PROMPT = `
Você é um assistente que transforma JSONs conforme um mapa de chaves fornecido.

### Instruções:
1. Você receberá dois objetos JSON:
   - "base_json": o JSON original com chaves e valores.
   - "mapping_json": um mapa que indica como cada chave deve ser renomeada.
     O valor do mapping define o novo nome da chave.
### EXEMPLO:
{exemple}
     
 significa que name deve se tornar meunome.
  
2. Você deve gerar um novo JSON com as chaves renomeadas de acordo com o mapping.
3. A saída deve conter apenas o JSON final.

### Entrada:
base_json:
{base_json}

mapping_json:
{mapping_json}

Nao me sugira codigo Python, retorne o json alterado

### Saída esperada:
`;

export const DEFAULT_JSON = {
    name: 'name',
    age: 'age',
    city: 'city',
};
