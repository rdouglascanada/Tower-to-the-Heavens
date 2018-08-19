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
            from battle import BattleData
            Game._factory = GameFactory({
                'status_data': StatusData.data,
                'move_data': MoveData.data,
                'unit_data': UnitData.data,
                'battle_data': BattleData.data
            })
        return Game._factory