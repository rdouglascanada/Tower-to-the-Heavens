'''
@author: Richard Douglas
Created on Aug 18, 2018
'''
from moves import Move
from status import StatusEffect

class GameFactory:
    def __init__(self, move_data, status_data):
        self._move_templates = {}
        self._status_templates = {}
        self.load_status_data(status_data)
        self.load_move_data(move_data)
        return
    
    def load_status_data(self, data):
        for status_data in data:
            self._status_templates[status_data['name']] = StatusEffect(status_data)
        return
    
    def load_move_data(self, data):
        for move_data in data:
            move_data['status-effect'] = self.getStatus(move_data['status_name'])
            self._move_templates[move_data['name']] = Move(move_data)
        return
    
    def getMove(self, name):
        return self._move_templates[name]
    
    def getStatus(self, name):
        return self._status_templates[name]

def create_game_factory():
    from moves import MoveData
    from status import StatusData
    return GameFactory(MoveData.data, StatusData.data)