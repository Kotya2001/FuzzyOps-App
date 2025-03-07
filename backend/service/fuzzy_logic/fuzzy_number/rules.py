
from fuzzyops.fuzzy_logic import BaseRule, FuzzyInference
from fuzzyops.fuzzy_numbers import Domain, FuzzyNumber

def get_fuzzy_inference(data):
	task_type = data["type"]

	if task_type == "mamdani":
		try:
			doms = data["domains"]
			domains = {dom["name"]: Domain(tuple(dom["range"]), name=dom["name"]) for dom in doms}
		except Exception as e:
			return None, "Ошибка, проверьте порядок чисел для создания домена, должно быть: start, end, step"
		
		rules = data["rules"]
		base_rules = []
		for i, rule in enumerate(rules):
			j = i + 1
			params = rule[str(j)]
			ants = params["antecedents"]
			for ant in ants:
				domain_name = ant["domain"]["name"]
				term_name = ant["term"]["name"]
				mf_type = ant["term"]["mfType"]
				p = ant["term"]["params"]
