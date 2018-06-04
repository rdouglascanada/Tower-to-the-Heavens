# LevelSelector

## Summary
Manages the `Level` objects in the context of which one is selected, which ones are unlocked, and what level information the region models should be retrieving.

## Diagram
<center>
!["LevelSelector UML Diagram"](../../../images/models/level/selection/LevelSelector.png "LevelSelector UML Diagram")
</center>

## Attributes
* **baseIndex** (integer): the index of the `levels` collection attribute that `LevelRegion` objects should start getting `Level` objects from.
* **levels** (Level[]): The levels in the game.
* **selectedIndex** (integer): the index of the `levels` collection attribute for the `Level` that the player has selected. If it is `-1`, then no `Level` is selected.
* **unlockedIndex** (integer): the index of the `levels` collection of the maximum level that the player has unlocked. All levels before that index are also considered to be unlocked. All levels after that index are considered to be locked.

## Constructors
* **LevelSelector(levelsValue (Level[]), baseIndexValue (integer), selectedIndexValue (integer), unlockedIndexValue (integer))**: constructs a `LevelSelector` object with the `levels` attribute set to `levelsValue`, the `baseIndex` attribute set to `baseIndexValue` (which has a default value of `0`), the `selectedIndex` attribute set to `selectedIndexValue` (which has a default value of `-1`), and the `unlockedIndex` attribute set to `unlockedIndexValue` (which has a default value of `0`).

## Methods
* **getBaseIndex()** (integer): returns `this.baseIndex`.
* **getLevelNumber(offset (integer))** (Level): returns `this.levels[this.baseIndex + offset].getNumber()`. The `offset` parameter has a default value of `0`.
* **getSelectedIndex()** (integer): returns `this.selectedIndex`.
* **getSelectedLevel()** (Level): returns `this.levels[this.selectedIndex]`; throws an exception if `this.selectedIndex` is out of bounds or is `-1`.
* **isLevelSelected()**: returns `true` if `this.selectedIndex` is not `-1`; `false` otherwise.
* **isLevelUnlocked(offset (integer))** (boolean): returns `true` if `this.baseIndex + offset <= this.unlockedIndex`; else returns `false`.
* **isOffsetValid(offset (integer))** (boolean): returns `true` if `0 <= this.baseIndex + offset < this.levels.length`; else returns `false`.
* **moveBaseIndex(indexDisplacement (integer))** (void): changes `baseIndex` by the passed in `indexDisplacement` value. If `indexDisplacement` is positive, then `baseIndex` is increased; otherwise it is decreased.
* **selectIndex(offset (integer))** (void): sets `this.selectedIndex` equal to `this.baseIndex + offset`. The `offset` parameter has a default value of `0`.
* **unselectIndex()** (void): sets `this.selectedIndex` equal to `-1`.
