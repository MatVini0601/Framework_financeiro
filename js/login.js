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
        debugger
        if(localStorage.getItem('CadastroCliente') == null){
            localStorage.setItem('CadastroCliente', '[]')
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
        }else{
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
        }
        Limpar()
    }
}

function Logar(){
    let email = document.getElementById('txtlemail').value;
    let senha = document.getElementById('txtlsenha').value;

    Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));

    if(email == "" || email == null || senha == "" || senha == null){
        alert('Digite todos os campos')
    }
   Cadastro.forEach(element => {
        if(element.email == email){
           if(element.senha == senha){
               if(element.status == "Ativo"){
                    window.location.replace('index.html');
                    alert('bem vindo '+ element.nome);
                    localStorage.setItem('UsuarioLogado',element.email)
                    localStorage.setItem('NomeLogado',element.nome)
               }else{
                   alert('Você esta incapacitado de logar no momento, Por favor entre em contato com o suporte')
               }
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

function logout(){

    let logout = confirm('Você deseja realmente sair?')

    if(logout = true){
        let usuario = localStorage.getItem('UsuarioLogado')
        let nomeUsuario = localStorage.getItem('NomeLogado')
    
        usuario = '[]'
        nomeUsuario = '[]'
    
        localStorage.setItem('UsuarioLogado',usuario)
        localStorage.setItem('NomeLogado',nomeUsuario)
        window.location.reload('index.html')
    }else{

    }
}