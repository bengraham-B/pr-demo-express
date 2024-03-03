import api_class
import json

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhbXQiLCJwYXNzd29yZCI6IiRHb29zZTAxIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwNDY5NzI2MiwiZXhwIjoxNzA0OTU2NDYyfQ.E1YNj3tS04lU1YOnTx5BF37MT6SK673zxLOcimy-SEw", 

def gen_pr_Func(token_param):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNhbXQiLCJwYXNzd29yZCI6IiRHb29zZTAxIiwiYWRtaW4iOnRydWUsImlhdCI6MTcwNDY5NzI2MiwiZXhwIjoxNzA0OTU2NDYyfQ.E1YNj3tS04lU1YOnTx5BF37MT6SK673zxLOcimy-SEw", 

    url = "http://localhost:8001/api/pr/generate-pr-number/"

    data ={
        'userName': 'joshe',
        'supplier': "API_SUPPLIER",
        'projectCode': 'APISTG',
        'note': 'This is an api test'
    }

    api = api_class.API(url=url, token=token_param, data=data)
    api.generate_pr_number()

def get_user_pr_func(token_param):
    get_user_pr = "http://localhost:8001/api/pr/"

    get_user_pr_data ={
        'userName': 'samt'
        
    }

    get_user_pr_obj = api_class.API(url=get_user_pr, token=token_param, data=get_user_pr_data)
    user_pr = get_user_pr_obj.get_user_pr()


    JSON = json.loads(user_pr.text)
    for pr in JSON["prs"]:
        print(pr)
      







print(gen_pr_Func(token_param=token))
# print(get_user_pr_func(token_param=token))