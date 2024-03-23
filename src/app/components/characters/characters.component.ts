import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../interfaces/character';
import { CharcaterService } from '../../services/charcater.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public characters: Character[] = [];
  private episodeId: number | null = null;

  constructor(
    private charcaterService: CharcaterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEpisodeIdFromRoute();
    this.getCharacters();
  }

  getEpisodeIdFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      this.episodeId = Number(params.get('episodeId'));
    });
  }

  getCharacters(): void {
    this.charcaterService.getCharacters()
      .subscribe((characters: Character[]) => {
        this.characters = characters;
        if (this.episodeId) {
          this.characters = characters.filter(character => {
            return character.episode.some(episode => episode.endsWith(`/${this.episodeId}`));
          });
        }
      });
  }
}
