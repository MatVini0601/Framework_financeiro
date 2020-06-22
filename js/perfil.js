function verPerfil(){
    let Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));
    let id = JSON.parse(localStorage.getItem('IdAtual'))
     console.log(id) 

    if(id == null || id.length == 0){
        alert('faça login primeiro')
        window.location.replace('index.html')
    }else{
       document.getElementById('lblnome').value = Cadastro[id].nome
       document.getElementById('lblemail').value = Cadastro[id].email
       document.getElementById('lbltelefone').value = Cadastro[id].telefone
       document.getElementById('lblendereco').value = Cadastro[id].endereco
       document.getElementById('lblstatus').value = Cadastro[id].status
    }
}

function alterarPerfil(){
    let Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));
    let id = JSON.parse(localStorage.getItem('IdAtual'))

    if(document.getElementById('txtnome').value == "" || document.getElementById('txtemail').value == "" || document.getElementById('txttelefone').value == "" || document.getElementById('txtendereco').value == ""){
        alert('Digite todos os campos')
    }else{
        Cadastro[id].nome = document.getElementById('txtnome').value
        Cadastro[id].email = document.getElementById('txtemail').value
        Cadastro[id].telefone = document.getElementById('txttelefone').value
        Cadastro[id].endereco = document.getElementById('txtendereco').value

        localStorage.setItem('CadastroCliente',JSON.stringify(Cadastro))
        localStorage.setItem('UsuarioLogado',Cadastro[id].email)
        localStorage.setItem('NomeLogado',Cadastro[id].nome)
        alert('Dados alterados com sucesso')
        window.location.replace('index.html')
    }
}

function editarPerfil(){
    let Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));
    let id = JSON.parse(localStorage.getItem('IdAtual'))

    if(id == null){
        alert('faça login primeiro')
    }else{
       document.getElementById('txtnome').value = Cadastro[id].nome
       document.getElementById('txtemail').value = Cadastro[id].email
       document.getElementById('txttelefone').value = Cadastro[id].telefone
       document.getElementById('txtendereco').value = Cadastro[id].endereco
    }
}