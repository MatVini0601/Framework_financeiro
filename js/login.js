let Cadastro = []
Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'))
function Cadastra(){

    let nome = document.getElementById('txtnome').value;
    let email = document.getElementById('txtemail').value;
    let senha = document.getElementById('txtsenha').value;
    let telefone = document.getElementById('txttelefone').value;
    let endereco = document.getElementById('txtendereco').value;

 if(nome == "" || email == "" || senha == "" || telefone == "" || endereco == ""){
    alert('digite todos os campos')
    }else{
        if(localStorage.getItem('CadastroCliente') == null){
            localStorage.setItem('CadastroCliente', '[]')
            Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'))
            let id = Cadastro.length;
            var Cliente = {id: id++,nome,email,senha,telefone,endereco,status}
            Cadastro.push(Cliente)
            localStorage.setItem('CadastroCliente',JSON.stringify(Cadastro))
            Limpar()
        }else{
            let id = Cadastro.length;
            var Cliente = {id: id++,nome,email,senha,telefone,endereco,status}
            Cadastro.push(Cliente)
            localStorage.setItem('CadastroCliente',JSON.stringify(Cadastro))
            Limpar()
        }
    }
}

function Logar(){
    let email = document.getElementById('txtlemail').value;
    let senha = document.getElementById('txtlsenha').value;

    Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));
    if(email == "" || email == null || senha == "" || senha == null){
        alert('Digite a porcaria do texto seu arrombado')
    }
   Cadastro.forEach(element => {
        if(element.email == email){
           if(element.senha == senha){
            window.location.replace('index.html');
            alert('bem vindo '+ element.nome);
            localStorage.setItem('UsuarioLogado',element.email)
            localStorage.setItem('NomeLogado',element.nome)
           }else{
            alert("Cadastro não encontrado")
           }     
        }
   });

}

function Limpar(){
    var array = document.getElementsByTagName("input");
    for(Itens of array){
        Itens.value = "";
    }
}