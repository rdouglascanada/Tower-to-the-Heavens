# LevelRegionViewLevelButton

## Summary
Subclasses the LevelRegionViewButton class in order to override `drawLocked()` and `drawUnlocked()` implementations.
Represents a button drawn in a tower region that corresponds to selecting a level.

## Diagram
<center>
!["LevelRegionViewLevelButton UML Diagram"](../../../images/views/region/button/LevelRegionViewLevelButton.png "LevelRegionViewLevelButton UML Diagram")
</center>

## Constructors
* **LevelRegionViewLevelButton()**: constructs a `LevelRegionViewLevelButton` object.

## Methods
* **drawLocked()** (void): overridden to draw a rectangular shaded button.
* **drawUnlocked()** (void): overridden to draw a rectangular unshaded button.
