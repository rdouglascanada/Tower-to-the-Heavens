# LevelSelectionRegion

## Summary
Works with the `LevelSelector` object in order to get the appropriate model values to the `TowerRegionView`. Implements the `TowerRegionModelInterface`

## Diagram
<center>
!["LevelSelectionRegion UML Diagram"](../../../images/models/level/selection/LevelSelectionRegion.png "LevelSelectionRegion UML Diagram")
</center>

## Constants
* **NUMBER_OF_REGIONS** (integer): the number of region objects that are being used in the game. Used for scrolling.

## Attributes
* **levelSelector** (LevelSelector): a reference to `LevelSelector` which manages the information about whether the `Level` corresponding to this region is locked and what its number is.
* **offset** (integer): a value used to tell `LevelSelector` which `Level` we are interested in.

## Constructors
* **LevelSelectionRegion(levelSelectorValue (LevelSelector), offsetValue (integer))**: constructs a `LevelSelectionRegion` object with the `levelSelector` attribute set to `levelSelectorValue`, and the `offset` attribute set to `offsetValue`.

## Methods
* **getLevelNumber()** (integer): returns the level number corresponding to this region. This is computed using `this.levelSelector.getRegionLevelNumber(this.offset)`.
* **isUnlocked()** (boolean): returns `true` if this region has been unlocked by the player; else returns `false`. This is computed using `this.levelSelector.isRegionLevelUnlocked(this.offset)`.
* **scrollDown()** (void): Calls `this.levelSelector.moveRegionIndex(-this.NUMBER_OF_REGIONS)` in order to display the previous sequence of `Levels`.
* **scrollUp()** (void): Calls `this.levelSelector.moveRegionIndex(this.NUMBER_OF_REGIONS)` in order to display the next sequence of `Levels`.
