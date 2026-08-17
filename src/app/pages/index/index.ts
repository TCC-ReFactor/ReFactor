import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-index',
  imports: [RouterOutlet],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {

}
