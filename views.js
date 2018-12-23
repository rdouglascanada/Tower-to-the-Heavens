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

class ViewUtils {
    static fillRectangle(args) {
        const canvasContext = args.canvasContext;
        canvasContext.fillStyle = args.colour;
        canvasContext.fillRect(args.x, args.y, args.width, args.height);
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
            ViewUtils.fillRectangle({
                canvasContext,
                colour: canvasModel.backgroundColour(),
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getGameBattleAnimationArea() {
        return this.getView('_gameBattleAnimationArea', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'cyan',
                x: 0, y: 0, width: canvasModel.width(), height: 200
            });
        });
    }
    getPlayerCharacterAvatar() {
        return this.getView('_playerCharacter', (canvasContext) => {
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'blue',
                x: 100, y: 50, width: 100, height: 150
            });
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
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'red',
                x: 600, y: 50, width: 100, height: 150
            });
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
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 200, width: canvasModel.width(), height: 70
            });
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
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'darkGray',
                x: 0, y: 270, width: canvasModel.width(), height: 330
            });
        });
    }
    getMovesButton() {
        return this.getView('_movesButton', (canvasContext) => {
            const movesButtonModel = this.gameModels.getMovesButtonModel();
            let movesButtonColour;
            if (movesButtonModel.highlighted) {
                movesButtonColour = 'magenta';
            } else {
                movesButtonColour = 'gray';
            }
            ViewUtils.fillRectangle({
                canvasContext,
                colour: movesButtonColour,
                x: movesButtonModel.x(), y: movesButtonModel.y(),
                width: movesButtonModel.width(), height: movesButtonModel.height()
            });

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
