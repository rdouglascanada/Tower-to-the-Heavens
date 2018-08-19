'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from data import get_data_manager, UnitNames, MoveNames


class Test(unittest.TestCase):
    def testBattlerGeneration(self):
        data_manager = get_data_manager()
        
        fire_mage_battler = data_manager.getUnit(UnitNames.FIRE_MAGE).generate_battler()
        self.assertEqual(UnitNames.FIRE_MAGE, fire_mage_battler.name())
        self.assertEqual(10, fire_mage_battler.max_hitpoints())
        self.assertEqual(10, fire_mage_battler.hitpoints())
        self.assertEqual(True, fire_mage_battler.is_alive())
        self.assertEqual((MoveNames.HOMING_FIRE,), tuple(mv.name() for mv in fire_mage_battler.moves()))
        
        batuman_battler = data_manager.getUnit(UnitNames.BATUMAN).generate_battler()
        self.assertEqual(UnitNames.BATUMAN, batuman_battler.name())
        self.assertEqual(30, batuman_battler.max_hitpoints())
        self.assertEqual(30, batuman_battler.hitpoints())
        self.assertEqual(True, batuman_battler.is_alive())
        self.assertEqual((MoveNames.BLINDING_DARKNESS,), tuple(mv.name() for mv in batuman_battler.moves()))
        return
    
    def testBattlerTakeDamage(self):
        data_manager = get_data_manager()
        
        batuman_battler = data_manager.getUnit(UnitNames.BATUMAN).generate_battler()
        self.assertEqual(30, batuman_battler.hitpoints())
        self.assertEqual(True, batuman_battler.is_alive())
        
        batuman_battler.take_damage(20)
        self.assertEqual(10, batuman_battler.hitpoints())
        self.assertEqual(True, batuman_battler.is_alive())
        
        batuman_battler.take_damage(20)
        self.assertEqual(0, batuman_battler.hitpoints())
        self.assertEqual(False, batuman_battler.is_alive())
        return

if __name__ == "__main__":
    unittest.main()