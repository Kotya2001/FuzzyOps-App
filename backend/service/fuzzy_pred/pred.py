
from fuzzyops.fuzzy_numbers import Domain
from fuzzyops.prediction import fit_fuzzy_linear_regression, convert_fuzzy_number_for_lreg
import numpy as np


def get_prediction(data):
	X = data["X"]
	Y = data["Y"]
	input_data = data.get("input")

	x_domain = X["domain"]
	x_data = X["data"]

	y_domain = Y["domain"]
	y_data = Y["data"]

	try:
		assert len(x_data) == len(y_data)
	except Exception as e:
		return {}, "Ошибка, количестов наблюдений в X и Y должно совпадать"
	
	x = Domain((x_domain["start"], x_domain["end"], x_domain["step"]), name=x_domain["name"])
	y = Domain((y_domain["start"], y_domain["end"], y_domain["step"]), name=y_domain["name"])

	x_values = [x.create_number('triangular',  elem["a"], elem["b"], elem["c"]) for elem in x_data]
	y_values = [y.create_number('triangular',  elem["a"], elem["b"], elem["c"]) for elem in y_data]

	a, b, error = fit_fuzzy_linear_regression(x_values, y_values)

	if input_data:
		x_test = convert_fuzzy_number_for_lreg(x.create_number('triangular',
														  input_data["a"], 
														  input_data["b"],
														  input_data["c"]))
		Y_pred = (x_test * a) + b
		res = float(Y_pred.to_fuzzy_number())
		return {"a": a, "b": b, "err": error, "prediction": res}, ""
	return {"a": a, "b": b, "err": error}, ""

