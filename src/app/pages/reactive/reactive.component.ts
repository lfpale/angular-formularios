import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidadoresService} from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder, private validadores: ValidadoresService) {
    this.forma = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required, Validators.minLength(5), this.validadores.noPalacio]],
        correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$')]],
        usuario: ['', , this.validadores.existeUsuario],
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        direccion: this.fb.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required]
        }),
        pasatiempos: this.fb.array([])
      }, {
        validators: this.validadores.passwordsIguales('pass1', 'pass2')
      }
    );
    this.cargarData();
    this.crearListeners();
  }

  crearListeners(): void {
    this.forma.get('nombre')?.valueChanges.subscribe(value => console.log(value));
  }

  agregarPasatiempo(): void {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number): void {
    this.pasatiempos.removeAt(i);
  }

  cargarData(): void {
    this.forma.reset({
      nombre: 'Luis Felipe',
      apellido: 'Palacio Eusse',
      correo: 'lufepaeu@gmail.com',
      direccion: {
        distrito: 'Antioquia',
        ciudad: 'Medellín'
      }
    });
  }

  ngOnInit(): void {
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(): boolean {
    return this.forma.controls.nombre.touched && !this.forma.controls.nombre.valid;
  }

  get apellidoNoValido(): boolean {
    return this.forma.controls.apellido.touched && !this.forma.controls.apellido.valid;
  }

  get emailNoValido(): boolean {
    return this.forma.controls.correo.touched && !this.forma.controls.correo.valid;
  }

  get distritoNoValido(): any {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched;
  }

  get ciudadNoValido(): any {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched;
  }

  get usuarioNoValido(): any {
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched;
  }

  get pass1NoValido(): any {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched;
  }

  get pass2NoValido(): any {
    const pass1 = this.forma.get('pass1')?.value;
    const pass2 = this.forma.get('pass2')?.value;
    return (pass1 !== pass2);
  }

  guardar(): void {
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(obj => obj.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    this.forma.reset();
    console.log(this.forma.get('direccion.distrito'));
  }
}
