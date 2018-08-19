'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from data import get_data_manager, UnitNames, MoveNames 


class Test(unittest.TestCase):
    def testUnitCreation(self):
        data_manager = get_data_manager()
        
        fire_mage = data_manager.getUnit(UnitNames.FIRE_MAGE)
        self.assertEqual(UnitNames.FIRE_MAGE, fire_mage.name())
        self.assertEqual(10, fire_mage.max_hitpoints())
        self.assertEqual(10, fire_mage.power())
        self.assertEqual((MoveNames.HOMING_FIRE,), tuple(mv.name() for mv in fire_mage.moves()))
        
        batuman = data_manager.getUnit(UnitNames.BATUMAN)
        self.assertEqual(UnitNames.BATUMAN, batuman.name())
        self.assertEqual(30, batuman.max_hitpoints())
        self.assertEqual(20, batuman.power())
        self.assertEqual((MoveNames.BLINDING_DARKNESS,), tuple(mv.name() for mv in batuman.moves()))
        return

if __name__ == "__main__":
    unittest.main()