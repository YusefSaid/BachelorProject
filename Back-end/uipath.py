import requests, json
from typing import Dict, List
 
class Orchestrator:
    """ Class for handling the Orchestrator REST API"""
 
    def __init__(self) -> None:
 
        self.username = "api_wo0000001503650"
        self.password = "Q#Yfe=2zL99ukT!NP"
        self.baseurl = "https://uipath-orchestrator-dev.conti.de"
 
        self.token = self.authenticate()
 
    def authenticate(self) -> str:
        """Authenticate with the Orchestrator"""
 
        headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        }
 
        json_data = {
        'tenancyName': 'Default',
        'usernameOrEmailAddress': self.username,
        'password': self.password,
        }
 
        uri = f"{self.baseurl}/api/Account/Authenticate"
 
        response = requests.post(uri, headers=headers, json=json_data, verify=False)
        resp_dict = json.loads(response.text)
        #print(resp_dict['result'])
        print(response.status_code)
        return resp_dict['result']
 
    def add_queue_item(self, q_name: str) -> None:
        """Adds a queue item to a queue"""
 
        headers = {
        'Authorization': "Bearer "+self.token,
        'accept': 'application/json',
        'X-UIPATH-OrganizationUnitId': '21',
        'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
        }   
 
        json_data = {
            'itemData': {
                'Name': q_name,
                'Priority': 'High',
                'SpecificContent': {},
                'DeferDate': '2022-12-06T10:48:36.840Z',
                'DueDate': '2022-12-06T10:48:36.840Z',
                'RiskSlaDate': '2022-12-06T10:48:36.840Z',
                'Reference': 'API Test',
                'Progress': 'string',
            },
        }
 
        response = requests.post(
            'https://uipath-orchestrator-dev.conti.de/odata/Queues/UiPathODataSvc.AddQueueItem',
            headers=headers,
            json=json_data,
            verify=False
        )
 
 
 
    def get_all_processes(self, countries: List[int]) -> Dict[int, List[str]]:
        all_processes = {}
 
 
        for country in countries:
            print(f"Getting processes for country (folder_id): {country}")
 
            headers = {
            'Authorization': "Bearer " + self.token,
            'accept': 'application/json',
            'X-UIPATH-OrganizationUnitId': str(country),
            'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
            }
 
            response = requests.get(
            'https://uipath-orchestrator-dev.conti.de/odata/QueueDefinitions',
            headers=headers,
            verify=False
            )
 
            resp_dict = json.loads(response.text)
            with open('processes.json', "w") as f:
                json.dump(resp_dict, f, indent=4)
            print(f"Response for country {country}: {resp_dict}")
 
            if 'value' in resp_dict:
                processes = [element['Name'] for element in resp_dict['value']]
                all_processes[country] = processes
        else:
                print(f"No 'value' key found in response for folder_id {country}. Full response: {resp_dict}")
 
        return all_processes
 
 
def main():
    """Main function"""
 
    countries = [21] # add other ountry folder id's when FA has access to them
 
    dev = Orchestrator()
    all_processes = dev.get_all_processes(countries)
 
    print("All processes:")
    print(all_processes)