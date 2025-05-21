import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from './services/session.service';

@Component({
  imports: [RouterModule],
  selector: 'kr-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly sessionService: SessionService) {}

  async ngOnInit(): Promise<void> {
    await this.sessionService.initialize();
  }
}
