import { Component, OnInit, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export default class UsersComponent implements OnInit{
  
  public userForm!: FormGroup
  public users = computed(() => this._users())
  private _usersService = inject(UsersService)
  private _users: WritableSignal<User []> = signal([])
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.updateUserList()

    this.userForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      document: ['', Validators.required],
      roles_id: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      alert('Rellene el formulario')
      return
    }

    this._usersService.createUser(
      this.userForm.value
    ).subscribe({
      next: () => {
        this.updateUserList()
      }
    })
  }

  sendNewRol(user_id: string, roles_id: string) {
    this._usersService.updateUser(user_id, roles_id).subscribe({
      next: () => {
        this.updateUserList()
      }
    })
  }

  updateRol(user_id: string, event: Event) {
    const new_users = this._users().map( user => {
      if ( user_id === user.id ) {
        user.roles_id = (event.target as HTMLSelectElement).value
      }

      return user
    })

    this._users.set(new_users)
  }

  updateUserList() {
    this._usersService.getUserList().subscribe( users => {
      this._users.set(users)
    })
  }

}
