# LevelRegionViewButton

## Summary
Represents the button drawn in a tower region.
***This is an abstract class.***

## Diagram
<center>
!["LevelRegionViewButton UML Diagram"](../../../images/views/region/button/LevelRegionViewButton.png "LevelRegionViewButton UML Diagram")
</center>

## Constructors
* ***This is an abstract class.***

## Methods
* **draw(model(LevelRegionInterface))** (void): calls `drawUnlocked()` if `model.isUnlocked()` returns true; otherwise calls `drawLocked()`; however if `model.getLevelNumber()` is less than `1` then nothing is drawn.
* **drawLocked()** (void): *(abstract method)* draws a shaded button.
* **drawUnlocked()** (void): *(abstract method)* draws an unshaded button.
