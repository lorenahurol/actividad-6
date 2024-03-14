import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { RouterLink } from '@angular/router';
import { BotoneraComponent } from '../botonera/botonera.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink, BotoneraComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() myUser!: IUser;

}
