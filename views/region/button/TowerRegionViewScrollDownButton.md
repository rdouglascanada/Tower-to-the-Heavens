# LevelRegionViewScrollDownButton

## Summary
Subclasses the LevelRegionViewButton class in order to override `drawLocked()` and `drawUnlocked()` implementations.
Represents a button drawn in a tower region that corresponds to scrolling down in the level selection menu.

## Diagram
<center>
!["LevelRegionViewScrollDownButton UML Diagram"](../../../images/views/region/button/LevelRegionViewScrollDownButton.png "LevelRegionViewScrollDownButton UML Diagram")
</center>

## Constructors
* **LevelRegionViewScrollDownButton()**: constructs a `LevelRegionViewScrollDownButton` object.

## Methods
* **drawLocked()** (void): overridden to draw a shaded down arrow button.
* **drawUnlocked()** (void): overridden to draw an unshaded down arrow button.
