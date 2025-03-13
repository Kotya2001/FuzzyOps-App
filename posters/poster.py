import requests

addr = 'http://localhost:5000'

routes = ["/api/fnum/create", "/api/fnum/get", "/api/fnum/ops"]

# Входные данные для создания нечеткого числа
create_fnum = {"data":[1,2,3,4,5,6,7,8,9],"key":["1 3 4","triangular"],
			   "name":"p","ling":"m","defuzz_type":"cgrav",
			   "use_gpu":False,"method":"minimax"}



def get_fnum(resp: dict):
	key = resp["data"]["file_hash"]
	response = requests.get(f"{addr}{routes[1]}/{key}")
	print("GET запрос на получение")
	print(response.json())
	print(key)
	return key


create_fnum_response = requests.post(f"{addr}{routes[0]}", json=create_fnum)
print("Создание нечтекого числа")
print(create_fnum_response.json())

key = get_fnum(create_fnum_response.json())

# Входные данные операции между четким и нечетким числами
fnum_ops_num = {'value': '2', 
				'file_hash': key, 
				'operation': '+',
				'use_gpu': False}

ops_fnum_with_num_response = requests.post(f"{addr}{routes[2]}", json=fnum_ops_num)
print("Прибавление к нечеткому числу значения 2")

# Входные данные операции между нечеткими числами
fnum_ops_fnum = {'value': 
				 {'data': 
	  {'data': [1, 2, 3, 4, 5, 6, 7, 8, 9],
	 'defuzz_type': 'cgrav', 
	 'use_gpu': False, 
	 'method': 'minimax'}, 
	 'key': ['1 2 3', 'triangular']}, 
	 'file_hash': get_fnum(ops_fnum_with_num_response.json()), 
	 'operation': '+'}


ops_fnum_with_fnum_response = requests.post(f"{addr}{routes[2]}", json=fnum_ops_fnum)
print("Прибавление к нечеткому число нечеткого числа")
print(ops_fnum_with_fnum_response.json())
