'''
status.py

@author: Richard Douglas
Created on Aug 18, 2018
'''
class StatusEffect:
    def __init__(self, args):
        self.name = lambda: args['name']
        self.is_none = lambda: args.get('is_none', False)
        self.is_blind = lambda: args.get('is_blind', False)
        return

class StatusNames:
    NONE = "None"
    BLIND = "Blind"

class StatusData:
    data = [
            {
                'name': StatusNames.NONE,
                'is_none': True,
            },
            {
                'name': StatusNames.BLIND,
                'is_blind': True,
            },
        ]

class StatusFactory:
    def __init__(self, data):
        self._templates = {}
        for status_data in data:
            status_effect = StatusEffect(status_data)
            self._templates[status_data['name']] = status_effect
        return
    
    def getStatus(self, name):
        return self._templates[name]