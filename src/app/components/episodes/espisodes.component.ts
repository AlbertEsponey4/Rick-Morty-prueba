import { Component, OnInit, ViewChild } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';
import { Episode } from '../../interfaces/episode';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CharcaterService } from '../../services/charcater.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  public episodes: Episode[] = [];
  public dataSource!: MatTableDataSource<Episode>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(private episodeService: EpisodeService, private characterService: CharcaterService, private router: Router) {}
  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes()
      .subscribe((episodes: Episode[]) => {
        this.episodes = episodes;
        this.dataSource = new MatTableDataSource<Episode>(this.episodes);
        this.dataSource.paginator = this.paginator;
      });
  }

  onRowClicked(row: any) {
    this.router.navigate(['/characters/' + row.id]);
  }
}
