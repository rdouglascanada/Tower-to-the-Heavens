class EventHandler {
    handle(event) {
        throw "Error: EventHandler.handle(event) needs to be overridden."
    }
}

class GameEvents {
    constructor(gameModel) {
        this.gameModel = gameModel;
        this._mouseMoveHandlers = [this.getMovesButtonMouseMoveHandler()];
    }
    registerHandlers(canvas) {
        for (let handler of this._mouseMoveHandlers) {
            canvas.addEventListener("mousemove", handler.handle);
        }
    }
    getHandler(key, handleLambda) {
        if(!this[key]) {
            this[key] = new EventHandler();
            this[key].handle = handleLambda;
        }
        return this[key];
    }
    getMovesButtonMouseMoveHandler() {
        return this.getHandler('_movesButtonMouseMoveHandler', (event) => {
            const element = event.target;
            const mouseX = event.pageX - element.offsetLeft;
            const mouseY = event.pageY - element.offsetTop;

            const movesButtonModel = this.gameModel.getMovesButtonModel();
            movesButtonModel.highlighted =
                (movesButtonModel.x() <= mouseX && mouseX <= movesButtonModel.x() + movesButtonModel.width()) &&
                (movesButtonModel.y() <= mouseY && mouseY <= movesButtonModel.y() + movesButtonModel.height());
        });
    }
}