import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../../../core/services/application.service';
import { Application } from '../../../../core/model/usuario.model';
import { CommonModule } from '@angular/common';
import { ApplicationLink } from './application-link.model';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-aplicacoes',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule, RouterModule],
  templateUrl: './aplicacoes.component.html',
  styleUrl: './aplicacoes.component.css'
})
export class AplicacoesComponent implements OnInit {

  applications: ApplicationLink[] = [];

  constructor(private applicationService: ApplicationService, private router: Router) { }

  ngOnInit(): void {
    this.applicationService.getAll().subscribe({ 
      next: applications => {
        applications.forEach(application => {
          this.applications.push(new ApplicationLink(application));
        });
      },
      error: error => {
        console.error('Erro na requisição:', error);
      }
    });
  }

  openApplication(_application: ApplicationLink): void {
    const url = `https://${_application.url}.lucaslabs.com`;
    window.open(url, '_blank');
  }

}
