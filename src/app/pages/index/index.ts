import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from 'express';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-index',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  
}
