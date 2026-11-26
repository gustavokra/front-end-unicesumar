const cep = document.getElementById("cep");
const logradouro = document.getElementById("logradouro");
const bairro = document.getElementById("bairro");
const localidade = document.getElementById("localidade");
const estado = document.getElementById("estado");

cep.addEventListener("blur", async () => {
    const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

    const data = await response.json();

    logradouro.value = data.logradouro;
    bairro.value = data.bairro;
    localidade.value = data.localidade;
    estado.value = data.uf;

})