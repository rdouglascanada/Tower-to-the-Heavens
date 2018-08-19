'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from data import get_data_manager, MoveNames, StatusNames


class Test(unittest.TestCase):
    def testMoveCreation(self):
        data_manager = get_data_manager()
        
        attack = data_manager.getMove(MoveNames.ATTACK)
        self.assertEqual(MoveNames.ATTACK, attack.name())
        self.assertEqual(0, attack.cost())
        self.assertEqual(10, attack.damage())
        self.assertEqual(StatusNames.NONE, attack.status_effect().name())
        
        homing_fire = data_manager.getMove(MoveNames.HOMING_FIRE)
        self.assertEqual(MoveNames.HOMING_FIRE, homing_fire.name())
        self.assertEqual(10, homing_fire.cost())
        self.assertEqual(20, homing_fire.damage())
        self.assertEqual(StatusNames.NONE, homing_fire.status_effect().name())
        
        blinding_darkness = data_manager.getMove(MoveNames.BLINDING_DARKNESS)
        self.assertEqual(MoveNames.BLINDING_DARKNESS, blinding_darkness.name())
        self.assertEqual(20, blinding_darkness.cost())
        self.assertEqual(10, blinding_darkness.damage())
        self.assertEqual(StatusNames.BLIND, blinding_darkness.status_effect().name())
        return

if __name__ == "__main__":
    unittest.main()