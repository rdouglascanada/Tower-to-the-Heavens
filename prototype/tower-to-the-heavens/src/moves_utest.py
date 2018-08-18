'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
import unittest
from game_factory import create_game_factory
from moves import MoveNames


class Test(unittest.TestCase):
    def testMoveCreation(self):
        factory = create_game_factory()
        
        attack = factory.getMove(MoveNames.ATTACK)
        self.assertEqual(MoveNames.ATTACK, attack.name())
        self.assertEqual(0, attack.cost())
        self.assertEqual(10, attack.damage())
        
        homing_fire = factory.getMove(MoveNames.HOMING_FIRE)
        self.assertEqual(MoveNames.HOMING_FIRE, homing_fire.name())
        self.assertEqual(10, homing_fire.cost())
        self.assertEqual(20, homing_fire.damage())
        
        blinding_darkness = factory.getMove(MoveNames.BLINDING_DARKNESS)
        self.assertEqual(MoveNames.BLINDING_DARKNESS, blinding_darkness.name())
        self.assertEqual(20, blinding_darkness.cost())
        self.assertEqual(10, blinding_darkness.damage())
        return

if __name__ == "__main__":
    unittest.main()