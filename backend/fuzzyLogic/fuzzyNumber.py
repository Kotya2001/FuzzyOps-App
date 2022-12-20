"""
Класс для работы с нечеткими числами
"""

import numpy as np

# выбор методы дефаззификации по умолчанию
DEFAULT_DEFUZZ = 'cgrav'  # cmax - center of maximums, lmax, rmax, cgrav - center of gravity


class FuzzyNumber:
    def __init__(self, x, values, method='minimax'):
        assert method == 'minimax' or method == 'prob', "Unknown method. Known methods are 'minimax' and 'prob'"
        self._x = x
        self._values = values
        self._method = method

    @property
    def very(self):
        return FuzzyNumber(self._x, np.power(self._values, 2))

    @property
    def negation(self):
        return FuzzyNumber(self._x, 1. - self._values)

    @property
    def maybe(self):
        return FuzzyNumber(self._x, np.power(self._values, 0.5))

    def get_x(self):
        return self._x

    def get_values(self):
        return self._values

    def extend_values(self, fset: np.array, inplace=False):
        #  return new fnum shaped to fit given range
        assert fset[0] <= self._x[0] and fset[-1] >= self._x[-1], "New set must include previous range"

        if not inplace:
            clone = FuzzyNumber(self._x, self._values, self._method)
            clone._values = np.interp(fset, self._x, self._values)
            clone._x = fset
            return clone
        else:
            self._values = np.interp(fset, self._x, self._values)
            self._x = fset

    def alpha_cut(self, alpha):
        return self._x[self._values >= alpha]

    def entropy(self, norm=True):
        e = -np.sum(self._values * np.log2(self._values, out=np.zeros_like(self._values), where=(self._values != 0)))
        if norm:
            return 2. / len(self._values) * e
        else:
            return e

    def center_of_grav(self):
        return np.sum(self._x * self._values) / np.sum(self._values)

    def left_max(self):
        h = np.max(self._values)
        return self._x[self._values == h][0]

    def right_max(self):
        h = np.max(self._values)
        return self._x[self._values == h][1]

    def center_of_max(self, verbose=False):
        h = np.max(self._values)
        maxs = self._x[self._values == h]
        if verbose:
            print('h:', h, 'maximums are:', maxs)
        return np.mean(maxs)

    def moment_of_inertia(self, center=None):
        if not center:
            center = self.center_of_grav()
        return np.sum(self._values * np.square(self._x - center))

    def defuzz(self, by=DEFAULT_DEFUZZ):
        if by == 'default':
            by = DEFAULT_DEFUZZ
        if by == 'lmax':
            return self.left_max()
        elif by == 'rmax':
            return self.right_max()
        elif by == 'cmax':
            return self.center_of_max()
        elif by == 'cgrav':
            return self.center_of_grav()
        else:
            raise ValueError('Дефаззификация может быть выполнена методами lmax, rmax, cmax, cgrav of default')

    # magic
    def __str__(self):
        return str(self.defuzz())

    def __repr__(self):
        return str(self.defuzz())

    def __add__(self, other):
        t_o = type(other)
        if t_o == FuzzyNumber:
            return fuzzy_unite(self, other)
        elif t_o == int or t_o == float:
            return FuzzyNumber(self._x + other, self._values, self._method)
        else:
            raise TypeError('can only add a number (Fuzzynumber, int or float)')

    def __iadd__(self, other):
        self = self + other

    def __sub__(self, other):
        t_o = type(other)
        if t_o == FuzzyNumber:
            return fuzzy_difference(self, other)
        elif t_o == int or t_o == float:
            return FuzzyNumber(self._x - other, self._values, self._method)
        else:
            raise TypeError('can only substract a number (Fuzzynumber, int or float)')

    def __isub__(self, other):
        self = self - other

    def __mul__(self, other):
        t_o = type(other)
        if t_o == FuzzyNumber:
            return fuzzy_intersect(self, other)
        elif t_o == int or t_o == float:
            return FuzzyNumber(self._x * other, self._values, self._method)
        else:
            raise TypeError('can only multiply by a number (Fuzzynumber, int or float)')

    def __imul__(self, other):
        self = self * other

    def __div__(self, other):
        t_o = type(other)
        if t_o == int or t_o == float:
            return FuzzyNumber(self._x / other, self._values, self._method)
        else:
            raise TypeError('can only divide by a number (int or float)')

    def __floordiv__(self, other):
        pass

    def __idiv__(self, other):
        self = self / other

    def __ifloordiv__(self, other):
        pass

    def __int__(self, other):
        return int(self.defuzz())

    def __float__(self, other):
        return self.defuzz()


