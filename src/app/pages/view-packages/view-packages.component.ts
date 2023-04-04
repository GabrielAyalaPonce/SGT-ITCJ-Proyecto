import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {

  packages!: any;

  constructor(private packagesService: PackagesService, private router: Router) { }


  ngOnInit(): void {
    this.packagesService.getPackages().subscribe(resp => {
      this.packages = resp;
      console.log('vamos viendo que tengo', this.packages);
    });
  }
  
}
