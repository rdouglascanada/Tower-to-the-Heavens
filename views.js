class View {
    draw(canvasContext) {
        throw "Error: View.draw() needs to be overridden."
    }
}

class ViewGroup extends View {
    draw(canvasContext) {
        for (let view of this.views()) {
            view.draw(canvasContext);
        }
    }
    views() {
        throw "Error: ViewGroup.views() needs to be overridden."
    }
}

class GameViews extends ViewGroup {
    constructor(gameModels) {
        super();
        this.gameModels = gameModels;
        this._views = [
            this.getGameBackground(), this.getGameBattleAnimationArea(),
            this.getPlayerCharacter(), this.getPlayerCharacterLabelText(),
            this.getEnemyCharacter(), this.getEnemyCharacterLabelText(),
            this.getStatusBarArea(), this.getPlayerHPLabelText(),
            this.getPlayerHPPointsText(), this.getPlayerPWRLabelText(),
            this.getPlayerPWRPointsText(), this.getEnemyHPLabelText(),
            this.getEnemyHPPointsText(), this.getEnemyPWRLabelText(),
            this.getEnemyPWRPointsText(), this.getMovesArea(),
            this.getMovesButton(), this.getMovesButtonText()
        ];
    }
    views() {
        return this._views;
    }
    getView(key, drawLambda) {
        if(!this[key]) {
            this[key] = new View();
            this[key].draw = drawLambda;
        }
        return this[key];
    }
    getGameBackground() {
        return this.getView('_gameBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            canvasContext.fillStyle = canvasModel.backgroundColour();
            canvasContext.fillRect(0, 0, canvasModel.width(), canvasModel.height());
        });
    }
    getGameBattleAnimationArea() {
        return this.getView('_gameBattleAnimationArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            canvasContext.fillStyle = 'cyan';
            canvasContext.fillRect(0, 0, canvasModel.width(), 200);
        });
    }
    getPlayerCharacter() {
        return this.getView('_playerCharacter', (canvasContext) => {
            canvasContext.fillStyle = 'blue';
            canvasContext.fillRect(100, 50, 100, 150);
        });
    }
    getPlayerCharacterLabelText() {
        return this.getView('_playerCharacterLabelText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("Lucy", 125, 40);
        });
    }
    getEnemyCharacter() {
        return this.getView('_enemyCharacter', (canvasContext) => {
            canvasContext.fillStyle = 'red';
            canvasContext.fillRect(600, 50, 100, 150);
        });
    }
    getEnemyCharacterLabelText() {
        return this.getView('_enemyCharacterLabel', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("Enemy", 620, 40);
        });
    }
    getStatusBarArea() {
        return this.getView('_statusBarArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            canvasContext.fillStyle = 'lightGray';
            canvasContext.fillRect(0, 200, canvasModel.width(), 70);
        });
    }
    getPlayerHPLabelText() {
        return this.getView('_playerHPLabelText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("HP:", 10, 225);
        });
    }
    getPlayerHPPointsText() {
        return this.getView('_playerHPPointsText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("100 / 100", 50, 225);
        });
    }
    getPlayerPWRLabelText() {
        return this.getView('_playerPWRLabelText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("PWR:", 10, 255);
        });
    }
    getPlayerPWRPointsText() {
        return this.getView('_playerPWRPointsText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("0", 70, 255);
        });
    }
    getEnemyHPLabelText() {
        return this.getView('_enemyHPLabelText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("HP:", 660, 225);
        });
    }
    getEnemyHPPointsText() {
        return this.getView('_enemyHPPointsText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("100 / 100", 700, 225);
        });
    }
    getEnemyPWRLabelText() {
        return this.getView('_enemyPWRLabelText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("PWR:", 660, 255);
        });
    }
    getEnemyPWRPointsText() {
        return this.getView('_enemyPWRPointsText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("0", 720, 255);
        });
    }
    getMovesArea() {
        return this.getView('_movesArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            canvasContext.fillStyle = 'darkGray';
            canvasContext.fillRect(0, 270, canvasModel.width(), 330);
        });
    }
    getMovesButton() {
        return this.getView('_movesButton', (canvasContext) => {
            canvasContext.fillStyle = 'gray';
            canvasContext.fillRect(50, 350, 700, 200);
        });
    }
    getMovesButtonText() {
        return this.getView('_movesButtonText', (canvasContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "100px Arial";
            canvasContext.fillText("Attack", 275, 475);
        });
    }
}
