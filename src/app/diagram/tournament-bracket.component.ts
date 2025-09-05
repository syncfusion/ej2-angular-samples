import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DiagramComponent, DiagramConstraints, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import {
  NodeModel,
  ConnectorModel,
  SnapConstraints,
  NodeConstraints,
  DiagramTools,
  SnapSettingsModel
} from '@syncfusion/ej2-angular-diagrams';
import { SBActionDescriptionComponent } from '../common/adp.component';
import { SBDescriptionComponent } from '../common/dp.component';
import { CommonModule, NgIf } from '@angular/common';

/**
 * Tournament Results Diagram - UEFA Champions League 2023-24
 */

// Tournament match data interface
interface TournamentMatch {
  id: string;
  team1: string;
  score1: number;
  team2: string;
  score2: number;
  shootoutTeam1?: string;
  shootoutTeam2?: string;
  winner: string;
  matchType: string;
  year?: string;
}

@Component({
  selector: 'control-content',
  imports:[SBActionDescriptionComponent, DiagramModule, SBDescriptionComponent, NgIf,CommonModule],
  standalone: true,
  templateUrl: 'tournament-bracket.html',
  styleUrls: ['tournament-bracket.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TournamentBracketComponent implements OnInit {
  @ViewChild('diagram') public diagram!: DiagramComponent;

  public isLoading: boolean = true;
  public constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;

  public tools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None
  };

  public nodes: NodeModel[] = [];
  public connectors: ConnectorModel[] = [];

  // UEFA Champions League 2023-24 Tournament Data
  private tournamentData: TournamentMatch[] = [
    // Round of 16 matches
    { id: 'round16_1', team1: 'BAYERN MUNCHEN', score1: 3, team2: 'LAZIO', score2: 1, winner: 'BAYERN MUNCHEN', matchType: 'round16' },
    { id: 'round16_2', team1: 'ARSENAL', score1: 1, shootoutTeam1: '4', team2: 'PORTO', score2: 1, shootoutTeam2: '2', winner: 'ARSENAL', matchType: 'round16' },
    { id: 'round16_3', team1: 'COPENHAGEN', score1: 2, team2: 'MANCHESTER CITY', score2: 6, winner: 'MANCHESTER CITY', matchType: 'round16' },
    { id: 'round16_4', team1: 'LEIPZIG', score1: 1, team2: 'REAL MADRID', score2: 2, winner: 'REAL MADRID', matchType: 'round16' },
    { id: 'round16_5', team1: 'BORUSSIA DORTMUND', score1: 3, team2: 'PSV EINDHOVEN', score2: 1, winner: 'BORUSSIA DORTMUND', matchType: 'round16' },
    { id: 'round16_6', team1: 'ATLETICO MADRID', score1: 2, shootoutTeam1: '3', team2: 'INTER MILAN', score2: 2, shootoutTeam2: '2', winner: 'ATLETICO MADRID', matchType: 'round16' },
    { id: 'round16_7', team1: 'REAL SOCIEDAD', score1: 1, team2: 'PARIS SAINT-GERMAIN', score2: 4, winner: 'PARIS SAINT-GERMAIN', matchType: 'round16' },
    { id: 'round16_8', team1: 'BARCELONA', score1: 4, team2: 'NAPOLI', score2: 2, winner: 'BARCELONA', matchType: 'round16' },
    
    // Quarterfinal matches
    { id: 'quarter1', team1: 'BAYERN MUNCHEN', score1: 3, team2: 'ARSENAL', score2: 2, winner: 'BAYERN MUNCHEN', matchType: 'quarterfinal' },
    { id: 'quarter2', team1: 'MANCHESTER CITY', score1: 4, shootoutTeam1: '3', team2: 'REAL MADRID', score2: 4, shootoutTeam2: '4', winner: 'REAL MADRID', matchType: 'quarterfinal' },
    { id: 'quarter3', team1: 'BORUSSIA DORTMUND', score1: 5, team2: 'ATLETICO MADRID', score2: 4, winner: 'BORUSSIA DORTMUND', matchType: 'quarterfinal' },
    { id: 'quarter4', team1: 'BARCELONA', score1: 4, team2: 'PARIS SAINT-GERMAIN', score2: 6, winner: 'PARIS SAINT-GERMAIN', matchType: 'quarterfinal' },
    
    // Semifinal matches
    { id: 'semi1', team1: 'BAYERN MUNCHEN', score1: 3, team2: 'REAL MADRID', score2: 4, winner: 'REAL MADRID', matchType: 'semifinal' },
    { id: 'semi2', team1: 'PARIS SAINT-GERMAIN', score1: 0, team2: 'BORUSSIA DORTMUND', score2: 2, winner: 'BORUSSIA DORTMUND', matchType: 'semifinal' },
    
    // Final match
    { id: 'final', team1: 'REAL MADRID', score1: 2, team2: 'BORUSSIA DORTMUND', score2: 0, winner: 'REAL MADRID', matchType: 'final' },
    
    // Champion
    { id: 'champion', team1: 'REAL MADRID', team2: 'BORUSSIA DORTMUND', score1: 2, score2: 0, winner: 'REAL MADRID', year: '2023-24', matchType: 'champion' }
  ];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      
      // Initialize diagram AFTER loading finishes
      this.initializeTournamentBracket();

    }, 1700);
  }

  // Find tournament data by ID with fallback
  private findData(id: string): TournamentMatch {
    const found = this.tournamentData.find((item: TournamentMatch) => item.id === id);
    if (found) return found;
    
    return { 
      id: id, 
      team1: 'TBD', 
      team2: 'TBD', 
      score1: 0, 
      score2: 0, 
      winner: '', 
      matchType: id.includes('round16') ? 'round16' : 
                 id.includes('quarter') ? 'quarterfinal' : 
                 id.includes('semi') ? 'semifinal' : 
                 id.includes('final') ? 'final' : 'round16'
    };
  }

  // Generate HTML template for tournament nodes
  private getNodeTemplate(data: TournamentMatch): string {
    if (data.matchType === 'champion') {
      return `<div class="tournament-node champion-node" data-id="${data.id}">
                <div class="champion-container">
                  <div class="champion-badge"><div class="champion-trophy">🏆</div></div>
                  <div class="champion-title">CHAMPION</div>
                  <div class="champion-info" style="opacity: 0;">
                    <div class="champion-team">${data.winner || 'TBD'}</div>
                    <div class="champion-year">${data.year || '2024'}</div>
                  </div>
                </div>
              </div>`;
    }
    
    const team1Class = data.winner === data.team1 ? 'winner' : '';
    const team2Class = data.winner === data.team2 ? 'winner' : '';
    
    const roundDisplayName = data.matchType === 'round16' ? 'ROUND OF 16' : 
                        data.matchType === 'quarterfinal' ? 'QUARTER-FINAL' :
                        data.matchType === 'semifinal' ? 'SEMI-FINAL' :
                        data.matchType === 'final' ? 'FINAL' : 'MATCH';
    
    return `<div class="tournament-node ${data.matchType}-node" data-id="${data.id}">
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div style="height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(0, 51, 102, 0.9) 0%, rgba(0, 68, 136, 0.9) 100%);">
                      <div style="text-align: center; color: #cbe5feff; font-weight: 600; font-size: 16px; letter-spacing: 2px; text-shadow: 0 2px 4px rgba(0, 14, 87, 0.7);">${roundDisplayName}</div>
                    </div>
                  </div>
                  <div class="flip-card-back">
                    <div class="team-section team-top ${team1Class}">
                      <span class="team-name">${data.team1 || 'TBD'}</span>
                      <span class="team-score score-right">${data.score1 !== undefined ? data.score1 : ''}</span>
                    </div>
                    <div class="team-section team-bottom ${team2Class}">
                      <span class="team-name">${data.team2 || 'TBD'}</span>
                      <span class="team-score score-right">${data.score2 !== undefined ? data.score2 : ''}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
  }

  // Create detailed tooltip content for match information
  private createTooltipContent(data: TournamentMatch): HTMLDivElement {
    const tooltipDiv = document.createElement('div');
    tooltipDiv.classList.add('football-results-tooltip-content');
    tooltipDiv.style.cssText = 
      'background: linear-gradient(135deg, #001122 0%, #003366 100%);' +
      'border-radius: 12px; padding: 16px; color: white;' +
      'font-family: "Verdana", sans-serif; min-width: 300px; max-width: 380px;' +
      'box-shadow: 0 10px 30px rgba(0,0,0,0.5); position: relative; z-index: 1000;';
    
    const matchTypeDisplay = data.matchType === 'round16' ? 'ROUND OF 16' : 
                           data.matchType === 'quarterfinal' ? 'QUARTER-FINAL' :
                           data.matchType === 'semifinal' ? 'SEMI-FINAL' :
                           data.matchType === 'final' ? 'FINAL' :
                           data.matchType === 'champion' ? 'CHAMPION' : data.matchType.toUpperCase();
    
    const hasShootout = data.shootoutTeam1 && data.shootoutTeam2;
    const shootoutDisplay = hasShootout ? 
      `<div style="font-size: 11px; color: #87CEEB; margin-top: 8px; text-align: center;">
         <span style="color: #FFD700;">Penalty Shootout:</span> ${data.shootoutTeam1} - ${data.shootoutTeam2}
       </div>` : '';
    
    const team1WinnerStyle = data.winner === data.team1 ? 'color: #FFD700; font-weight: bold;' : '';
    const team2WinnerStyle = data.winner === data.team2 ? 'color: #FFD700; font-weight: bold;' : '';
    
    tooltipDiv.innerHTML = 
      `<div style="text-align: center;">
         <div style="font-size: 11px; font-weight: bold; color: #FFD700; margin-bottom: 6px; letter-spacing: 1px;">UEFA CHAMPIONS LEAGUE</div>
         <div style="font-size: 10px; color: #87CEEB; margin-bottom: 12px; font-weight: 600;">${matchTypeDisplay}</div>
         <div style="background: rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; margin-bottom: 10px;">
           <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
             <div style="flex: 1; text-align: left;"><div style="font-size: 14px; font-weight: bold; ${team1WinnerStyle}">${data.team1}</div></div>
             <div style="font-size: 20px; font-weight: bold; color: #fff; margin: 0 15px;">${data.score1}</div>
           </div>
           <div style="text-align: center; margin: 8px 0;">
             <div style="height: 1px; background: linear-gradient(90deg, transparent, #FFD700, transparent);"></div>
             <div style="font-size: 10px; color: #87CEEB; margin: 4px 0;">VS</div>
             <div style="height: 1px; background: linear-gradient(90deg, transparent, #FFD700, transparent);"></div>
           </div>
           <div style="display: flex; justify-content: space-between; align-items: center;">
             <div style="flex: 1; text-align: left;"><div style="font-size: 14px; font-weight: bold; ${team2WinnerStyle}">${data.team2}</div></div>
             <div style="font-size: 20px; font-weight: bold; color: #fff; margin: 0 15px;">${data.score2}</div>
           </div>
           ${shootoutDisplay}
         </div>
         <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); color: #001122; padding: 8px 12px; border-radius: 6px; font-weight: bold; font-size: 12px;">
           WINNER: ${data.winner}
         </div>
       </div>`;
    
    return tooltipDiv;
  }

  // Initialize tournament bracket with all nodes and connectors
  private initializeTournamentBracket(): void {
    const angleTiltAmountForRound16ToQuarter: number = 60;
    const angleTiltAmountForQuarterToSemi: number = 130;

    const championNodeSize = {w: 280, h: 200};
    const tournamentNodeSize = {w: 180, h: 100}; 

    const offsetXIncreaseAmount: number = 280;
    const leftRound16NodesOffsetX: number = offsetXIncreaseAmount;
    const leftQuarterFinalNodesOffsetX: number = leftRound16NodesOffsetX + offsetXIncreaseAmount;
    const leftSemiFinalNodesOffsetX: number = leftQuarterFinalNodesOffsetX + offsetXIncreaseAmount;
    const finalNodeOffsetX: number = leftSemiFinalNodesOffsetX + offsetXIncreaseAmount;
    const rightSemiFinalNodesOffsetX: number = finalNodeOffsetX + offsetXIncreaseAmount;
    const rightQuarterFinalNodesOffsetX: number = rightSemiFinalNodesOffsetX + offsetXIncreaseAmount;
    const rightRound16NodesOffsetX: number = rightQuarterFinalNodesOffsetX + offsetXIncreaseAmount;

    const offsetYIncreaseAmount: number = 190;
    const round16TopOffsetY: number = offsetYIncreaseAmount;
    const round16UpperMiddleOffsetY: number = round16TopOffsetY + offsetYIncreaseAmount;
    const round16LowerMiddleOffsetY: number = round16UpperMiddleOffsetY + offsetYIncreaseAmount;
    const round16BottomOffsetY: number = round16LowerMiddleOffsetY + offsetYIncreaseAmount;
    
    const quarterFinalTopOffsetY: number = (round16TopOffsetY + round16UpperMiddleOffsetY) / 2;
    const quarterFinalBottomOffsetY: number = (round16LowerMiddleOffsetY + round16BottomOffsetY) / 2;
    
    const semiFinalOffsetY: number = (quarterFinalTopOffsetY + quarterFinalBottomOffsetY) / 2;
    const finalNodeOffsetY: number = semiFinalOffsetY;
    const championNodeOffsetY: number = finalNodeOffsetY - 350;
    
    // Define all tournament nodes
    this.nodes = [
      // Champion node
      { 
        id: 'champion', 
        offsetX: finalNodeOffsetX, 
        offsetY: championNodeOffsetY, 
        width: championNodeSize.w, 
        height: championNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('champion')) },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      // Final node
      { 
        id: 'final', 
        offsetX: finalNodeOffsetX, 
        offsetY: finalNodeOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('final')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('final')), position: 'TopCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      // Semifinal nodes
      { 
        id: 'semi1', 
        offsetX: leftSemiFinalNodesOffsetX, 
        offsetY: semiFinalOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('semi1')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('semi1')), position: 'TopCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'semi2', 
        offsetX: rightSemiFinalNodesOffsetX, 
        offsetY: semiFinalOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('semi2')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('semi2')), position: 'TopCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      // Quarterfinal nodes
      { 
        id: 'quarter1', 
        offsetX: leftQuarterFinalNodesOffsetX, 
        offsetY: quarterFinalTopOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('quarter1')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('quarter1')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'quarter2', 
        offsetX: leftQuarterFinalNodesOffsetX, 
        offsetY: quarterFinalBottomOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('quarter2')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('quarter2')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'quarter3', 
        offsetX: rightQuarterFinalNodesOffsetX, 
        offsetY: quarterFinalTopOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('quarter3')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('quarter3')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'quarter4', 
        offsetX: rightQuarterFinalNodesOffsetX, 
        offsetY: quarterFinalBottomOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('quarter4')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('quarter4')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      // Round of 16 nodes (left side)
      { 
        id: 'round16_1', 
        offsetX: leftRound16NodesOffsetX, 
        offsetY: round16TopOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_1')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_1')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_2', 
        offsetX: leftRound16NodesOffsetX, 
        offsetY: round16UpperMiddleOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_2')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_2')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_3', 
        offsetX: leftRound16NodesOffsetX, 
        offsetY: round16LowerMiddleOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_3')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_3')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_4', 
        offsetX: leftRound16NodesOffsetX, 
        offsetY: round16BottomOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_4')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_4')), position: 'RightCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      // Round of 16 nodes (right side)
      { 
        id: 'round16_5', 
        offsetX: rightRound16NodesOffsetX, 
        offsetY: round16TopOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_5')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_5')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_6', 
        offsetX: rightRound16NodesOffsetX, 
        offsetY: round16UpperMiddleOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_6')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_6')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_7', 
        offsetX: rightRound16NodesOffsetX, 
        offsetY: round16LowerMiddleOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_7')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_7')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      },
      { 
        id: 'round16_8', 
        offsetX: rightRound16NodesOffsetX, 
        offsetY: round16BottomOffsetY, 
        width: tournamentNodeSize.w, 
        height: tournamentNodeSize.h, 
        shape: { type: 'HTML', content: this.getNodeTemplate(this.findData('round16_8')) },
        constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
        tooltip: { content: this.createTooltipContent(this.findData('round16_8')), position: 'LeftCenter', relativeMode: 'Object' },
        style: { fill: 'transparent', strokeColor: 'transparent' }
      }
    ];

    // Define all connectors
    this.connectors = [
      // Champion connection
      { 
        id: 'champ1', 
        sourceID: 'final', 
        targetID: 'champion',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      // Final connections
      { 
        id: 'final1', 
        sourceID: 'semi1', 
        targetID: 'final',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'final2', 
        sourceID: 'semi2', 
        targetID: 'final',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      // Semifinal connections
      { 
        id: 'semi1_1', 
        segments: [{ point: { x: leftSemiFinalNodesOffsetX - angleTiltAmountForQuarterToSemi, y: quarterFinalTopOffsetY } }], 
        sourceID: 'quarter1', 
        targetID: 'semi1',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'semi1_2', 
        segments: [{ point: { x: leftSemiFinalNodesOffsetX - angleTiltAmountForQuarterToSemi, y: quarterFinalBottomOffsetY } }], 
        sourceID: 'quarter2', 
        targetID: 'semi1',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'semi2_1', 
        segments: [{ point: { x: rightSemiFinalNodesOffsetX + angleTiltAmountForQuarterToSemi, y: quarterFinalTopOffsetY } }], 
        sourceID: 'quarter3', 
        targetID: 'semi2',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'semi2_2', 
        segments: [{ point: { x: rightSemiFinalNodesOffsetX + angleTiltAmountForQuarterToSemi, y: quarterFinalBottomOffsetY } }], 
        sourceID: 'quarter4', 
        targetID: 'semi2',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      // Quarterfinal connections
      { 
        id: 'quarter1_1', 
        segments: [{ point: { x: leftQuarterFinalNodesOffsetX - angleTiltAmountForRound16ToQuarter, y: round16TopOffsetY } }], 
        sourceID: 'round16_1', 
        targetID: 'quarter1',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter1_2', 
        segments: [{ point: { x: leftQuarterFinalNodesOffsetX - angleTiltAmountForRound16ToQuarter, y: round16UpperMiddleOffsetY } }], 
        sourceID: 'round16_2', 
        targetID: 'quarter1',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter2_1', 
        segments: [{ point: { x: leftQuarterFinalNodesOffsetX - angleTiltAmountForRound16ToQuarter, y: round16LowerMiddleOffsetY } }], 
        sourceID: 'round16_3', 
        targetID: 'quarter2',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter2_2', 
        segments: [{ point: { x: leftQuarterFinalNodesOffsetX - angleTiltAmountForRound16ToQuarter, y: round16BottomOffsetY } }], 
        sourceID: 'round16_4', 
        targetID: 'quarter2',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter3_1', 
        segments: [{ point: { x: rightQuarterFinalNodesOffsetX + angleTiltAmountForRound16ToQuarter, y: round16TopOffsetY } }], 
        sourceID: 'round16_5', 
        targetID: 'quarter3',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter3_2', 
        segments: [{ point: { x: rightQuarterFinalNodesOffsetX + angleTiltAmountForRound16ToQuarter, y: round16UpperMiddleOffsetY } }], 
        sourceID: 'round16_6', 
        targetID: 'quarter3',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter4_1', 
        segments: [{ point: { x: rightQuarterFinalNodesOffsetX + angleTiltAmountForRound16ToQuarter, y: round16LowerMiddleOffsetY } }], 
        sourceID: 'round16_7', 
        targetID: 'quarter4',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      },
      { 
        id: 'quarter4_2', 
        segments: [{ point: { x: rightQuarterFinalNodesOffsetX + angleTiltAmountForRound16ToQuarter, y: round16BottomOffsetY } }], 
        sourceID: 'round16_8', 
        targetID: 'quarter4',
        style: { strokeColor: 'rgba(0, 102, 204, 0.2)', strokeWidth: 2 },
        targetDecorator: { shape: 'None' },
        sourceDecorator: { shape: 'None' }
      }
    ];
  }

  // Default properties for connectors
  public connectorDefaults(connector: any): void {
    connector.type = 'Straight';
    connector.sourcePadding = 10;
    connector.targetPadding = 10;
  }

  public diagramLoad(): void {
    if (this.diagram) {
      setTimeout(() => {
        this.diagram.fitToPage({
          canZoomIn: true,
          margin: { left: 0, right: 20, top: 0, bottom: 90 }
        });
      });
    }
  }
}