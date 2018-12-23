class View {
    draw(gameContext) {
        throw "Error: View.draw() needs to be overridden."
    }
    static constructFromLambda(drawLambda) {
        const view = new View();
        view.draw = drawLambda;
        return view;
    }
}

class ViewGroup extends View {
    constructor(views) {
        super();
        this.views = views;
    }
    draw(gameContext) {
        for (let view of this.views) {
            view.draw(gameContext);
        }
    }
}

class GameViews extends ViewGroup {
    constructor() {
        let views = [
            GameViews.initGameBackground(), GameViews.initGameBattleAnimationArea(),
            GameViews.initPlayerCharacter(), GameViews.initPlayerCharacterLabelText(),
            GameViews.initEnemyCharacter(), GameViews.initEnemyCharacterLabelText(),
            GameViews.initStatusBarArea(), GameViews.initPlayerHPLabelText(),
            GameViews.initPlayerHPPointsText(), GameViews.initPlayerPWRLabelText(),
            GameViews.initPlayerPWRPointsText(), GameViews.initEnemyHPLabelText(),
            GameViews.initEnemyHPPointsText(), GameViews.initEnemyPWRLabelText(),
            GameViews.initEnemyPWRPointsText(), GameViews.initMovesArea(),
            GameViews.initMovesButton(), GameViews.initMovesButtonText()
        ];
        super(views);
    }

    static initGameBackground() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = gameBackgroundColour;
            canvasContext.fillRect(0, 0, gameWidth, gameHeight);
        });
    }
    static initGameBattleAnimationArea() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'cyan';
            canvasContext.fillRect(0, 0, gameWidth, 200);
        });
    }
    static initPlayerCharacter() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'blue';
            canvasContext.fillRect(100, 50, 100, 150);
        });
    }
    static initPlayerCharacterLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("Lucy", 125, 40);
        });
    }
    static initEnemyCharacter() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'red';
            canvasContext.fillRect(600, 50, 100, 150);
        });
    }
    static initEnemyCharacterLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("Enemy", 620, 40);
        });
    }
    static initStatusBarArea() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'lightGray';
            canvasContext.fillRect(0, 200, gameWidth, 70);
        });
    }
    static initPlayerHPLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("HP:", 10, 225);
        });
    }
    static initPlayerHPPointsText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("100 / 100", 50, 225);
        });
    }
    static initPlayerPWRLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("PWR:", 10, 255);
        });
    }
    static initPlayerPWRPointsText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("0", 70, 255);
        });
    }
    static initEnemyHPLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("HP:", 660, 225);
        });
    }
    static initEnemyHPPointsText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("100 / 100", 700, 225);
        });
    }
    static initEnemyPWRLabelText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("PWR:", 660, 255);
        });
    }
    static initEnemyPWRPointsText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "20px Arial";
            canvasContext.fillText("0", 720, 255);
        });
    }
    static initMovesArea() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'darkGray';
            canvasContext.fillRect(0, 270, gameWidth, 330);
        });
    }
    static initMovesButton() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'gray';
            canvasContext.fillRect(50, 350, 700, 200);
        });
    }
    static initMovesButtonText() {
        return View.constructFromLambda((gameContext) => {
            canvasContext.fillStyle = 'black';
            canvasContext.font = "100px Arial";
            canvasContext.fillText("Attack", 275, 475);
        });
    }
}
