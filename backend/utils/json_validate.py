from jsonschema import validate, ValidationError

schema_paretto = {
    "type": "object",
    "properties": {
        "domain": {
            "type": "object",
            "properties": {
                "start": {"type": "number"},
                "stop": {"type": "number"},
                "step": {"type": "number"}
            },
            "required": ["start", "stop", "step"]
        },
        "numType": {"type": "string"},
        "data": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "range": {
                            "type": "array",
                            "items": {"type": "number"}
                        },
                        "name": {"type": "string"}
                    },
                    "required": ["range", "name"]
                }
            }
        }
    },
    "required": ["domain", "numType", "data"]
}

schema_fuzzy_sum = {
    "type": "object",
    "properties": {
        "domain": {
            "type": "object",
            "properties": {
                "start": {"type": "number"},
                "stop": {"type": "number"},
                "step": {"type": "number"}
            },
            "required": ["start", "stop", "step"]
        },
        "numType": {"type": "string"},
        "data": {
            "type": "object",
            "properties": {
                "criteria_weights": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "range": {
                                "type": "array",
                                "items": {"type": "number"}
                            },
                            "name": {"type": "string"}
                        },
                        "required": ["range", "name"]
                    }
                },
                "alternatives_scores": {
                    "type": "array",
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "range": {
                                    "type": "array",
                                    "items": {"type": "number"}
                                },
                                "name": {"type": "string"}
                            },
                            "required": ["range", "name"]
                        }
                    }
                }
            },
            "required": ["criteria_weights", "alternatives_scores"]
        }
    },
    "required": ["domain", "numType", "data"]
}

fuzzy_number_create_schema = {
    "type": "object",
    "properties": {
        "data": {
            "type": "array",
            "items": {
                "type": "number"
            }
        },
        "key": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "name": {
            "type": "string"
        },
        "ling": {
            "type": "string"
        },
        "defuzz_type": {
            "type": "string"
        },
        "use_gpu": {
            "type": "boolean"
        },
        "method": {
            "type": "string"
        }
    },
    "required": ["data", "key", "name", "ling", "defuzz_type", "use_gpu", "method"]
}

fuzzy_number_ops_with_number_scheme = {
    "type": "object",
    "properties": {
        "value": {
            "type": "string"
        },
        "file_hash": {
            "type": "string"
        },
        "operation": {
            "type": "string",
            "enum": ["+", "-", "*"]  # Допустимые операции
        },
        "use_gpu": {
            "type": "boolean"
        }
    },
    "required": ["value", "file_hash", "operation", "use_gpu"]  # Обязательные поля
}

fuzzy_number_ops_with_fnum_scheme = {
    "type": "object",
    "properties": {
        "value": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object",
                    "properties": {
                        "data": {
                            "type": "array",
                            "items": {
                                "type": "integer"
                            }
                        },
                        "defuzz_type": {
                            "type": "string"
                        },
                        "use_gpu": {
                            "type": "boolean"
                        },
                        "method": {
                            "type": "string"
                        }
                    },
                    "required": ["data", "defuzz_type", "use_gpu", "method"]
                },
                "key": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": ["data", "key"]
        },
        "file_hash": {
            "type": "string"
        },
        "operation": {
            "type": "string",
            "enum": ["+", "-", "*"]  # Допустимые операции
        }
    },
    "required": ["value", "file_hash", "operation"]
}


fuzzy_graph_create_scheme = {
    "type": "object",
    "properties": {
        "graphSettings": {
            "type": "object",
            "properties": {
                "edgeType": { "type": "string" },
                "edgeNumberType": { "type": "string" },
                "edgeNumberMathType": { "type": "string" },
                "edgeNumberEqType": { "type": "string" }
            },
            "required": ["edgeType", "edgeNumberType", "edgeNumberMathType", "edgeNumberEqType"]
        },
        "graph_data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "start": { "type": "integer" },
                    "end": { "type": "integer" },
                    "values": {
                        "type": "array",
                        "items": { "type": "integer" }
                    }
                },
                "required": ["start", "end", "values"]
            }
        }
    },
    "required": ["graphSettings", "graph_data"]
}

fuzzy_graph_create_api_scheme = {
    "type": "object",
    "properties": {
        "graphSettings": {
            "type": "object",
            "properties": {
                "edgeType": {"enum": ["undirected", "directed"]},
                "edgeNumberMathType": {"enum": ["max", "min", "mean", "sum"]},
                "edgeNumberEqType": {"enum": ["max", "min", "base"]}
            },
            "required": [
                "edgeType",
                "edgeNumberMathType",
                "edgeNumberEqType"
            ]
        },
        "graph_data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "start": {"type": "integer"},
                    "end": {"type": "integer"},
                    "values": {
                        "type": "array",
                        "items": {"type": "number"}
                    }
                },
                "required": [
                    "start",
                    "end",
                    "values"
                ],
                "additionalProperties": False
            }
        }
    },
    "required": [
        "graphSettings",
        "graph_data"
    ],
    "additionalProperties": False
}

