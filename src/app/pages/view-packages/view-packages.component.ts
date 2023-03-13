import { Component, OnInit } from '@angular/core';
import { PackagesI } from 'src/app/models/packages';
import { PackagesService } from 'src/app/services/packages.service';

@Component({
  selector: 'app-view-packages',
  templateUrl: './view-packages.component.html',
  styleUrls: ['./view-packages.component.css']
})
export class ViewPackagesComponent implements OnInit {

  packages!: any

  constructor( private Packagesservice:PackagesService) { }

  ngOnInit(): void {
  this.Packagesservice.getPackages().subscribe( resp =>{
    this.packages = resp
   console.log('vamos viendo que tengo', this.packages)
  })
  }

}
