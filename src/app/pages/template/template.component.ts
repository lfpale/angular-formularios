import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {PaisService} from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Luis Felipe',
    apellido: 'Palacio Eusse',
    correo: 'luifepal@bancolombia.com.co',
    pais: '',
    genero: 'M'
  };
  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(paises => {
      this.paises = paises.map( (dat: any) => {
        return {
          nombre: dat.name,
          codigo: dat.alpha3Code
        };
      });
      this.paises.unshift({
        nombre: 'Seleccione el país',
        codigo: ''
      });
    });
  }

  guardar(forma: NgForm): void{
    if (forma.invalid){
      Object.values(forma.controls).forEach( control => {
        control.markAsTouched();
      });
      return;
    }else{

    }
    console.log(forma.value);
  }

}
