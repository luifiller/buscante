import { LivroService } from './../../service/livro.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];

  campoBusca: string = '';

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.service.buscar(this.campoBusca).subscribe({
      // O código comentado abaixo está depreciado, portanto, o descomentado está de acordo com as exigências atuais do RxJS.
      // (retornoAPI) => console.log(retornoAPI),
      // (error) => console.log(error),

      next: retornoAPI => console.log(retornoAPI),
      error: erro => console.error(erro),
      complete: () => console.log('Observable completado')
    });
  }
}



