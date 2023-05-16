import json
import requests
import re
 
 
 
 
 
class BMC_API:
    """ Handles all API calls with the BMC REST API """
 
    def __init__(self, cred_fp: str, title: str = None, description: str = None, uid: str = None) -> None:
        self.title = title
        self.description = description
        self.uid = uid
        self.cred_fp = cred_fp
 
        self.baseurl = "https://continentalit-restapi.onbmc.com"
        self.cred = self.read_cred()
        self.token = self.authenticate()
 
    def read_cred(self) -> dict:
        with open(self.cred_fp) as f:
            cred = json.load(f)
        return cred
 
    def authenticate(self) -> str:
        """ Authenticates BMC credentials and returns a token"""
 
        username = self.cred['username']
        password = self.cred['password']
 
        url = f"{self.baseurl}/api/jwt/login"
        headers = {
            'Content-type': 'application/x-www-form-urlencoded',
        }
        data = f'username={username}&password={password}'
 
        response = requests.post(url, headers=headers,
                                 data=data)
        self.token = response.text
        return self.token
 
    def get_service_reconciliation_identity(self, service_name: str, dataset_id: str) -> str:
        """ Fetches Reconciliation Identity for the given service name and dataset_id """
 
        headers = {
            'Content-type': 'application/json',
            'Authorization': f"AR-JWT {self.token}",
        }
 
        url = f"{self.baseurl}/api/arsys/v1/entry/AST:BusinessService?q='Name' = \"{service_name}\" AND 'Data Set Id'=\"{dataset_id}\"&fields=values(Reconciliation Identity)"
        response = requests.get(url, headers=headers)
 
        if response.status_code != 200:
            raise Exception(f"Error fetching Reconciliation Identity: {response.text}")
 
        response_dict = json.loads(response.text)
        reconciliation_identity = response_dict['entries'][0]['values']['Reconciliation Identity']
        return reconciliation_identity
 
    def create_workorder(self) -> tuple:
        """ Creates a new work order in BMC """
 
        headers = {
            'Content-type': 'application/json',
            'Authorization': f"AR-JWT {self.token}",
        }
 
        service_name = "TI Nordic Automation"
        dataset_id = "BMC.ASSET"
        reconciliation_identity = self.get_service_reconciliation_identity(service_name, dataset_id)
 
        payload = json.dumps({
            "values": {
                "z1D_Action": "CREATE",
                "Company": "Continental AG",
                "RequesterLoginID": self.uid,
                "Status": "Assigned",
                "Summary": self.title,
                "Detailed Description": self.description,
                "ReconciliationIdentity": reconciliation_identity,
                "CI Name": service_name,
 
            }
        })
 
        url = f"{self.baseurl}/api/arsys/v1/entry/WOI:WorkOrderInterface_Create?fields=values(WorkOrder_ID)"
        response = requests.post(url, headers=headers, data=payload)
        response_dict = json.loads(response.text)
 
 
 
 
 
 
        if response.status_code != 201:
         return response.status_code, 'Error while creating work order'
 
        response_dict = json.loads(response.text)
 
        if 'WorkOrder_ID' in response_dict['values']:
            workorder_number = response_dict['values']['WorkOrder_ID']
            return response.status_code, workorder_number
        else:
         return response.status_code, 'WorkOrder_ID not found in response'
 
 
 
def create_ticket(title: str, description: str, uid: str) -> None:
    """ Creates a new work order in BMC """
    print(f"Creating ticket with title: {title}, description: {description}, uid: {uid}")
 
 
    BMC = BMC_API(
        title=title,
        description=description,
        uid=uid,
        cred_fp="C:/Users/uif22535/Nordic-Automation/Back-end/RESTAPI_cred.json"
    )
 
    status_code, workorder = BMC.create_workorder()
    if status_code == 201:
        print(f"Work order created successfully, work order number: {workorder}")
        return status_code, workorder
    else:
        print(f"Error while creating work order, status code: {status_code}")
        return status_code, workorder
 
 
 
 
def determine_intent(text: str) -> str:
    check_ticket_status_pattern = re.compile(r"(?i)(check.*status.*ticket|status|).*WO\d+")
    if check_ticket_status_pattern.search(text):
        print("Check ticket status intent detected.")
        return "checkTicketStatus"
    else:
        print(f"Unknown intent detected for text: {text}")
        return "unknown"
 
 
 
 
def extract_ticket_number(text: str) -> str:
    # Assuming ticket numbers are in the format WO12345
    pattern = r'WO\d+'
    matches = re.findall(pattern, text)
 
    if matches:
        # Return the first ticket number found
        return matches[0]
    else:
        # Return an empty string if no ticket number is found
        return ''
 
 
 
def fetch_ticket_status(ticket_number: str) -> str:
    print("Inside fetch_ticket_status function")
    BMC = BMC_API(cred_fp="dat304-bacheelor-2023/Back-end/RESTAPI_cred.json")
 
    url = f"https://continentalit-restapi.onbmc.com/api/arsys/v1/entry/WOI:WorkOrderInterface?q='Work Order ID'=\"%s\"&fields=values(Status)" % ticket_number
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"AR-JWT {BMC.token}"
    }
    response = requests.get(url, headers=headers)
    response_data = response.json()
    print(f"Response data: {response_data}")
 
    if len(response_data['entries']) > 0:
        status = response_data['entries'][0]['values']['Status']
    else:
        status = "Ticket not found"
 
    return status
 