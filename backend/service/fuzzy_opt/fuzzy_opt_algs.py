from database import set_cache, get_cache
from app import logger
from fuzzyops.fuzzy_optimization import AntOptimization, FuzzyBounds
import pandas as pd
import numpy as np



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
		
	
		


	

	