# memberships
def trianglemf(x, a, b, c):
    assert a <= b <= c, "a <= b <= c"
    y = np.zeros(len(x))
    if a != b:
        idx = np.argwhere((a < x) & (x < b))
        y[idx] = (x[idx] - a) / float(b - a)
    if b != c:
        idx = np.argwhere((b < x) & (x < c))
        y[idx] = (c - x[idx]) / float(c - b)
    idx = np.nonzero(x == b)
    y[idx] = 1
    return y


def trapezoidalmf(x, a, b, c, d):
    assert a <= b <= c, "a <= b <= c <= d"
    y = np.zeros(len(x))
    if a != b:
        idx = np.argwhere((a < x) & (x < b))
        y[idx] = (x[idx] - a) / float(b - a)
    idx = np.nonzero(np.logical_and(b < x, x < c))[0]
    y[idx] = 1
    if c != d:
        idx = np.argwhere((c < x) & (x < d))
        y[idx] = (d - x[idx]) / float(d - c)
    return y


# ops
def fuzzy_unite(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if fnum1._method == 'prob':
        return fuzzy_or_prob(fnum1, fnum2)
    elif fnum1._method == 'minimax':
        return fuzzy_or_mm(fnum1, fnum2)
    else:
        raise ValueError('Only minimax and prob methods are supported')


def fuzzy_intersect(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if fnum1._method == 'prob':
        return fuzzy_and_prob(fnum1, fnum2)
    elif fnum1._method == 'minimax':
        return fuzzy_and_mm(fnum1, fnum2)
    else:
        raise ValueError('Only minimax and prob methods are supported')


def fuzzy_difference(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if np.array_equal(fnum1._x, fnum2._x):
        xs = fnum1._x
    else:
        xs = unite_fsets(fnum1, fnum2)
        fnum1 = fnum1.extend_values(xs)
        fnum2 = fnum2.extend_values(xs)
    values = np.clip(fnum1._values - fnum2._values, 0, 1)

    return FuzzyNumber(xs, values, method=fnum1._method)


# logical
def unite_fsets(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    # make universal range
    mins = (fnum1._x[0], fnum2._x[0])
    steps = (fnum1._x[1] - fnum1._x[0], fnum2._x[1] - fnum2._x[0])
    maxs = (fnum1._x[-1], fnum2._x[-1])
    mi = np.min(mins)
    ma = np.max(maxs)
    step = np.min(steps)
    X = np.arange(mi, ma + step, step)

    return X


def fuzzy_and_mm(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if np.array_equal(fnum1._x, fnum2._x):
        xs = fnum1._x
    else:
        xs = unite_fsets(fnum1, fnum2)
        fnum1 = fnum1.extend_values(xs)
        fnum2 = fnum2.extend_values(xs)
    values = np.minimum(fnum1._values, fnum2._values)

    return FuzzyNumber(xs, values, method=fnum1._method)


def fuzzy_or_mm(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if np.array_equal(fnum1._x, fnum2._x):
        xs = fnum1._x
    else:
        xs = unite_fsets(fnum1, fnum2)
        fnum1 = fnum1.extend_values(xs)
        fnum2 = fnum2.extend_values(xs)
    values = np.maximum(fnum1._values, fnum2._values)

    return FuzzyNumber(xs, values, method=fnum1._method)


def fuzzy_and_prob(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if np.array_equal(fnum1._x, fnum2._x):
        xs = fnum1._x
    else:
        xs = unite_fsets(fnum1, fnum2)
        fnum1 = fnum1.extend_values(xs)
        fnum2 = fnum2.extend_values(xs)
    values = fnum1._values * fnum2._values

    return FuzzyNumber(xs, values, method=fnum1._method)


def fuzzy_or_prob(fnum1: FuzzyNumber, fnum2: FuzzyNumber):
    if np.array_equal(fnum1._x, fnum2._x):
        xs = fnum1._x
    else:
        xs = unite_fsets(fnum1, fnum2)
        fnum1 = fnum1.extend_values(xs)
        fnum2 = fnum2.extend_values(xs)
    values = fnum1._values + fnum2._values - fnum1._values * fnum2._values

    return FuzzyNumber(xs, values, method=fnum1._method)


# fuzz-defuzz
def fuzzify(*x, mf=trianglemf, method='minimax'):
    assert method == 'minimax' or method == 'prob', "Unknown method. Known methods are 'minimax' and 'prob'"
    y = mf(x)

    return FuzzyNumber(x, y, method)


def defuzzify(f_num: FuzzyNumber, by='max'):
    pass

