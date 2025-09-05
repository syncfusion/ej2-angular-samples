import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DiagramComponent, DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { NodeModel, Node, NodeConstraints, SnapConstraints, HtmlModel, SelectorConstraints, IClickEventArgs, DiagramConstraints } from '@syncfusion/ej2-diagrams';
import { SBDescriptionComponent } from '../common/dp.component';
import { SBActionDescriptionComponent } from '../common/adp.component';

/**
 * Sample for Interactive Puzzle Diagram
 */

interface ImageTheme {
    [key: number]: string;
}

@Component({
    selector: 'control-content',
    templateUrl: 'puzzle.html',
    styleUrls: ['puzzle.component.css'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [SBActionDescriptionComponent, DiagramModule, CommonModule, NgIf, SBDescriptionComponent]
})
export class PuzzleDiagramComponent {
    @ViewChild('diagram')
    public diagramComponent!: DiagramComponent;
    public constraints: DiagramConstraints = DiagramConstraints.Default &~ DiagramConstraints.UndoRedo;

    // Game state properties
    public moveCount: number = 0;
    public timeDisplay: string = "00:00";
    public showWinDialog: boolean = false;
    private gameBoard: number[] = new Array(16);
    private emptyIndex: number = 0;
    private gameTimer: any = null;
    private elapsedSeconds: number = 0;
    private isPaused: boolean = false;
    private gameStarted: boolean = false;
    private showClue: boolean = false;
    private isPuzzleSolved: boolean = false;
    private diagramCreated: boolean = false;

    // Image collections
    private imageCollections: ImageTheme[] = [];
    private currentImageMap!: ImageTheme;
    private currentThemeIndex: number = 0;
    private imageRandom = Math.random;

    // Constants
    private readonly TILE_WIDTH = 130;
    private readonly TILE_HEIGHT = 130;
    private readonly GRID_SIZE = 4;

    // Diagram configuration
    public diagramWidth = "100%";
    public diagramHeight = "750px";
    public nodes: NodeModel[] = [];
    public snapSettings = { constraints: SnapConstraints.None };
    public selectedItems = { constraints: SelectorConstraints.None };

    ngOnInit(): void {
        this.initializeImageCollections();
        this.initializeGame();
        this.setupTimer();
    }

    ngOnDestroy(): void {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
    }

    public onDiagramCreated(): void {
        this.diagramCreated = true;
        this.diagramComponent.fitToPage();
    }

    public onDiagramLoad(): void {
        if (this.diagramCreated) {
            setTimeout(() => this.diagramComponent.fitToPage(), 10);
        }
    }

    public onDiagramClick(args: IClickEventArgs): void {
        if (args.actualObject instanceof Node) {
            const node: NodeModel = args.actualObject;
            if (node.id === 'newgame') {
                this.newGame();
            }
            else if (node.id === 'pause') {
                this.togglePause();
            }
            else if (node.id === 'clue') {
                this.toggleClue();
            }
            else if (node.id?.startsWith("tile")) {
                if (this.isPaused || this.isPuzzleSolved) return;

                if (!this.gameStarted) {
                    this.gameStarted = true;
                    this.elapsedSeconds = 0;
                    this.updateTimeDisplay();
                }

                const nodeId = node.id;
                if (nodeId?.startsWith("tile")) {
                    const tileNumber = parseInt(nodeId.substring(4));
                    this.moveTileToEmptySpace(tileNumber);
                }
            }
        }
    }

    public closeWinDialog(): void {
        this.showWinDialog = false;
        this.newGame();
    }

    private initializeImageCollections(): void {
        // bridge theme
        const bridgeTheme: ImageTheme = {};
        // Nature theme
        const natureTheme: ImageTheme = {};
        // Man theme
        const manTheme: ImageTheme = {};

        for (let i = 1; i <= 16; i++) {
            const row = Math.ceil(i / 4);
            const col = ((i - 1) % 4) + 1;
            bridgeTheme[i] = `./assets/diagram/Images/puzzle/bridge${col}x${row}.png`;
            natureTheme[i] = `./assets/diagram/Images/puzzle/image${col}x${row}.png`;
            manTheme[i] = `./assets/diagram/Images/puzzle/man${col}x${row}.png`;
        }

        this.imageCollections = [bridgeTheme, natureTheme, manTheme];
        this.currentImageMap = this.imageCollections[0];
        this.currentThemeIndex = 0;
    }

    private createNodes(): void {
        this.nodes = [];

        // Background Node
        const backgroundNode: NodeModel = {
            id: "backgroundNode",
            offsetX: 788,
            offsetY: 392,
            height: 755,
            width: 639,
            style: {
                fill: "#B0C4DE",
                opacity: 0.5
            },
            constraints: NodeConstraints.None,
            shape: {
                type: 'Basic',
                shape: 'Rectangle',
                cornerRadius: 5
            }
        };
        this.nodes.push(backgroundNode);

        // Moves counter node
        const moveNode: NodeModel = {
            id: "moves",
            offsetX: 615,
            offsetY: 80,
            width: 160, height: 100,
            constraints: NodeConstraints.None,
            shape: {
                type: 'HTML',
                content: this.getMovesTemplate()
            }
        };
        this.nodes.push(moveNode);

        // Time node
        const timeNode: NodeModel = {
            id: "time",
            offsetX: 976,
            offsetY: 80,
            width: 160, height: 100,
            constraints: NodeConstraints.None,
            shape: {
                type: 'HTML',
                content: this.getTimeTemplate()
            }
        };
        this.nodes.push(timeNode);

        // New game button
        const newGameNode: NodeModel = {
            id: "newgame",
            offsetX: 610,
            offsetY: 725,
            width: 150, height: 50,
            constraints: NodeConstraints.PointerEvents,
            shape: {
                type: 'HTML',
                content: this.getNewGameTemplate()
            }
        };
        this.nodes.push(newGameNode);

        // Pause button
        const pauseNode: NodeModel = {
            id: "pause",
            offsetX: 980,
            offsetY: 725,
            width: 150, height: 50,
            constraints: NodeConstraints.PointerEvents,
            shape: {
                type: 'HTML',
                content: this.getPauseTemplate()
            }
        };
        this.nodes.push(pauseNode);

        // Clue button
        const clueNode: NodeModel = {
            id: "clue",
            offsetX: 795,
            offsetY: 725,
            width: 150, height: 50,
            constraints: NodeConstraints.PointerEvents,
            shape: {
                type: 'HTML',
                content: this.getClueTemplate()
            }
        };
        this.nodes.push(clueNode);

        // Create puzzle tiles
        for (let i = 0; i < this.gameBoard.length; i++) {
            if (this.gameBoard[i] !== 0) {
                const pieceNumber = this.gameBoard[i];

                const node: NodeModel = {
                    id: `tile${pieceNumber}`,
                    width: this.TILE_WIDTH,
                    height: this.TILE_HEIGHT,
                    offsetX: this.getTileX(i),
                    offsetY: this.getTileY(i),
                    annotations: [{
                        id: `annotation${pieceNumber}`,
                        width: 25,
                        height: 25,
                        template: this.getAnnotationTemplate(pieceNumber),
                        visibility: false,
                        offset: { x: 0.7, y: 0.1 },
                        horizontalAlignment: 'Center',
                        verticalAlignment: 'Center'
                    }],
                    style: {
                        strokeColor: "white"
                    },
                    shape: {
                        type: 'Image',
                        source: this.getImageSourceForTile(pieceNumber)
                    }
                };

                if (this.canMoveTile(i)) {
                    node.constraints = NodeConstraints.PointerEvents;
                } else {
                    node.constraints = NodeConstraints.None;
                }

                this.nodes.push(node);
            }
        }
    }

    private getMovesTemplate(): string {
        return `<div class="moves-counter">
                    <span class="label">MOVES :</span>
                    <span class="count">${this.moveCount}</span>
                </div>`;
    }

    private getTimeTemplate(): string {
        return `<div class="timer">
                    <span class="label">TIME :</span>
                    <span class="time-display">${this.timeDisplay}</span>
                </div>`;
    }

    private getNewGameTemplate(): string {
        return `<button class="new-game-btn" id="newGameBtn">
                    <span class="icon">🎮</span>
                    NEW GAME
                </button>`;
    }

    private getClueTemplate(): string {
        return `<button class="clue-btn" id="clueBtn">
                    <span class="icon">💡</span>
                    <span class="text">${this.showClue ? "HIDE CLUE" : "SHOW CLUE"}</span>
                </button>`;
    }

    private getPauseTemplate(): string {
        return `<button class="pause-btn" id="pauseBtn">
                    <span class="icon">${this.isPaused ? "▶️" : "⏸️"}</span>
                    <span class="text">${this.isPaused ? "RESUME" : "PAUSE"}</span>
                </button>`;
    }

    private getAnnotationTemplate(pieceNumber: number): string {
        return `<div class="number-badge">${pieceNumber}</div>`;
    }

    private initializeGame(): void {
        // Initialize solved state
        this.gameBoard[0] = 1; this.gameBoard[1] = 2; this.gameBoard[2] = 3; this.gameBoard[3] = 4;
        this.gameBoard[4] = 5; this.gameBoard[5] = 6; this.gameBoard[6] = 7; this.gameBoard[7] = 8;
        this.gameBoard[8] = 9; this.gameBoard[9] = 10; this.gameBoard[10] = 11; this.gameBoard[11] = 12;
        this.gameBoard[12] = 13; this.gameBoard[13] = 14; this.gameBoard[14] = 15; this.gameBoard[15] = 0;

        this.emptyIndex = 15;
        this.shuffleBoard();
        this.moveCount = 0;
        this.isPuzzleSolved = false;
        this.elapsedSeconds = 0;
        this.updateTimeDisplay();
        this.gameStarted = false;
        this.createNodes();
    }

    private setupTimer(): void {
        this.gameTimer = setInterval(() => {
            this.onTimerElapsed();
        }, 1000);
    }

    private onTimerElapsed(): void {
        if (!this.isPaused && this.gameStarted && !this.isPuzzleSolved) {
            this.elapsedSeconds++;
            this.updateTimeDisplay();
            this.updateUI();
        }
    }

    private updateTimeDisplay(): void {
        const minutes = Math.floor(this.elapsedSeconds / 60);
        const seconds = this.elapsedSeconds % 60;
        this.timeDisplay = this.padZero(minutes) + ':' + this.padZero(seconds);
    }

    private padZero(num: number): string {
        return (num < 10 ? '0' : '') + num;
    }

    private getTileX(index: number): number {
        const col = index % this.GRID_SIZE;
        const startX = 600;
        return startX + (col * this.TILE_WIDTH);
    }

    private getTileY(index: number): number {
        const row = Math.floor(index / this.GRID_SIZE);
        const startY = 200;
        return startY + (row * this.TILE_HEIGHT);
    }

    private canMoveTile(tileIndex: number): boolean {
        const tileRow = Math.floor(tileIndex / 4);
        const tileCol = tileIndex % 4;
        const emptyRow = Math.floor(this.emptyIndex / 4);
        const emptyCol = this.emptyIndex % 4;

        const isVerticallyAdjacent = (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol);
        const isHorizontallyAdjacent = (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow);

        return isVerticallyAdjacent || isHorizontallyAdjacent;
    }

    private addFinalPiece(): void {
        const finalPiece: NodeModel = {
            id: "tile16final",
            width: 130,
            height: 130,
            offsetX: this.getTileX(15),
            offsetY: this.getTileY(15),
            style: {
                fill: "transparent",
                strokeColor: "#FFD700",
                strokeWidth: 4
            },
            shape: {
                type: 'Image',
                source: this.getImageSourceForTile(16)
            },
            annotations: [{
                id: "annotation16",
                width: 25,
                height: 25,
                template: this.getAnnotationTemplate(16),
                offset: { x: 0.9, y: 0.1 },
                horizontalAlignment: 'Center',
                verticalAlignment: 'Center'
            }],
            constraints: NodeConstraints.None
        };

        this.diagramComponent.add(finalPiece);
    }

    private checkPuzzleSolved(): void {
        let solved = true;
        for (let i = 0; i < 15; i++) {
            if (this.gameBoard[i] !== i + 1) {
                solved = false;
                break;
            }
        }
        if (solved && this.gameBoard[15] !== 0) {
            solved = false;
        }
        if (solved && this.emptyIndex === 15) {
            this.isPuzzleSolved = true;
            if (this.gameTimer) {
                clearInterval(this.gameTimer);
            }

            this.addFinalPiece();
            this.showCompletionMessage();
        }
    }

    private moveTileToEmptySpace(tileNumber: number): void {
        const tileIndex = this.gameBoard.indexOf(tileNumber);
        if (!this.canMoveTile(tileIndex)) return;

        if (!this.gameStarted) {
            this.gameStarted = true;
            this.elapsedSeconds = 0;
            this.updateTimeDisplay();
        }

        const oldEmptyIndex = this.emptyIndex;
        this.gameBoard[this.emptyIndex] = tileNumber;
        this.gameBoard[tileIndex] = 0;
        this.emptyIndex = tileIndex;
        this.moveCount++;

        const node = this.diagramComponent.getObject(`tile${tileNumber}`) as NodeModel;
        if (node) {
            node.offsetX = this.getTileX(oldEmptyIndex);
            node.offsetY = this.getTileY(oldEmptyIndex);
            this.diagramComponent.dataBind();
        }

        this.enableAdjacentNodes();
        this.checkPuzzleSolved();
        this.updateUI();
    }

    private newGame(): void {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
        }
        this.selectRandomImageCollection();
        this.moveCount = 0;
        this.elapsedSeconds = 0;
        this.gameStarted = false;
        this.isPaused = false;
        this.isPuzzleSolved = false;
        this.showWinDialog = false;
        this.showClue = false;

        // Reset board
        this.gameBoard[0] = 1; this.gameBoard[1] = 2; this.gameBoard[2] = 3; this.gameBoard[3] = 4;
        this.gameBoard[4] = 5; this.gameBoard[5] = 6; this.gameBoard[6] = 7; this.gameBoard[7] = 8;
        this.gameBoard[8] = 9; this.gameBoard[9] = 10; this.gameBoard[10] = 11; this.gameBoard[11] = 12;
        this.gameBoard[12] = 13; this.gameBoard[13] = 14; this.gameBoard[14] = 15; this.gameBoard[15] = 0;
        this.emptyIndex = 15;

        this.updateTimeDisplay();
        this.shuffleBoard();
        this.clearDiagramNodes();
        this.createNodes();
        this.diagramComponent.nodes = this.nodes;
        this.enableAdjacentNodes();
        this.setupTimer();
        this.updateUI();
    }

    private shuffleBoard(): void {
        for (let i = 0; i < 1000; i++) {
            const validMoves = this.getValidMoves();
            if (validMoves.length > 0) {
                const randomMove = validMoves[Math.floor(this.imageRandom() * validMoves.length)];
                this.gameBoard[this.emptyIndex] = this.gameBoard[randomMove];
                this.gameBoard[randomMove] = 0;
                this.emptyIndex = randomMove;
            }
        }
    }

    private getValidMoves(): number[] {
        const validMoves: number[] = [];
        const emptyRow = Math.floor(this.emptyIndex / 4);
        const emptyCol = this.emptyIndex % 4;
        const directions = [-4, 4, -1, 1];

        for (const dir of directions) {
            const newIndex = this.emptyIndex + dir;
            if (newIndex >= 0 && newIndex < 16) {
                const newRow = Math.floor(newIndex / 4);
                const newCol = newIndex % 4;
                if ((dir === -1 || dir === 1) && Math.abs(newRow - emptyRow) === 0 && Math.abs(newCol - emptyCol) === 1) {
                    validMoves.push(newIndex);
                } else if ((dir === -4 || dir === 4) && Math.abs(newRow - emptyRow) === 1 && Math.abs(newCol - emptyCol) === 0) {
                    validMoves.push(newIndex);
                }
            }
        }

        return validMoves;
    }

    private togglePause(): void {
        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            if (this.gameTimer) {
                clearInterval(this.gameTimer);
            }
            this.disableAllNodes();
        } else {
            this.setupTimer();
            this.enableAdjacentNodes();
        }

        this.updateUI();
    }

    private disableAllNodes(): void {
        for (const node of this.diagramComponent.nodes) {
            if (node.id?.startsWith("tile")) {
                node.constraints = NodeConstraints.None;
            }
        }
        this.diagramComponent.dataBind();
    }

    private clearDiagramNodes(): void {
        if (this.diagramComponent) {
            const existingNodes = [...this.diagramComponent.nodes];
            for (const node of existingNodes) {
                this.diagramComponent.remove(node);
            }
        }
        this.nodes = [];
    }

    private enableAdjacentNodes(): void {
        for (const node of this.diagramComponent.nodes) {
            if (node.id?.startsWith("tile")) {
                const tileNumber = parseInt(node.id.substring(4));
                const tileIndex = this.gameBoard.indexOf(tileNumber);

                if (this.canMoveTile(tileIndex)) {
                    node.constraints = NodeConstraints.PointerEvents;
                } else {
                    node.constraints = NodeConstraints.None;
                }
            }
        }
        this.diagramComponent.dataBind();
    }

    private toggleClue(): void {
        this.showClue = !this.showClue;
        for (const node of this.diagramComponent.nodes) {
            if (node.annotations && node.annotations.length > 0) {
                node.annotations[0].visibility = this.showClue;
            }
        }
        this.diagramComponent.dataBind();
        this.updateUI();
    }

    private selectRandomImageCollection(): void {
        if (this.imageCollections.length > 1) {
            let newIndex: number;
            do {
                newIndex = Math.floor(this.imageRandom() * this.imageCollections.length);
            } while (newIndex === this.currentThemeIndex);

            this.currentThemeIndex = newIndex;
            this.currentImageMap = this.imageCollections[this.currentThemeIndex];
        }
    }

    private getImageSourceForTile(tileNumber: number): string {
        return this.currentImageMap && this.currentImageMap[tileNumber]
            ? this.currentImageMap[tileNumber]
            : "";
    }

    private showCompletionMessage(): void {
        this.showWinDialog = true;
    }

    private updateUI(): void {
        // Update moves counter
        const moveNode = this.diagramComponent.getObject('moves') as NodeModel;
        if (moveNode && moveNode.shape && (moveNode.shape as HtmlModel).content) {
            (moveNode.shape as HtmlModel).content = this.getMovesTemplate();
        }

        // Update timer
        const timeNode = this.diagramComponent.getObject('time') as NodeModel;
        if (timeNode && timeNode.shape && (timeNode.shape as HtmlModel).content) {
            (timeNode.shape as HtmlModel).content = this.getTimeTemplate();
        }

        // Update pause button
        const pauseNode = this.diagramComponent.getObject('pause') as NodeModel;
        if (pauseNode && pauseNode.shape && (pauseNode.shape as HtmlModel).content) {
            (pauseNode.shape as HtmlModel).content = this.getPauseTemplate();
        }

        // Update clue button
        const clueNode = this.diagramComponent.getObject('clue') as NodeModel;
        if (clueNode && clueNode.shape && (clueNode.shape as HtmlModel).content) {
            (clueNode.shape as HtmlModel).content = this.getClueTemplate();
        }

        this.diagramComponent.dataBind();
    }
}
