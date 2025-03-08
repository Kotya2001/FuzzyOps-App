
from fuzzyops.fuzzy_logic import BaseRule, FuzzyInference, SingletonInference
from fuzzyops.fuzzy_numbers import Domain

def get_fuzzy_inference(data):
	task_type = data["type"]

	if task_type == "mamdani":
		try:
			doms = data["domains"]
			domains = {dom["name"]: Domain(tuple(dom["range"]), name=dom["name"]) for dom in doms}
		except Exception as e:
			return None, f"Ошибка, проверьте порядок чисел для создания домена, должно быть: start, end, step"
		
		rules = data["rules"]
		base_rules = []
		for rule in rules:
			ants = rule["antecedents"]
			antecedents = []
			
			for ant in ants:
				domain_name = ant["domain"]["name"]
				term_name = ant["term"]["name"]
				mf_type = ant["term"]["mfType"]
				p = ant["term"]["params"]

				try:
					domains[domain_name].create_number(mf_type, *p, name=term_name)
				except Exception as e:
					return None, f"Ошибка при создании нечеткого числа антеценлента {term_name} домена {domain_name}, проверьте корректность параметров функции принадлежности"
				
				antecedents.append((domain_name, term_name))
			
			cons = rule["consequent"]
			dom_cons_name = cons["domain"]["name"]
			term_cons_name = cons["term"]["name"]
			cons_mf_type = cons["term"]["mfType"]
			cons_p = cons["term"]["params"]
			
			try:
				domains[dom_cons_name].create_number(cons_mf_type, *cons_p, name=term_cons_name)
			except Exception as e:
				return None, f"Ошибка при создании нечеткого числа консеквента {term_cons_name} домена {dom_cons_name}, проверьте корректность параметров функции принадлежности"
			
			base_rules.append(
				BaseRule(antecedents=antecedents, consequent=(dom_cons_name, term_cons_name))
			)
		inference_system = FuzzyInference(domains=domains, rules=base_rules)
		input_data = data["inputData"]
		inp = {elem["name"]: elem["value"] for elem in input_data}
		try:
			result = inference_system.compute(inp)
		except Exception as e:
			return None, "Ошибка нечеткого логического вывода, проверьте корректность названий переменных во входных данных"
		
		return {k: float(v) for k, v in result.items()}, ""
	else:
		try:
			doms = data["domains"]
			domains = {dom["name"]: Domain(tuple(dom["range"]), name=dom["name"]) for dom in doms}
		except Exception as e:
			return None, f"Ошибка, проверьте порядок чисел для создания домена, должно быть: start, end, step"
		
		rules = data["rules"]
		base_rules = []
		for rule in rules:
			ants = rule["antecedents"]
			antecedents = []
			
			for ant in ants:
				domain_name = ant["domain"]["name"]
				term_name = ant["term"]["name"]
				mf_type = ant["term"]["mfType"]
				p = ant["term"]["params"]

				try:
					domains[domain_name].create_number(mf_type, *p, name=term_name)
				except Exception as e:
					return None, f"Ошибка при создании нечеткого числа антеценлента {term_name} домена {domain_name}, проверьте корректность параметров функции принадлежности"
				
				antecedents.append((domain_name, term_name))
			cons = rule["consequent"]
			value = cons["value"]
			base_rules.append(
				BaseRule(antecedents=antecedents, consequent=value)
			)
		inference_system = SingletonInference(domains=domains, rules=base_rules)
		input_data = data["inputData"]

		inp = {elem["name"]: elem["value"] for elem in input_data}

		try:
			result = inference_system.compute(inp)
		except Exception as e:
			return None, "Ошибка нечеткого логического вывода, проверьте корректность названий переменных во входных данных или число переменных не совпадает во всех правилах"
		
		return {"result": float(result)}, ""
		




