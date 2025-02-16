class Tarefa {
    //construtor do objeto tarefa
    constructor(nome, descricao, data, prioridade, status) {
        this.nome = nome
        this.descricao = descricao
        this.data = data
        this.prioridade = prioridade
        this.status = status
    }
    // validando se os dados estão preenchidos
    validarDados() {
        for(let i in this) {
            if(this[i] == null || this[i] == '' || this[i] == undefined) {
                return false
            } 
        }
        return true
    }
}
//variável que recebe o valor do nome
let nomeUsuario

function salvarUsuario() {
    //atribui o valor nome para a variável guardá-lo
    nomeUsuario = document.getElementById('usuario')
}

function receberDados() {
    //guarda os dados da tarefa em variáveis pelo DOM
    let descricao = document.getElementById('descricao')
    let data = document.getElementById('data')
    let prioridade = document.getElementById('prioridade')
    let status = document.getElementById('status')
    let nome = nomeUsuario.value.toLowerCase();
    //instancia uma nova tarefa passando as variáveis com dados
    let tarefa = new Tarefa(nome, descricao.value, data.value, prioridade.value, status.value)
    console.log(tarefa)
}

//função responsável por adicionar dados a tabela de tarefas
function adicionarTarefa() {
    receberDados()
}