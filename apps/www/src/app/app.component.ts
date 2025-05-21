import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionService } from './services/session.service';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@Component({
  imports: [RouterModule, ModalComponent, ToastComponent],
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
