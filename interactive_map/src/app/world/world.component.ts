import { PathLocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrl: './world.component.css'
})
export class WorldComponent implements AfterViewInit {
  @ViewChild('svgObject', {static: true}) svgObject!: ElementRef;

  countryData: any =null;

  constructor(private countryService: CountryService) {}

  ngAfterViewInit(): void {
    const svgElement = this.svgObject.nativeElement;
    const paths = svgElement.querySelectorAll('path')

    const pathsArray = Array.from(paths);

    pathsArray.forEach((path: any) => {
      //click event listener
      path.addEventListener('click', (event: any) =>{
        this.onCountryClick(event.target);
    });

    //Enter event listener for hover effect
      path.addEventListener('mouseenter', () => {
        path.style.fill = 'red';
      });

      //Exit event listener to reset color
      path.addEventListener('mouseleave', () =>{
        path.style.fill = '';
      });
  });
}

  onCountryClick(target: any): void {
    const countryID = target.id;
    console.log('Country clicked:', countryID);
    

    //This method handels country selection
    this.countryService.getCountryData(countryID).subscribe({
      next: (data) => {
        console.log('Country data:', data);
        this.countryData = data[1][0];
      },
      error: (error) => {
        console.error('Error fetching country data:', error);
      }
    });
  }
}
