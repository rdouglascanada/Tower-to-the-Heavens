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
    static fillText(args) {
        const canvasContext = args.canvasContext;
        canvasContext.fillStyle = args.colour;
        canvasContext.font = args.font;
        canvasContext.textBaseline = args.textBaseline;
        if (args.horizontalAlign === 'middle') {
            const textWidth = canvasContext.measureText(args.text).width;
            args.x = args.x + (args.width - textWidth) / 2;
        }
        if (args.textBaseline === 'middle') {
            args.y += args.height / 2;
        }
        canvasContext.fillText(args.text, args.x, args.y);
    }
}

class GameViews extends ViewGroup {
    constructor(gameModels) {
        super();
        this.gameModels = gameModels;
        this._titleViews = [
            this.getGameBackground(), this.getTitleBackground(),
            this.getTitleLabelText(), this.getTitleStartButton()
        ];
        this._battleViews = [
            this.getGameBackground(), this.getGameBattleAnimationArea(),
            this.getPlayerCharacterAvatar(), this.getPlayerCharacterLabelText(),
            this.getEnemyCharacterAvatar(), this.getEnemyCharacterLabelText(),
            this.getStatusBarArea(), this.getPlayerHPText(),
            this.getPlayerPWRText(), this.getEnemyHPText(),
            this.getMovesArea(), this.getMovesButton()
        ];
    }
    views() {
        return this._titleViews;
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
    getTitleBackground() {
        return this.getView('_titleBackground', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'lightGray',
                x: 0, y: 0, width: canvasModel.width(), height: canvasModel.height()
            });
        });
    }
    getTitleLabelText() {
        return this.getView('_titleLabelText', (canvasContext) => {
            const canvasModel = this.gameModels.getCanvasModel();
            ViewUtils.fillText({
                canvasContext,
                text: 'Tower to the Heavens',
                colour: 'black',
                font: 'bold 72px Arial',
                textBaseline: 'middle',
                x: 0, y: 100,
                width: canvasModel.width(), height: 10,
                horizontalAlign: 'middle'
            });
        });
    }
    getTitleStartButton() {
        return this.getView('_titleStartButton', (canvasContext) => {
            ViewUtils.fillRectangle({
                canvasContext,
                colour: 'gray',
                x: 100, y: 300,
                width: 125, height: 100
            });
            ViewUtils.fillText({
                canvasContext,
                text: "Start",
                colour: 'black',
                font: 'bold 30px Arial',
                textBaseline: 'middle',
                x: 100,
                y: 300,
                width: 125,
                height: 100,
                horizontalAlign: 'middle'
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
            ViewUtils.fillText({
                canvasContext,
                text: playerModel.name(),
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'middle',
                x: 100, y: 30,
                width: 100, height: 10,
                horizontalAlign: 'middle'
            });
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
            ViewUtils.fillText({
                canvasContext,
                text: enemyModel.name(),
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'middle',
                x: 600, y: 30, width: 100, height: 10,
                horizontalAlign: 'middle'
            });
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
            ViewUtils.fillText({
                canvasContext,
                text: playerHPText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 10, y: 225
            });
        });
    }
    getPlayerPWRText() {
        return this.getView('_playerPWRText', (canvasContext) => {
            const playerModel = this.gameModels.getPlayerModel();
            const playerPWRText = "PWR: " + playerModel.pwr;
            ViewUtils.fillText({
                canvasContext,
                text: playerPWRText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 10, y: 255
            });
        });
    }
    getEnemyHPText() {
        return this.getView('_enemyHPText', (canvasContext) => {
            const enemyModel = this.gameModels.getEnemyModel();
            const enemyHPText = "HP: " + enemyModel.hp + " / " + enemyModel.maxHP();
            ViewUtils.fillText({
                canvasContext,
                text: enemyHPText,
                colour: 'black',
                font: '20px Arial',
                textBaseline: 'alphabetic',
                x: 660, y: 225
            });
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
            const movesButtonColour = movesButtonModel.highlighted ? 'magenta' : 'gray';
            ViewUtils.fillRectangle({
                canvasContext,
                colour: movesButtonColour,
                x: movesButtonModel.x(), y: movesButtonModel.y(),
                width: movesButtonModel.width(), height: movesButtonModel.height()
            });
            ViewUtils.fillText({
                canvasContext,
                text: "Attack",
                colour: 'black',
                font: '100px Arial',
                textBaseline: 'middle',
                x: movesButtonModel.x(),
                y: movesButtonModel.y(),
                width: movesButtonModel.width(),
                height: movesButtonModel.height(),
                horizontalAlign: 'middle'
            });
        });
    }
}