fuzzy_graph_create_api_scheme_check = {
    "type": "object",
    "properties": {
        "graphSettings": {
            "type": "object",
            "properties": {
                "edgeType": {"enum": ["undirected", "directed"]},
                "edgeNumberMathType": {"enum": ["max", "min", "mean", "sum"]},
                "edgeNumberEqType": {"enum": ["max", "min", "base"]},
                "edgeNumberType": {"const": "triangle"},
            },
            "required": [
                "edgeType",
                "edgeNumberType",
                "edgeNumberMathType",
                "edgeNumberEqType"
            ]
        },
        "graph_data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "start": {"type": "integer"},
                    "end": {"type": "integer"},
                    "values": {
                        "type": "array",
                        "items": {"type": "number"}
                    }
                },
                "required": [
                    "start",
                    "end",
                    "values"
                ],
                "additionalProperties": False
            }
        }
    },
    "required": [
        "graphSettings",
        "graph_data"
    ],
    "additionalProperties": False
}

shortest_path_scheme = {
    "type": "object",
    "properties": {
        "path": {
            "type": "string",
            "pattern": r"^\d+ \d+$"
        },
        "fileHash": {
            "type": "string",
        }
    },
    "required": ["path", "fileHash"]
}

shortest_path_api_scheme = {
    "type": "object",
    "properties": {
        "path": {
            "type": "string",
            "pattern": r"^\d+ \d+$"
        },
    },
    "required": ["path"]
}

clusters_scheme = {
    "type": "object",
    "properties": {
        "cluster": {
            "type": "string",
            "pattern": r"^\d+$"
        },
        "fileHash": {
            "type": "string",
        }
    },
    "required": ["cluster", "fileHash"]
}

clusters_scheme_api = {
    "type": "object",
    "properties": {
        "cluster": {
            "type": "number",
        },
    },
    "required": ["cluster"]
}

is_dominationg_api_scheme = {
    "type": "object",
    "properties": {
        "dominating": {
            "type": "array",
            "items": {"type": "number"}
        }
    },
     "required": ["dominating"]

}

dominating_api_scheme = {
    "type": "object",
    "properties": {
        "values": {
            "type": "array",
            "items": {"type": "number"},
            "minItems": 3,
            "maxItems": 3

        }
    },
    "required": ["values"]
}



params_schema = {
    "type": "object",
    "properties": {
        "nClusters": {
            "type": "integer",
            "minimum": 1  # Минимальное значение для nClusters
        },
        "m": {
            "type": "integer",
            "minimum": 1  # Минимальное значение для m
        },
        "error": {
            "type": "number",
            "minimum": 0  # Минимальное значение для error
        },
        "maxiter": {
            "type": "integer",
            "minimum": 1  # Минимальное значение для maxiter
        }
    },
    "required": ["nClusters", "m", "error", "maxiter"],
    "additionalProperties": False  # Запретить любые дополнительные свойства
}

assignment_scheme = schema = {
    "type": "object",
    "properties": {
        "fileHash": {"type": "string"},
        "tasks": {
            "type": "array",
            "items": {"type": "string"}
        },
        "workers": {
            "type": "array",
            "items": {"type": "string"}
        },
        "fuzzyCosts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "task": {"type": "string"},
                    "worker": {"type": "string"},
                    "fuzzyCost": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "minItems": 3,
                        "maxItems": 3
                    }
                },
                "required": ["task", "worker", "fuzzyCost"]
            }
        }
    },
    "required": ["fileHash", "tasks", "workers", "fuzzyCosts"]
}

assignment_api_scheme = schema = {
    "type": "object",
    "properties": {
        "tasks": {
            "type": "array",
            "items": {"type": "string"}
        },
        "workers": {
            "type": "array",
            "items": {"type": "string"}
        },
        "fuzzyCosts": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "task": {"type": "string"},
                    "worker": {"type": "string"},
                    "fuzzyCost": {
                        "type": "array",
                        "items": {"type": "integer"},
                        "minItems": 3,
                        "maxItems": 3
                    }
                },
                "required": ["task", "worker", "fuzzyCost"]
            }
        }
    },
    "required": ["tasks", "workers", "fuzzyCosts"]
}



def validate_data(data: dict, task_type: str) -> tuple[bool, str]:
    try:
        if task_type == "Граница Паретто":
            schema = schema_paretto
        elif task_type == "Взвешенная сумма":
            schema = schema_fuzzy_sum
        elif task_type == "Создание нечеткого числа":
            schema = fuzzy_number_create_schema
        elif task_type == "Операции Нечеткое Четкое":
            schema = fuzzy_number_ops_with_number_scheme
        elif task_type == "Операции Нечеткое Нечеткое":
            schema = fuzzy_number_ops_with_fnum_scheme
        elif task_type == "Создание нечеткого графа":
            schema = fuzzy_graph_create_scheme
        elif task_type == "shortest_path":
            schema = shortest_path_scheme
        elif task_type == "create_graph_api":
            schema = fuzzy_graph_create_api_scheme
        elif task_type == "shortest_path_api":
            schema = shortest_path_api_scheme
        elif task_type == "check_graph":
            schema = fuzzy_graph_create_api_scheme_check
        elif task_type == "clusters":
            schema = clusters_scheme
        elif task_type == "clusters_api":
            schema = clusters_scheme_api
        elif task_type == "is_dominating":
            schema = is_dominationg_api_scheme
        elif task_type == "dominating":
            schema = dominating_api_scheme
        elif task_type == "assignment":
            schema = assignment_scheme
        elif task_type == "assignment_api":
            schema = assignment_api_scheme
        else:
            schema = params_schema
        validate(instance=data, schema=schema)
        return None, ""
    except ValidationError as e:
        return True, e.message
