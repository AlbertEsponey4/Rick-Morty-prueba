import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { Team } from '../../interfaces/team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  public teams: Team[] = [];

  constructor(private service: TeamsService) {}

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams(): void {
    this.service.getTeams()
      .subscribe((teams: Team[]) => {
        this.teams = teams;
      });
  }
}
