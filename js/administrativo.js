let receita = 0
let despesa = 0
let i = 0   

function openForm() {
    document.getElementById("addContas").style.display = "block";
  }

  function closeForm(){
    document.getElementById("addCategorias").style.display = "none";
  }

  function ListarContas(){
    let Contas = JSON.parse(localStorage.getItem('Contas'))
    let linhaCo = "";
    Contas.forEach(element => {
      document.getElementById('txtcontaid').value = element.id
      let row = document.getElementById("txtcontanome");
        linhaCo += "<option value="+element.id+">"+element.titulo+"</option>"
        row.innerHTML = linhaCo;
       });
  }

  function lancarContas(){
    debugger
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

      dados = localizarConta(Contaid)
                var LancamentoConta = {
                    id: id++ ,nome:dados.titulo ,categoria:dados.categoria.nome,tipo:dados.tipo,valor,data,hora
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

      dados = localizarConta(Contaid)
                var LancamentoConta = {
                    id: id++ ,nome:dados.titulo ,categoria:dados.categoria.nome,tipo:dados.tipo,valor,data,hora
                }
                Contas.push(LancamentoConta)
                localStorage.setItem('ContasLancadas',JSON.stringify(Contas))
    }
  }

  function ListarContasLancadas(){
    let ContasLancadas = JSON.parse(localStorage.getItem('ContasLancadas'))
    let linha = ""


    ContasLancadas.forEach(element => {
    let row = document.getElementById("id");
    linha += "<label>"+element.id+"</label><br>"
    row.innerHTML = linha;  
    });

    let linhan = ""
    ContasLancadas.forEach(element => {
      let row = document.getElementById("nome");
      linhan += "<label>"+element.nome+"</label><br>"
      row.innerHTML = linhan;  
      });

      let linhav = ""
    ContasLancadas.forEach(element => {
      let row = document.getElementById("valor");
      if(element.tipo == "Receita"){
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
          linhaedit += "<button class='btn' onclick='Editar("+element.id+")'>Editar</button><br>"
          row.innerHTML = linhaedit;  
          });
debugger
          i = 0
          while(i < ContasLancadas.length){
            if(ContasLancadas[i].tipo === "Receita"){
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

  function localizarConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(conta => conta.id == id)

    return ContasLancadas[index]
  }
  
  function localizarEditConta(id){
    let ContasLancadas = JSON.parse(localStorage.getItem('Contas'))
    let index = ContasLancadas.findIndex(categoria => categoria.id == id)

    return index
  }
