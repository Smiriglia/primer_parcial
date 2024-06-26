import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  usuarioSingIn = {
    email: '',
    password: '',
  };

  usuarioSingUp = {
    username: '',
    email: '',
    password: '',
  };
  errorMessageIn: String | null = null;
  errorMessageUp: String | null = null;


  

  goTo(path: string)
  {
    this.router.navigate([path]);
  }

  onSuccess()
  {
    
    this.goTo("home");
  }

  validateSingIn(email: string, password: string ) : boolean {
    if (email == "") {
      this.errorMessageIn = "Debes ingresar un email";
      return false;
    }
    if (password == "") {
      this.errorMessageIn = "Debes ingresar una contraseña";
      return false;
    }
    return true;
  }

  validateSingUp(username:string ,email: string, password: string ) : boolean {
    if (username == "") {
      this.errorMessageUp = "Debes ingresar un nombre de usuario";
      return false; 
    }
    
    if (email == "") {
      this.errorMessageUp = "Debes ingresar un email";
      return false;
    }
    

    if (password == "") {
      this.errorMessageUp = "Debes ingresar una contraseña";
      return false;
    }
    if (password.length <= 6) {
      this.errorMessageUp = "la contraseña debe tener al menos 6 caracteres";
      return false;
    }

    return true;
  }

  singIn() {
    const { email, password } = this.usuarioSingIn;
    if (this.validateSingIn(email, password)) {
      this.authService.singIn(email, password).subscribe(
        {
          next: () => {
            this.onSuccess();
          },
          error: (err) => {
            switch(err.code)
            {
              case "auth/invalid-email":
                this.errorMessageIn = 'El formato de correo es invalido';
                break;
              case "auth/operation-not-allowed":
                this.errorMessageIn = "Operación no permitida"
                break;
              default:
                this.errorMessageIn = 'El usuario o contraseña no son correctos'
            }
          }
        }
      );
    }
  }

  singUp() {
    const { username, email, password } = this.usuarioSingUp;
    if (this.validateSingUp(username, email, password)) {
      this.authService.singUp(username, email, password).subscribe(
        {
          next: () => {
            this.onSuccess();
          },
          error: (err) => {
            switch(err.code)
            {
              case "auth/email-already-in-use":
                this.errorMessageUp = 'El correo ya está en uso';
                break;
              case "auth/invalid-email":
                this.errorMessageUp = 'Correo electronico invalido';
                break;
              case "auth/operation-not-allowed":
                this.errorMessageUp = "Operación no permitida"
                break;
              case "auth/weak-password":
                this.errorMessageUp = "La contraseña debe tener al menos 6 caracteres"
            }
          }
        }
      );
    }
  }

  goToSignUp() {
    var container = document.getElementById('container');
    container?.classList.add("right-panel-active");
  }
  goToSignIn() {
    var container = document.getElementById('container');
    container?.classList.remove("right-panel-active");
  }

  fillTest() {
    this.usuarioSingIn.email = "test@gmail.com";
    this.usuarioSingIn.password = "test123";
  }

  fillAdmin() {
    this.usuarioSingIn.email = "admin@gmail.com";
    this.usuarioSingIn.password = "test123";
  }
}
