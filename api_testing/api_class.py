import requests

class API:
    def __init__(self, url, token, data):
        self.url = url
        self.token = token
        self.data = data

    def auth(self):
        bear_token = "Bearer " + " ".join(str(element) for element in self.token)
        headers= {
            'Authorization': bear_token
        }

        return headers

    def generate_pr_number(self):
        response = requests.post(
            url=self.url,
            json=self.data,
            headers=self.auth(),
            timeout=30
        )


        return print(response.json())

    def get_user_pr(self):

        response = requests.post(
            url=self.url,
            data=self.data,
            headers=self.auth()
        )

        return response




