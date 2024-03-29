import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  semTarefas: boolean = false
  tarefa:string = ""
  tarefas: any[] = []
  numeroDias:number = 0

  verificaTarefas = () => {
    if(this.tarefas.length <= 0){
      this.semTarefas = true
    } else {
      this.semTarefas = false
    }
  }

  recuperaDados = () =>{
    let tarefasStorage:any = localStorage.getItem("tarefas")
    if(tarefasStorage != null){
      if(JSON.parse(tarefasStorage).length > 0){
        this.tarefas = JSON.parse(tarefasStorage)
      }
    }
  }

  adicionarTarefa(x:string){
    if(x === "" || x === " "){
      this.tarefa=""
      alert("Invalid Task!")
    } else {
      this.tarefas.push({
        name: x,
        dias: 0,
        ultimaConclusao: 0,
        dia: 0
      })
    this.tarefa=""
    localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
    }

    this.verificaTarefas()
  }

  adicionarDias(i:number){
    let dia = new Date().getDate()

    if (this.tarefas[i].dia === dia){
      alert("Você só pode concluir a tarefa uma vez por dia!")
    } else {
      this.tarefas[i].dias += 1
      this.tarefas[i].ultimaConclusao = new Date().getTime()
      this.tarefas[i].dia = new Date().getDate()
      localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
    }

  }

  removerTarefa(x:number){
    this.tarefas.splice(x, 1)
    localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
    this.verificaTarefas()
  }

  verificaConstancia(){

    for (let t = 0; t < this.tarefas.length; t++){
      const dataAtual = new Date().getTime()
      const dataInicial = this.tarefas[t].ultimaConclusao

      const diferencaEmMilissegundos = dataAtual - dataInicial;

      const horasPassadas = diferencaEmMilissegundos / (1000 * 60 * 60);

      // console.log(`Tarefa ${this.tarefas[t].name} Passaram-se ${horasPassadas} horas.`);

      if (horasPassadas > 34) {
        this.tarefas[t].dias = 0
      }
    }
  }

  constructor(){

    this.recuperaDados()

    this.verificaTarefas()

    this.verificaConstancia()
  }

}
