let Cadastro = []
Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'))
let v = 0
function Cadastra(){

    let nome = document.getElementById('txtnome').value;
    let email = document.getElementById('txtemail').value;
    let senha = document.getElementById('txtsenha').value;
    let telefone = document.getElementById('txttelefone').value;
    let endereco = document.getElementById('txtendereco').value;
    let status = "Ativo";

 if(nome == "" || email == "" || senha == "" || telefone == "" || endereco == ""){
    alert('digite todos os campos')
    }else{
        if(!localStorage.getItem('CadastroCliente')){
            localStorage.setItem('CadastroCliente', '[]')
        }
            Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'))
            Cadastro.forEach(element => {
                if(element.email == email){
                    v = 1
                }
            });
            if( v == 1){
                alert('email ja cadastrado')
                v = 0;
            }else{
                let id = Cadastro.length;
                var Cliente = {
                    id: id++,nome,email,senha,telefone,endereco,status
                }
                Cadastro.push(Cliente)
                localStorage.setItem('CadastroCliente',JSON.stringify(Cadastro))
                v = 0
            }
        Limpar()
    }
}

function Logar(){
    let email = document.getElementById('txtlemail').value;
    let senha = document.getElementById('txtlsenha').value;
    let csenha = ''
    let nome = ''
    let id = ''

    Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));

    if(email == "" || email == null || senha == "" || senha == null){
        alert('Digite todos os campos')
    }
    Cadastro.forEach(element => {
        if(element.email == email && element.senha == senha){
            nome = element.nome
            csenha = senha
            id = element.id
        }
    });
    if(csenha != ''){
            localStorage.setItem('UsuarioLogado',email)
            localStorage.setItem('NomeLogado',nome)
            localStorage.setItem('IdAtual',id)
            window.location.replace('index.html')
        }else{
            alert("Cadastro não encontrado")
        }
        
    }


function Limpar(){
    var array = document.getElementsByTagName("input");
    for(Itens of array){
        Itens.value = "";
    }
}

function logout(){

    let logout = confirm('Você deseja realmente sair?')

    if(logout){
        let usuario = localStorage.getItem('UsuarioLogado')
        let nomeUsuario = localStorage.getItem('NomeLogado')
        let idAtual = localStorage.getItem('IdAtual')
    
        usuario = '[]'
        nomeUsuario = '[]'
        idAtual = '[]'
    
        localStorage.setItem('UsuarioLogado',usuario)
        localStorage.setItem('NomeLogado',nomeUsuario)
        localStorage.setItem('IdAtual',idAtual)
        window.location.reload('index.html')
    }
}

function alterarSenha(){

    Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'))
    id = JSON.parse(localStorage.getItem('IdAtual'))

        if(id){
            alert('faça Login Primeiro')
        }else{
            window.location.assign('alterarsenha.html')
        }
        if(Cadastro[id].senha != document.getElementById('txtsenha').value){
            alert('Senha digitada não bate com a atual')
        }else if(Cadastro[id].senha == document.getElementById('txtrnsenha').value){
            alert('Nova senha não pode ser igual a antiga')
        }else if(document.getElementById('txtnsenha').value != document.getElementById('txtrnsenha').value){
            alert('As senha não são iguais')
        }else if(document.getElementById('txtsenha').value == "" || document.getElementById('txtnsenha').value == "" || document.getElementById('txtrnsenha').value == "" ){
            alert('senha não pode ser vazia')
        }else{
            Cadastro[id].senha = document.getElementById('txtrnsenha').value
            localStorage.setItem('CadastroCliente',JSON.stringify(Cadastro))
            window.location.replace('index.html')
            alert('Senha alterada com sucesso')
        }   
}