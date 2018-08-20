'''
@author: Richard Douglas
Created on Aug 19, 2018
'''
class StatusNames:
    NONE = "None"
    BLIND = "Blind"

class StatusData:
    data = [
            {
                'name': StatusNames.NONE,
                'index':0,
                'is_none': True,
            },
            {
                'name': StatusNames.BLIND,
                'index':1,
                'is_blind': True,
            },
        ]