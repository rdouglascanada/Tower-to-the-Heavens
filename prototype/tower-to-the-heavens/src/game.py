'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from game_factory import GameFactory

class Game:
    _factory = None
    
    @staticmethod
    def get_game_factory():
        if not Game._factory:
            from move import MoveData
            from status import StatusData
            from unit import UnitData
            Game._factory = GameFactory(StatusData.data, MoveData.data, UnitData.data)
        return Game._factory