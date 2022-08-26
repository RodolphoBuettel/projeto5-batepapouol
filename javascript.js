//const msgns = [];
let nomeDoUser = {};
let nome;

perguntaNome();

function quemEntrou(nomes){
   console.log(nomes.data);
}

function armazenaNome(){

    alert('Nome já existe');
    perguntaNome();
}

function perguntaNome(){
    const guardaNome = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    
    nome = prompt("Qual seu nome?");
    console.log(nome); 

    nomeDoUser = {name: nome};
    console.log(nomeDoUser);

    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeDoUser);
    promessa.then(quemEntrou);
    promessa.catch(armazenaNome);
}

function ficouOff(){

    alert('Ficou Off');
}
function verificaStatus(){
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeDoUser);
    promessa.then(quemEntrou);
    promessa.catch(ficouOff);
}
setInterval(verificaStatus, 5000);

let pegarMensagem;
let listaMensagem = [];

function carregaMensagens(resposta){
    listaMensagem  = resposta.data;
    console.log(listaMensagem);
    renderizarMensagens(listaMensagem);
}

function tratarErro(){
    console.log(erro.response);
}

function buscaMensagem(){
    pegarMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    pegarMensagem.then(carregaMensagens);
    pegarMensagem.catch(tratarErro);
}

buscaMensagem()

function mensagemUl(mensagens){
    if(mensagens.text === "entra na sala..." || mensagens.text === "sai da sala..."){
         return `<li class = "entrouNaSala">
                   (${mensagens.time}) <span class = "negrito">${mensagens.from}</span>
                    ${mensagens.text}
                 </li>`
    }else{
        return `<li class = "conversando">
        (${mensagens.time}) <span class = "negrito">${mensagens.from}</span> para 
         <span class = "negrito">${mensagens.to}</span>:${mensagens.text}
      </li>`
    }
}

function renderizarMensagens(mensagensPassadas){
    let chat = document.querySelector('.chat ul');
    chat.innerHTML = " ";

    for(let i = 0; i < mensagensPassadas.length; i++){
        const mensagens = mensagensPassadas[i];
        chat.innerHTML = chat.innerHTML + mensagemUl(mensagens);
    }
}

setInterval(buscaMensagem, 3000);

let contemMensagem;

function enviarMensagem(){
    
    const mensagemDigitada = document.querySelector('input').value;
    console.log(mensagemDigitada);
    
    contemMensagem = {from: nome,
    to: 'Todos',
    text: mensagemDigitada,
    type: 'message'
    }
    console.log(contemMensagem);
    let enviaMensagem  = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', contemMensagem);
    enviaMensagem.then(mensagemEnviada);
    enviaMensagem.catch(console.log("Deu ruim "));
}

function mensagemEnviada(){
    const ul = document.querySelector('.chat ul');
    const item = `<li class = "conversando">
                    <span class = "negrito">${contemMensagem.from}</span> para 
                    <span class = "negrito">${contemMensagem.to}</span>: ${contemMensagem.text}
                    </li>`;
    console.log(item);              
    ul.innerHTML = ul.innerHTML + item;
    console.log(ul); 
}


