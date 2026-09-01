import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';


@Component({
  selector: 'app-index',
  imports: [RouterOutlet],
  templateUrl: './index.html',
  styleUrls: [
    './index.css',
    '../app/app.css'
  ],
})
export class Index {
  
}
