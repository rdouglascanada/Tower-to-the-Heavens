class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class GameEvents {
    constructor(gameModels) {
        this.gameModels = gameModels;
        this.clickStateMap = {
            'title': [
                this.getClickTitleStartButtonHandler()
            ],
            'battle': [
                this.getClickBattleAttackButtonHandler(),
                this.getClickBattleTakeDamageButtonHandler()
            ]
        };
    }
    registerHandlers(canvas) {
        canvas.addEventListener("click", (event) => {
            const stateModel = this.gameModels.getStateModel();
            for (let handler of this.clickStateMap[stateModel.state()]) {
                handler.handle(event);
            }
        });
        canvas.addEventListener("mousemove", (event) => {
            this.getMouseMoveMouseModelHandler().handle(event);
        });
    }
    getHandler(key, handleLambda) {
        if(!this[key]) {
            this[key] = new EventHandler();
            this[key].handle = handleLambda;
        }
        return this[key];
    }
    getClickTitleStartButtonHandler() {
        return this.getHandler('_clickTitleStartButtonHandler', (event) => {
            const mouseModel = this.gameModels.getMouseModel();
            const mouseX = mouseModel.x;
            const mouseY = mouseModel.y;
            const buttonModel = this.gameModels.getTitleStartButtonModel();
            const buttonClicked =
                (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
                (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
            if (buttonClicked) {
                const stateModel = this.gameModels.getStateModel();
                stateModel.transitionToBattle();
            }
        });
    }
    getClickBattleAttackButtonHandler() {
        return this.getHandler('_clickBattleAttackButtonHandler', (event) => {
            const mouseModel = this.gameModels.getMouseModel();
            const mouseX = mouseModel.x;
            const mouseY = mouseModel.y;
            const buttonModel = this.gameModels.getBattleAttackButtonModel();
            const buttonClicked =
                (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
                (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
            if (buttonClicked) {
                const enemyModel = this.gameModels.getEnemyModel();
                enemyModel.takeDamage(10);
            }
        });
    }
    getClickBattleTakeDamageButtonHandler() {
        return this.getHandler('_clickBattleTakeDamageButtonHandler', (event) => {
            const mouseModel = this.gameModels.getMouseModel();
            const mouseX = mouseModel.x;
            const mouseY = mouseModel.y;
            const buttonModel = this.gameModels.getBattleTakeDamageButtonModel();
            const buttonClicked =
                (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
                (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
            if (buttonClicked) {
                const playerModel = this.gameModels.getPlayerModel();
                playerModel.takeDamage(10);
            }
        });
    }
    getMouseMoveMouseModelHandler() {
        return this.getHandler('_mouseMoveMouseModelHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const mouseModel = this.gameModels.getMouseModel();
            mouseModel.x = mouseX;
            mouseModel.y = mouseY;
        });
    }
}