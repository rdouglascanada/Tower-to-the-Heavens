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
            this.getPlayerCharacterAvatar(), this.getPlayerCharacterLabelText(),
            this.getEnemyCharacterAvatar(), this.getEnemyCharacterLabelText(),
            this.getStatusBarArea(), this.getPlayerHPText(),
            this.getPlayerPWRText(), this.getEnemyHPText(),
            this.getMovesArea(), this.getMovesButton()
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
    getPlayerCharacterAvatar() {
        return this.getView('_playerCharacter', (canvasContext) => {
            canvasContext.fillStyle = 'blue';
            canvasContext.fillRect(100, 50, 100, 150);
        });
    }
    getPlayerCharacterLabelText() {
        return this.getView('_playerCharacterLabelText', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.textBaseline = "alphabetic";
            canvasContext.fillText(playerModel.name(), 125, 40);
        });
    }
    getEnemyCharacterAvatar() {
        return this.getView('_enemyCharacter', (canvasContext) => {
            canvasContext.fillStyle = 'red';
            canvasContext.fillRect(600, 50, 100, 150);
        });
    }
    getEnemyCharacterLabelText() {
        return this.getView('_enemyCharacterLabel', (canvasContext) => {
            const enemyModel = this.gameModels.getEnemyModel();
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.textBaseline = "alphabetic";
            canvasContext.fillText(enemyModel.name(), 610, 40);
        });
    }
    getStatusBarArea() {
        return this.getView('_statusBarArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            canvasContext.fillStyle = 'lightGray';
            canvasContext.fillRect(0, 200, canvasModel.width(), 70);
        });
    }
    getPlayerHPText() {
        return this.getView('_playerHPText', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            const playerHPText = "HP: " + playerModel.hp + " / " + playerModel.maxHP();
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.textBaseline = "alphabetic";
            canvasContext.fillText(playerHPText, 10, 225);
        });
    }
    getPlayerPWRText() {
        return this.getView('_playerPWRText', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            const playerPWRText = "PWR: " + playerModel.pwr;
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.textBaseline = "alphabetic";
            canvasContext.fillText(playerPWRText, 10, 255);
        });
    }
    getEnemyHPText() {
        return this.getView('_enemyHPText', (canvasContext) => {
            const enemyModel = this.gameModels.getEnemyModel();
            const enemyHPText = "HP: " + enemyModel.hp + " / " + enemyModel.maxHP();
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.textBaseline = "alphabetic";
            canvasContext.fillText(enemyHPText, 660, 225);
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
            const movesButtonModel = this.gameModels.getMovesButtonModel();
            if (movesButtonModel.highlighted) {
                canvasContext.fillStyle = 'magenta';
            } else {
                canvasContext.fillStyle = 'gray';
            }
            canvasContext.fillRect(movesButtonModel.x(), movesButtonModel.y(),
                movesButtonModel.width(), movesButtonModel.height());

            canvasContext.fillStyle = 'black';
            canvasContext.font = "100px Arial";
            canvasContext.textBaseline = "middle";
            const buttonText = "Attack";
            const textWidth = canvasContext.measureText(buttonText).width;

            canvasContext.fillText(buttonText,
                movesButtonModel.x() + (movesButtonModel.width() - textWidth) / 2,
                movesButtonModel.y() + movesButtonModel.height() / 2
            );
        });
    }
}
