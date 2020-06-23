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
    let Contas = JSON.parse(localStorage.getItem('ContasLancadas'))

    if(localStorage.getItem('ContasLancadas') == null){
      localStorage.setItem('ContasLancadas',"[]")
      let Contas = JSON.parse(localStorage.getItem('ContasLancadas'))
      let id = Date.now()
      let Contaid = document.getElementById('txtcontanome').value
      let valor = document.getElementById('txtvalor').value

      let now = new Date
      let data = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear()
      let hora = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()

      dados = localizarLancConta(Contaid)
                var LancamentoConta = {
                    id: id++ ,contarelacionada:dados,valor,data,hora
                }
                Contas.push(LancamentoConta)
                localStorage.setItem('ContasLancadas',JSON.stringify(Contas))
    }else{
      let id = Date.now()
      let Contaid = document.getElementById('txtcontanome').value
      let valor = document.getElementById('txtvalor').value
      let now = new Date
      let data = now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear()
      let hora = now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()

      dados = localizarLancConta(Contaid)
                var LancamentoConta = {
                  id: id++ ,contarelacionada:dados,valor,data,hora
                }
                Contas.push(LancamentoConta)
                localStorage.setItem('ContasLancadas',JSON.stringify(Contas))
    }
  }

  function ListarContasLancadas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    i = 0
    debugger
    while(i < ContasLancadas.length){
      let id = ContasLancadas[i].contarelacionada.id
      let local = localizarEditLancConta(id)
      if(local == null || local === "undefined"){
        ContasLancadas.splice(i,1)
      }else{
        alert('2')
        console.log(local)
        ContasLancadas[i].contarelacionada = local
      }
      i++
    }
    localStorage.setItem('ContasLancadas',JSON.stringify(ContasLancadas))
    let linha = ""
    ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))

    ContasLancadas.forEach(element => {
    let row = document.getElementById("id");
    linha += "<label>"+element.id+"</label><br>"
    row.innerHTML = linha;  
    });

    let linhan = ""
    ContasLancadas.forEach(element => {
      let row = document.getElementById("nome");
      linhan += "<label>"+element.contarelacionada.titulo+"</label><br>"
      row.innerHTML = linhan;  
      });

      let linhav = ""
    ContasLancadas.forEach(element => {
      let row = document.getElementById("valor");
      if(element.contarelacionada.tipo == "Receita"){
        linhav += "<label style='color: #13a100'>"+element.valor+"</label><br>"
        row.innerHTML = linhav; 
      }else{
        linhav += "<label style='color: #fc0303'>"+element.valor+"</label><br>"
        row.innerHTML = linhav; 
      }
      });

      let linhadata = ""
    ContasLancadas.forEach(element => {
      let row = document.getElementById("data");
      linhadata += "<label>"+element.data+"</label><br>"
      row.innerHTML = linhadata;  
      });

      let linhahora = ""
      ContasLancadas.forEach(element => {
        let row = document.getElementById("hora");
        linhahora += "<label>"+element.hora+"</label><br>"
        row.innerHTML = linhahora;  
        });

        let linhaedit = ""
        ContasLancadas.forEach(element => {
          let row = document.getElementById("edit");
          linhaedit += "<button class='btn' onclick='editarConta("+element.id+")'>Editar</button><br>"
          row.innerHTML = linhaedit;  
          });

          i = 0
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
  function localizarLancConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

    return ContasLancadas[index]
  }
  function localizarEditLancConta(id){
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

    ContasLancadas.forEach(element => {
      if(element.contarelacionada.tipo == "Receita"){
        qreceita++
      }else{
        qdespesa++
      }
      document.getElementById('qdespesa').innerHTML = qdespesa
      document.getElementById('qreceita').innerHTML = qreceita
    });
  }

  function atualizar(){

  }
