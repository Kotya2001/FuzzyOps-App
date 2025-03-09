from database import set_cache, get_cache
from app import logger
import pickle
from fuzzyops.fuzzy_nn import Model
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
		









		
