'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from game_factory import create_game_factory
from unit import UnitNames
from move import MoveNames 


class Test(unittest.TestCase):
    def testUnitCreation(self):
        factory = create_game_factory()
        
        fire_mage = factory.getUnit(UnitNames.FIRE_MAGE)
        self.assertEqual(UnitNames.FIRE_MAGE, fire_mage.name())
        self.assertEqual((MoveNames.HOMING_FIRE,), tuple(mv.name() for mv in fire_mage.moves()))
        
        batuman = factory.getUnit(UnitNames.BATUMAN)
        self.assertEqual(UnitNames.BATUMAN, batuman.name())
        self.assertEqual((MoveNames.BLINDING_DARKNESS,), tuple(mv.name() for mv in batuman.moves()))
        return

if __name__ == "__main__":
    unittest.main()