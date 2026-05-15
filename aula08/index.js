

function soma(){
    var campo1 = document.getElementById("campo1")
    var campo2 = document.getElementById("campo2")
    var resultado = document.getElementById("resultado")

    resultado.innerHTML = "Resultado: " + (Number(campo1.value) + Number(campo2.value))
}

function AddItem(){
    var campo_tarefas = document.getElementById("campo_tarefas")
    var lista = document.getElementById("Lista")
    var item = document.createElement("Li")


if (campo_tarefas.value = trim() !== ""){

    item.innerHTML = campo_tarefas.value
    lista.appendChild(item)
}
}
