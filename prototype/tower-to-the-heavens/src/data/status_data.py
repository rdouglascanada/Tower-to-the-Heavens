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
                'is_none': True,
            },
            {
                'name': StatusNames.BLIND,
                'is_blind': True,
            },
        ]