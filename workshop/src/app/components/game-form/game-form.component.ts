import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/game';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    create_at: new Date()
  };

  constructor(private gamesService: GamesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params) {
      this.gamesService.getGame(params.id).subscribe(
        res => {
          this.game = res;
        },
        err => console.log(err)
      );
    }

  }

  saveNewGame() {
    this.gamesService.saveGame(this.game)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.log(err)
    );
  }

}
