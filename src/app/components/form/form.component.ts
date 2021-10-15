import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Interfaces
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public user: IUser | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    const localStorageUser = localStorage.getItem('user');

    if (localStorageUser) {
      this.user = JSON.parse(localStorageUser);
    }
  }

  public login(form: HTMLFormElement): void {
    if (this.form.valid) {
      const newUser: IUser = this.form.value;

      localStorage.setItem('user', JSON.stringify(newUser));

      form.reset();

      this.router.navigate(['/todo']);
    }
  }

  public redirectToToDo(): void {
    this.router.navigate(['/todo']);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
