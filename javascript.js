const msgns = [];
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

function buscaMensagem(){
    pegarMensagem = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    pegarMensagem.then(mensagens);
}

buscaMensagem()

function mensagens(resposta){

    console.log(resposta.data);
}

function enviarMensagem(){
    const mensagemDigitada = document.querySelector('input');


    let combinacaoDeMensagem = {
        from: nome,
        text: mensagemDigitada.value
    };
console.log(combinacaoDeMensagem);
    const enviaMensagem = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', combinacaoDeMensagem);
    enviaMensagem.then(console.log(enviaMensagem));
}





// const mensagem = document.querySelector('input').value;
 // console.log(mensagem); 
 // msgns.push(mensagem);
 // const item = `
 //     <li>
 //         ${mensagem}
 //     </li>
 // `;
 // const ul = document.querySelector('.chat ul');
 // console.log(ul);
 // ul.innerHTML = ul.innerHTML + item;