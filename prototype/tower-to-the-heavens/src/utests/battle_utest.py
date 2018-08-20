'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
import unittest
from battle import Battle
from data import get_data_manager, UnitNames


class Test(unittest.TestCase):
    def testIsWon(self):
        data_manager = get_data_manager()
        
        lucy = data_manager.getUnit(UnitNames.LUCY).generate_battler()
        fire_mage = data_manager.getUnit(UnitNames.FIRE_MAGE).generate_battler()
        batuman = data_manager.getUnit(UnitNames.BATUMAN).generate_battler()
        
        battle = Battle({'lucy':lucy, 'enemies':(fire_mage, batuman)})
        self.assertEqual(False, battle.is_won())
        fire_mage.take_damage(fire_mage.max_hitpoints())
        self.assertEqual(False, battle.is_won())
        batuman.take_damage(batuman.max_hitpoints())
        self.assertEqual(True, battle.is_won())
        return
    
    def testIsLost(self):
        data_manager = get_data_manager()
        
        lucy = data_manager.getUnit(UnitNames.LUCY).generate_battler()
        fire_mage = data_manager.getUnit(UnitNames.FIRE_MAGE).generate_battler()
        batuman = data_manager.getUnit(UnitNames.BATUMAN).generate_battler()
        
        battle = Battle({'lucy':lucy, 'enemies':(fire_mage, batuman)})
        self.assertEqual(False, battle.is_lost())
        lucy.take_damage(lucy.max_hitpoints())
        self.assertEqual(True, battle.is_lost())
        return

if __name__ == "__main__":
    unittest.main()