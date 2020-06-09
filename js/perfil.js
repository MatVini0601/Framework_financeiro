function verPerfil(){
    let Cadastro = JSON.parse(localStorage.getItem('CadastroCliente'));
    let id = JSON.parse(localStorage.getItem('IdAtual'))
     console.log(Cadastro[id].nome) 

    if(id == null){
        alert('faça login primeiro')
    }else{
       document.getElementById('lblnome').innerHTML = Cadastro[id].nome
       document.getElementById('lblemail').innerHTML = Cadastro[id].email
       document.getElementById('lbltelefone').innerHTML = Cadastro[id].telefone
       document.getElementById('lblendereco').innerHTML = Cadastro[id].endereco
       document.getElementById('lblstatus').innerHTML = Cadastro[id].status
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
    }
}