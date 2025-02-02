import { Component } from '@angular/core';
import { NavComponent } from "./components/nav/nav.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-logged-in-layout',
  standalone: true,
  imports: [NavComponent, MenuComponent, FooterComponent, RouterOutlet],
  templateUrl: './logged-in-layout.component.html',
  styleUrl: './logged-in-layout.component.css'
})
export class LoggedInLayoutComponent {

}
