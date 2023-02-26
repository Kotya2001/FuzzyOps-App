const crateFileConst = [
	{
		"_id": {
			"secondCategory": "Для нечеткой логики"
		},
		"pages": [
			{
				"alias": "ForFuzzyLogic",
				"title": "Для нечеткого числа",
				"_id": "0",
				"category": "Для нечеткого числа"
			},

			{
				"alias": "ForDefuzz",
				"title": "Для дефаззификации",
				"_id": "1",
				"category": "Для дефаззификации"
			},

			{
				"alias": "ForFuzzyOps",
				"title": "Для нечетких операций",
				"_id": "2",
				"category": "Для нечетких операций"
			}
		]
	}
];

const fuzzyLogicConst = [
	{
		"_id": {
			"secondCategory": "Нечеткие числа"
		},
		"pages": [
			{
				"alias": "FuzzyNumber",
				"title": "Нечеткое число",
				"_id": "3",
				"category": "Нечеткое число"
			},

			{
				"alias": "DefuzzNumber",
				"title": "Дефаззификация",
				"_id": "4",
				"category": "Дефаззификация"
			},
			
		]
	},

	{
		"_id": {
			"secondCategory": "Нечеткая арифметика"
		},
		"pages": [{
			"alias": "FuzzyOps",
			"title": "Нечеткая арифметика",
			"_id": "5",
			"category": "Нечеткая арифметика"
		}]
	}
];

export const allMenus = [crateFileConst, fuzzyLogicConst];