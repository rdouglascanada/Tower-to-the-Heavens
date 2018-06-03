# TowerRegionViewBackground

## Summary
Represents the shaded or unshaded area drawn behind tower buttons.

## Diagram
<center>
!["TowerRegionViewBackground UML Diagram"](../../images/views/region/TowerRegionViewBackground.png "TowerRegionViewBackground UML Diagram")
</center>

## Constructors
* **TowerRegionBackgroundView()**: constructs a `TowerRegionBackgroundView` object.

## Methods
* **draw(model (TowerRegionModelInterface))** (void): if `model.isUnlocked()` returns `true` then calls `drawUnlocked()`; else calls `drawLocked()`
* **drawLocked()** (void): draws a shaded background.
* **drawUnlocked()** (void): draws an unshaded background.
