from fuzzyops.fuzzy_clustering import fcm, fcm_predict
import numpy as np
import pandas as pd
import io


def _create_matrix(data: list[str]):
    return np.array([list(map(float, row.split(',')))[1:] for row in data])


def clusters(params: dict, train_data: str, test_data: str):
    n_clusters = params["nClusters"]
    m = params["m"]
    error = params["error"]
    maxiter = params["maxiter"]

    train_data, test_data = train_data.split("\n")[1:-1], test_data.split("\n")[1:-1]
    train_data, test_data = _create_matrix(train_data), _create_matrix(test_data)

    cntr, _, _, _, _, _, _ = fcm(
        train_data, n_clusters, float(m), error=error, maxiter=maxiter, init=None)
    U, _, _, _, _, fpc = fcm_predict(
        test_data, cntr, float(m), error=error, maxiter=maxiter, seed=1234)
    U = U.argmax(axis=0)

    df = pd.DataFrame(U)
    csv_io = io.BytesIO()
    df.to_csv(csv_io, index=False)

    # Возвращаем CSV файл
    csv_io.seek(0)
    return csv_io, ""


