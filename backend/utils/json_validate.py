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
        else:
            schema = params_schema
        validate(instance=data, schema=schema)
        return None, ""
    except ValidationError as e:
        return True, e.message
