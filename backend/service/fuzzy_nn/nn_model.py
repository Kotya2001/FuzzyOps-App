from database import set_cache, get_cache
from app import logger
import pickle
from fuzzyops.fuzzy_nn import Model
from fuzzyops.fuzzy_neural_net import FuzzyNNetwork
from fuzzyops.fuzzy_numbers import Domain
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
import torch
import json


def inference_model(data):
	file_hash, input_data = data["file_hash"], data["input"]


	try:
		f = get_cache(file_hash)
	except Exception as e:
		logger.error(f'Error while getting cache in Redis: {e}')
		return "Ошибка подключения к базе Redis"
	
	if not f:
		return {}, "Модель не обучена или данный ключ отсутствует"
	else:
		data = json.loads(f)
		serialized_model, labels, device, task_type = bytes.fromhex(data["model"]), data["labels"], data["device"], data["task_type"]
		model = pickle.loads(serialized_model)
		
		x = torch.Tensor(input_data, device=device)
		res = model(x)
		if task_type == "classification":
			ind = torch.argmax(res, dim=1).cpu()
			if len(list(labels.keys())):
				ans = {"class": labels[str(ind.item())]}
			else:
				ans = {"class": str(ind.item())}

			return ans, ""
		else:
			r = res.item()
			ans = {"result": r}
			return ans, ""





def train_model(df, params, file_hash):
	try:
		f = get_cache(file_hash)
	except Exception as e:
		logger.error(f'Error while getting cache in Redis: {e}')
		return "Ошибка подключения к базе Redis"
	
	if not f:
		labels = {}
		task_type = params["task_type"]
		features = params["features"]
		target = params["target"]
		n_terms = params["n_terms"]
		use_gpu = params["use_gpu"]

		device = 'cpu' if not use_gpu else 'cuda'

		try:
			assert len(n_terms) == len(features)
		except Exception as e:
			return "Ошибка, длина ключа feautures должна совпадать с длиной ключа n_terms"
		
		lr = params["lr"]
		batch_size = params["batch_size"]
		member_func_type = params["member_func_type"]
		epochs = params["epochs"]

		try:
			X = df.loc[:, features].values
		except Exception as e:
			return "Ошибка, возможно неверно указаны именования ключей в признаках"

		if task_type == "classification":
			n_out_vars = len(np.unique(df[target].values))


			if df[target].values.dtype == 'object':
				label_encoder = LabelEncoder()
				df['target_encoded'] = label_encoder.fit_transform(df[target])
				label_mapping = {index: label for index, label in enumerate(label_encoder.classes_)}
				labels = label_mapping
				Y = df['target_encoded'].values
			else:
				Y = df[target].values
		
		else:
			n_out_vars = 1
			Y = df[target].values
		
		model = Model(X, Y, n_terms, n_out_vars,
				 lr, task_type, batch_size, member_func_type, epochs, verbose=False, device=device)
		m = model.train()
		serialized_model = pickle.dumps(m)
		redis_data = {"model": serialized_model.hex(), "labels": labels, "device": device, "task_type": task_type}

		try:
			set_cache(file_hash, json.dumps(redis_data))
		except Exception as e:
			logger.error(f'Error while setting cache in Redis: {e}')
			return "Ошибка подключения к базе Redis"
		return ""
	return ""


def fuzzy_nn2_inference(data):
	# try:

		cfg = data["config"]
		l_size = cfg["layerSize"]
		domain_vals = tuple(cfg["domainValues"])
		method = cfg["method"]
		fuzzyType = cfg["fuzzyType"]
		activationType = cfg["actiovationType"]
		epochs = cfg["epochs"]

		nn = FuzzyNNetwork(
		l_size,
		domain_vals,
		method,
		fuzzyType,
		activationType
	)
		test_domain = Domain(domain_vals, name='test_domain', method=method)
		X = []
		X_train = data["X_Train"]
		for x in X_train:
			inner_x = []
			for params in x:
				name = params["name"]
				test_domain.create_number(fuzzyType, *params["params"], name=name)
				f_n = test_domain.get(name)
				inner_x.append(f_n)
			X.append(inner_x)
		Y = []
		y_train = data["y_train"]
		for y in y_train:
			inner_y = []
			for parms in y:
				name = params["name"]
				test_domain.create_number(fuzzyType, *params["params"], name=name)
				f_n = test_domain.get(name)
				inner_y.append(f_n)
			Y.append(inner_y)
		input_data = []
		X_test = data["input_data"]
		for x_test in X_test:
			name = x_test["name"]
			test_domain.create_number(fuzzyType, *x_test["params"], name=name)
			input_data.append(test_domain.get(name))
	
		
		nn.fit(X, Y, epochs)
		result = nn.predict(input_data)
		return {"res": result}, ""
	# except Exception as e:
	# 	return {}, "Произошла ошибка, проверьте данные"














		
