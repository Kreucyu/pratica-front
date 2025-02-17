class Tarefa {
    constructor(nome, descricao, data, prioridade, status) {
        this.nome = nome
        this.descricao = descricao
        this.data = data
        this.prioridade = prioridade
        this.status = status
    }
    // validando se os dados estão preenchidos
    validarDados() {
        for (let i in this) {
            if (this[i] == null || this[i] == '' || this[i] == undefined) {
                console.log(this[i])
                return false
            }
        }
        return true
    }
}

class Registro {

    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    //armazena o valor do próximo id disponível
    proximoIdDisponivel() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    //salva os dados da tarefa no LocalStorage
    salvarDados(tarefa) {
        let id = this.proximoIdDisponivel()
        localStorage.setItem(id, JSON.stringify(tarefa))
        localStorage.setItem('id', id)
    }
    //retorna todas as tarefas cadastradas
    receberTarefas() {
        let tarefas = []
        let id = localStorage.getItem('id')
        for(let i = 1; i <= id; i++) {
            let tarefa = JSON.parse(localStorage.getItem(i))
            if(tarefa === null) {
                continue
            }
            tarefa.id = i
            tarefas.push(tarefa)
        }
        return tarefas
    }

    procurar(tarefa) {
        let filtroTarefas = this.receberTarefas()
        filtroTarefas = filtroTarefas.filter(t => t.nome === nomeUsuario)
        filtroTarefas
        if (tarefa.descricao != '') {
            filtroTarefas = filtroTarefas.filter(t => t.descricao == tarefa.descricao)
        }if (tarefa.data != '') {
            filtroTarefas = filtroTarefas.filter(t => t.data == tarefa.data)
        }if (tarefa.prioridade != '') {
            filtroTarefas = filtroTarefas.filter(t => t.prioridade == tarefa.prioridade)
        }if (tarefa.status != '') {
            filtroTarefas = filtroTarefas.filter(t => t.status == tarefa.status)
        }
        return filtroTarefas
    }

    remover (id) {
        localStorage.removeItem(id)
    }

}

//objeto que envia o registro de dados ao LocalStorage
let registro = new Registro()
//variável que recebe o valor do nome
let nomeUsuario

function salvarUsuario() {
    //atribui o valor nome para a variável de teste
    let testador = document.getElementById('usuario')
    if (testador.value != '' && testador.value != null && testador.value != undefined) {
        //se o valor for válido, será atribuido ao nome
        nomeUsuario = testador.value.toLowerCase()
        sessionStorage.setItem("nome", nomeUsuario)
        receberDados(2)
    } else {
        exibirModal(1, 'erro')
    }
}

function receberDados(valor) {

    //guarda os dados da tarefa em variáveis pelo DOM
    let descricao = document.getElementById('descricao')
    let date = document.getElementById('data')
    let prioridade = document.getElementById('prioridade')
    let status = document.getElementById('status')
    //instancia uma nova tarefa passando as variáveis com dados
    let tarefa = new Tarefa(nomeUsuario, descricao.value, data.value, prioridade.value, status.value)

    switch (valor) {
        case 1:
            if (tarefa.validarDados()) {
                //envia a chamada do método que salva os dados
                registro.salvarDados(tarefa)
                exibirModal(1, 'sucesso')
                //limpa os campos
                document.getElementById('descricao').value = ''
                document.getElementById('data').value = ''
                document.getElementById('prioridade').value = ''
                document.getElementById('status').value = ''
            } else {
                exibirModal(2, 'erro')
            }
            break;
        case 2:
            let tarefas = registro.procurar(tarefa)
            exibirListaTarefas(tarefas, true)
            break;
    }


}

function exibirListaTarefas(tarefas = [], filtro = false) {
    if (tarefas.length == 0 && filtro == false) {
        tarefas = registro.receberTarefas()
    }

    let listaTarefas = document.getElementById('listaTarefas')
    listaTarefas.innerHTML = ''

    tarefas.forEach(function (t) {
        let inserirLinha = listaTarefas.insertRow()
        inserirLinha.insertCell(0).innerHTML = t.descricao
        inserirLinha.insertCell(1).innerHTML = t.data
        inserirLinha.insertCell(2).innerHTML = t.prioridade
        inserirLinha.insertCell(3).innerHTML = t.status
        let deletar = document.createElement("button")
        deletar.className = 'btn btn-primary'
        deletar.innerHTML = '<i class="fa-regular fa-trash-can"></i>'
        deletar.id = `id_tarefa_${t.id}`
        deletar.onclick = function() {
            let id = this.id.replace('id_tarefa_', '')
            registro.remover(id)
            let linha = this.closest('tr')
            if(linha) {
                linha.remove()
            }
            exibirModal(2, 'sucesso')

        }
        inserirLinha.insertCell(4).append(deletar)
    })
}

function selecionarTarefa(valor) {
    if (nomeUsuario) {
        receberDados(valor)
    } else {
        exibirModal(1, 'erro')
    }
}

function exibirModal(valor, tipo) {
    if (tipo == 'erro') {
        document.getElementById('titulo-modal').innerHTML = 'Erro!'
        document.getElementById('conteudo-modal').innerHTML = valor == 1 ? 'Insira um nome de usuário!' : 'Preencha todos os campos!'
        document.getElementById('estilo-modal').classList.add('text-danger')
        document.getElementById('botao-config').innerHTML = 'Voltar'
        document.getElementById('botao-config').classList.add('btn-danger')
        return $('#exibirModal').modal('show')
    }
    document.getElementById('titulo-modal').innerHTML = 'Sucesso!'
    document.getElementById('conteudo-modal').innerHTML = valor == 1 ? 'Sua tarefa foi adicionada com sucesso!' : 'Sua tarefa foi excluída com sucesso!'
    document.getElementById('estilo-modal').classList.add('text-success')
    document.getElementById('botao-config').innerHTML = 'Voltar'
    document.getElementById('botao-config').classList.add('btn-success')
    return $('#exibirModal').modal('show')

}


