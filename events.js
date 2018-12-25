class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class EventHandlerGroup extends EventHandler {
    handle(event) {
        for (let handler of this.handlers()) {
            handler.handle(event);
        }
    }
    handlers() {
        throw "Error: ViewGroup.views() needs to be overridden.";
    }
}

class EventUtils {
    static handleClickButton(buttonModel, mouseModel) {
        const mouseX = mouseModel.x;
        const mouseY = mouseModel.y;
        const buttonClicked =
            (buttonModel.x <= mouseX && mouseX <= buttonModel.x + buttonModel.width) &&
            (buttonModel.y <= mouseY && mouseY <= buttonModel.y + buttonModel.height);
        if (buttonClicked) {
            buttonModel.onClick();
        }
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
                this.getClickBattleMessageGroup()
            ],
            'levelSelection': [
                this.getClickLevelSelectionLevel1ButtonHandler()
            ],
            'victory': [
                this.getClickVictoryBattleAgainButtonHandler()
            ],
            'loss': [
                this.getClickLossBackToTitleButtonHandler()
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
    getHandlerGroup(key, handlersLambda) {
        if(!this[key]) {
            this[key] = new EventHandlerGroup();
            this[key].handlers = handlersLambda;
        }
        return this[key];
    }
    getClickTitleStartButtonHandler() {
        return this.getHandler('_clickTitleStartButtonHandler', (event) => {
            const buttonModel = this.gameModels.getTitleStartButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickLevelSelectionLevel1ButtonHandler() {
        return this.getHandler('_clickLevelSelectionLevel1ButtonHandler', (event) => {
            const buttonModel = this.gameModels.getLevelSelectionLevel1ButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickBattleMessageGroup() {
        const handlersStateMap = {
            'command': [this.getClickBattleAttackButtonHandler(), this.getClickBattleHomingFireButtonHandler()],
            'message' : [this.getClickBattleMessageButtonHandler()],
        };
        return this.getHandlerGroup('_clickBattleMessageGroup', () => {
            const battleStateModel = this.gameModels.getBattleStateModel();
            return handlersStateMap[battleStateModel.state()];
        });
    }
    getClickBattleMessageButtonHandler() {
        return this.getHandler('_clickBattleMessageButtonHandler', (event) => {
            const buttonModel = this.gameModels.getBattleMessageButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickBattleAttackButtonHandler() {
        return this.getHandler('_clickBattleAttackButtonHandler', (event) => {
            const buttonModel = this.gameModels.getBattleAttackButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickBattleHomingFireButtonHandler() {
        return this.getHandler('_clickBattleHomingFireButtonHandler', (event) => {
            const buttonModel = this.gameModels.getBattleHomingFireButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickVictoryBattleAgainButtonHandler() {
        return this.getHandler('_clickVictoryBattleAgainButtonHandler', (event) => {
            const buttonModel = this.gameModels.getVictoryBattleAgainButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getClickLossBackToTitleButtonHandler() {
        return this.getHandler('_clickLossBackToTitleButtonHandler', (event) => {
            const buttonModel = this.gameModels.getLossBackToTitleButtonModel();
            const mouseModel = this.gameModels.getMouseModel();
            EventUtils.handleClickButton(buttonModel, mouseModel);
        });
    }
    getMouseMoveMouseModelHandler() {
        return this.getHandler('_mouseMoveMouseModelHandler', (event) => {
            const mouseModel = this.gameModels.getMouseModel();
            const element = event.target;
            mouseModel.x = event.pageX - element.offsetLeft;
            mouseModel.y = event.pageY - element.offsetTop;
        });
    }
}