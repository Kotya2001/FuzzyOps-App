from database import set_cache, get_cache
from app import logger
from fuzzyops.fuzzy_optimization import AntOptimization, FuzzyBounds, LinearOptimization, calc_total_functions,\
    get_interaction_matrix, check_LR_type, calc_total_functions
from fuzzyops.fuzzy_numbers import Domain
import pandas as pd
import numpy as np


def get_linear_opt_res(data):
	task_type = data["task_type"]

	use_gpu = data["use_gpu"]
	if data["optimization_type"] == "max":
		optimization_type = "max"
	elif data["optimization_type"] == "min":
		optimization_type = "min"
	else:
		return None, "Неверный тип задачи оптимизации, доступны 'min', 'max'"

	if task_type == "fuzzy":
		coefs_dom = Domain((data["domain"]["start"], data["domain"]["end"], data["domain"]["step"]), name="coefs")
		f_num_params = np.array(data["data"]["C"])
		C = f_num_params[:, :, 0]
		n = C.shape[0]
		m = C.shape[1]
		C_f = []

		print(f_num_params)

		try:
			for i in range(len(f_num_params)):
				lst = []
				for j in range(len(f_num_params[i])):
					coefs = [f_num_params[i][j].tolist()[1], f_num_params[i][j].tolist()[0], f_num_params[i][j].tolist()[2]]
					lst.append(coefs_dom.create_number('triangular', *coefs, name=f"c{i}{j}"))
				C_f.append(np.array(lst))
			C_f = np.array(C_f)
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у нечетких коэффициентов критериев"
		
		print(C_f)
		assert check_LR_type(C_f)

		# try:
		# 	assert check_LR_type(C_f)
		# except Exception as e:
		# 	return None, "Ошибка, нечеткие коэффициенты критериев не соответствуют LR-типу"
		
		try:
			A = np.array(data["data"]["A"])
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у матрицы коэффициентов ограничений"
		
		try:
			b = np.array(data["data"]["B"])
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у вектора ограничений ограничений"
		
		alphas, interactions_list = get_interaction_matrix(f_num_params)
		final_coefs = calc_total_functions(alphas, C, interactions_list, n)
		C_new = np.array([[final_coefs[i] for i in range(m)]])

		# Рещаем задачу оптмизации
		opt = LinearOptimization(A, b, C_new, optimization_type)
		if use_gpu:
			result, v = opt.solve_gpu()
		else:
			result, v = opt.solve_cpu()
		ans = {"value": result, "vars": v.tolist()}
		return ans, ""
	else:
		try:
			C = np.array(data["data"]["C"])
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у матрицы коэффициентов"
		try:
			A = np.array(data["data"]["A"])
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у матрицы коэффициентов ограничений"
		
		try:
			b = np.array(data["data"]["B"])
		except Exception as e:
			return None, "Ошибка, проверьте полноту данных у вектора ограничений ограничений"
		# Рещаем задачу оптмизации
		opt = LinearOptimization(A, b, C, optimization_type)
		if use_gpu:
			result, v = opt.solve_gpu()
		else:
			result, v = opt.solve_cpu()
		ans = {"value": result, "vars": v.tolist()}
		return ans, ""
		




def get_metaev_result(df: pd.DataFrame, params: dict, file_hash: str):

	try:
		f = get_cache(file_hash)
	except Exception as e:
		logger.error(f'Error while getting cache in Redis: {e}')
		return {}, "Ошибка подключения к базе Redis"
	
	if not f:
		target = params["target"]
		cols = [elem["name"] for elem in params["ranges"]]

		all_cols = cols + [target]

		try:
			data = df.loc[:, all_cols].values
			array = np.arange(df.shape[0])
			rules = array.reshape(df.shape[0], 1)
		except Exception as e:
			return {}, "Ошибка получения колонок, возможно в json файле неверно указаны наименования колонок"

		ranges = []
		rngs = params["ranges"]
		for i, elem in enumerate(rngs):
			start, step, end = elem["start"], elem["step"], elem["end"]

			rng = FuzzyBounds(start=start, step=step, end=end, x=f"x_{i + 1}")
			ranges.append(rng)
		
		opt = AntOptimization(
				data=data,
				k=params["k"],
				q=params["q"],
				epsilon=params["epsilon"],
				n_iter=params["n_iter"],
				ranges=ranges,
				r=data[:, -1],
				n_terms=data.shape[0],
				n_ant=params["n_ant"],
				mf_type="triangular",
				base_rules_ind=rules
		)
		try:
			_ = opt.continuous_ant_algorithm()
		except Exception as e:
			return {}, f"Ошибка алгоритма {str(e)}"
		
		result = opt.best_result.params
		ans = {}

		terms_cnt = result.shape[1]
		for i, elem in enumerate(rngs):
			name = elem["name"]
			ans[name] = {}
			for j in range(terms_cnt):
				ans[name][str(j + 1)] = np.round(result[i][j].tolist(), 4).tolist()
		try:
			set_cache(file_hash, ans)
		except Exception as e:
			logger.error(f'Error while setting cache in Redis: {e}')
			return {}, "Ошибка подключения к базе Redis"
		return ans, ""
	return f, ""
		
	
		


	

	