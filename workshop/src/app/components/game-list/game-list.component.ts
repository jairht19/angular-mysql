import { Component, OnInit, HostBinding } from '@angular/core';
import { GamesService } from '../../services/games.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  games: any = [];


  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.getGames();
  }

  deleteGame(id: string) {
    alertify.notify('<i class="fas fa-spinner fa-spin fa-lg"></i>', 'default', 3);
    this.gamesService.deleteGame(id).subscribe(
      res => {
        alertify.dismissAll();
        this.getGames();
        alertify.notify('<i class="fas fa-check-circle"></i> ' + res + '', 'success', 5);
      },
      err => console.log(err)
    );
  }

  getGames() {
    this.gamesService.getGames().subscribe(res => {
        this.games = res;
        /*alertify.notify('<i class="fas fa-check-circle"></i> Normal message', 'success', 25);
        alertify.notify('<i class="fas fa-exclamation-circle"></i> Normal message', 'warning', 25);
        alertify.notify('<i class="fas fa-info-circle"></i> Normal message', 'info', 25);
        alertify.notify('<i class="far fa-clock"></i> Normal message', 'default', 25);
        alertify.notify('<i class="fas fa-times-circle"></i> Normal message', 'danger', 25);*/
      }, err => console.log(err));
  }

}
