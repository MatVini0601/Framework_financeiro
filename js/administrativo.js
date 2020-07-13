let receita = 0
let despesa = 0
let qreceita = 0
let qdespesa = 0
let i = 0   

function openForm() {
    document.getElementById("addContas").style.display = "block";
  }

  function FormEditConta() {
    document.getElementById("addContasEdit").style.display = "block";
  }

  function closeForm(){
    document.getElementById("addCategorias").style.display = "none";
  }

  function ListarContas(){
    let Contas = JSON.parse(localStorage.getItem('Contas'))
    let linhaCo = "";
    Contas.forEach(element => {
      let row = document.getElementById("txtcontanome");
        linhaCo += "<option value="+element.id+">"+element.titulo+"</option>"
        row.innerHTML = linhaCo;
       });
  }

  function ListarEditContas(){
    let Contas = JSON.parse(localStorage.getItem('Contas'))
    let linhaCo = "";
    Contas.forEach(element => {
      let row = document.getElementById("txteditcontanome");
        linhaCo += "<option value="+element.id+">"+element.titulo+"</option>"
        row.innerHTML = linhaCo;
       });
  }

  function lancarContas(){
    debugger
   
    let contasCadastradas = JSON.parse(localStorage.getItem('Contas'))
    if(!verificar(contasCadastradas)){return}
      if(!localStorage.getItem('ContasLancadas') || localStorage.getItem('ContasLancadas') == "[]"){
        localStorage.setItem('ContasLancadas',"[]")
      }
      debugger
        let Contas = JSON.parse(localStorage.getItem('ContasLancadas'))
        let id = Date.now()
        let Cliente = localStorage.getItem('IdAtual')
        let Contaid = document.getElementById('txtcontanome').value
        let valor = document.getElementById('txtvalor').value
        let now = new Date
        let data = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear()
        let hora = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
  
        dados = localizarConta(Contaid)
                  var LancamentoConta = {
                    id: id++ ,contarelacionada:dados,valor,data,hora,Cliente
                  }
                  Contas.push(LancamentoConta)
                  localStorage.setItem('ContasLancadas',JSON.stringify(Contas))
  }

  function ListarContasLancadas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let Cliente = JSON.parse(localStorage.getItem('IdAtual'))
    let linha = "";
    let coluna = ['id','nome','valor','data','hora','edit']
    let conteudo = ""
    let i = 0
    let indice = 0

    i = 0
    if(!ContasLancadas || ContasLancadas == '[]'){
      return
    }

    debugger
    while(i < ContasLancadas.length){
      let id = ContasLancadas[i].contarelacionada.id
      let local = localizarConta(id)
      if(local == null || local === "undefined"){
        ContasLancadas.splice(i,1)
      }else{
        ContasLancadas[i].contarelacionada = local
      }
      i++
    }
    localStorage.setItem('ContasLancadas',JSON.stringify(ContasLancadas))
    ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))

    ContasLancadas.forEach(element => {
      if(element.Cliente == Cliente){
        i = 0
        while(i < 6){
          switch(coluna[i]){
            case 'id':
              conteudo = ContasLancadas[indice].id
              break;
            case 'nome':
              conteudo = ContasLancadas[indice].contarelacionada.titulo
              break;
            case 'valor':
              if(element.contarelacionada.tipo == "Receita"){
                    conteudo = "<label style='color: #13a100'>"+element.valor+"</label><br>" 
                  }else{
                    conteudo = "<label style='color: #fc0303'>"+element.valor+"</label><br>"
                  }
              break;
            case 'data':
              conteudo = ContasLancadas[indice].data
              break;
            case 'hora':
              conteudo = ContasLancadas[indice].hora
              break;
            case 'edit':
              conteudo = "<button class='btn' onclick='editarConta("+element.id+")'>Editar</button><br>"
              break;
          }
          let row = document.getElementById(coluna[i]);
          linha = "<label>"+conteudo+"</label><br>"
          i++
          row.innerHTML += linha
        }
        indice++
      } 
          });

          i = 0
          if(ContasLancadas[i].Cliente == Cliente){
            while(i < ContasLancadas.length){
              if(ContasLancadas[i].contarelacionada.tipo === "Receita"){
                receita += parseInt(ContasLancadas[i].valor)
                i++
                document.getElementById('labelavalor').innerHTML = receita
              }else{
                despesa += parseInt(ContasLancadas[i].valor)
                i++
                document.getElementById('labeladespesa').innerHTML = despesa
              }
            }
          }
        let saldo = receita - despesa
        document.getElementById('labelasaldo').innerHTML = saldo
        if(saldo <= 0){
          document.getElementById('labelasaldo').style.color = '#fc0303'
        }else{
          document.getElementById('labelasaldo').style.color = '#13a100'
        }
  }

  function editarConta(id){
    debugger
    FormEditConta()
    let Contas = JSON.parse(localStorage.getItem('Contas'))
    let conta = localizarEditConta(id)

    document.getElementById('txtcontaid').value = conta.id

    let linhacontaedit = "";
     Contas.forEach(element => {
          let row = document.getElementById("txteditcontanome");
          if(element.id === conta.contarelacionada.id){
            linhacontaedit += "<option id="+conta.contarelacionada.titulo+" value="+conta.contarelacionada.id+" selected>"+conta.contarelacionada.titulo+"</option>"
          }else{
            linhacontaedit += "<option value="+element.id+">"+element.titulo+"</option>"
          }
          row.innerHTML = linhacontaedit;
      })
    document.getElementById('txteditvalor').value = conta.valor
  }

  function SalvarConta(){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let id = document.getElementById('txtcontaid').value
    let index = localizarIndiceConta(id)

    let c = confirm('Tem certeza desta ação?')

    if(c == true){
      debugger
      ContasLancadas.forEach(element => {
        if(ContasLancadas[index].id == element.id){
          var sel = document.getElementById("txteditcontanome");
          var text = sel.options[sel.selectedIndex].value;
          let indice = localizarConta(text)
          element.contarelacionada = indice;
          element.valor = document.getElementById('txteditvalor').value
          let now = new Date
          element.data = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear()
          element.hora = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()
          localStorage.setItem('ContasLancadas',JSON.stringify(ContasLancadas))
        }
      });
    }else{
      alert('Operação cancelada')
    }
  }

  function localizarConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

    return ContasLancadas[index]
  }

  function localizarIndiceConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

    return index
  }
  
  function localizarEditConta(id){
    let Contas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let index = Contas.findIndex(conta => conta.id == id)

    return Contas[index]
  }

  function quantidade(){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let Cliente = localStorage.getItem('IdAtual')
    if(!localStorage.getItem('IdAtual') || localStorage.getItem('IdAtual') == '[]'){
      return
    }

    i = 0
    if(ContasLancadas[i].Cliente == Cliente){
      while(i < ContasLancadas.length){
        if(ContasLancadas[i].contarelacionada.tipo === "Receita"){
          receita += parseInt(ContasLancadas[i].valor)
          i++
          document.getElementById('qreceita').innerHTML = receita
        }else{
          despesa += parseInt(ContasLancadas[i].valor)
          i++
          document.getElementById('qdespesa').innerHTML = despesa
        }
        let saldo = receita - despesa
        document.getElementById('qsaldo').innerHTML = saldo
        if(saldo <= 0){
          document.getElementById('qsaldo').style.color = '#fc0303'
        }else{
          document.getElementById('qsaldo').style.color = '#13a100'
        }
      }
    }
          
  }

  function verificar(){
    let Categorias = JSON.parse(localStorage.getItem('Categorias'))
    if(Categorias){
      return true 
    }else{
      return false
    }
  }
