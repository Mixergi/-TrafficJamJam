def calculate_distance(position1, position2, format = 'degree'):
    '''
    Get Distance Between Two Position
    '''

    position1_degree = [convert_to_degree(position1[0]), convert_to_degree(position1[1])]
    position2_degree = [convert_to_degree(position2[0]), convert_to_degree(position2[1])]

    latitude, longitude = set_figure(format)

    return (((position1_degree[0] - position2_degree[0]) * latitude) + ((position1_degree[1] - position2_degree[1]) * longitude)) ** 0.5



def calculate_speed(position1, position2, format = 'degree', second = 1):

    return calculate_distance(position1, position2, format=format) * 3600 / second


def calculate_vector(position, positon2, format = 'degree'):

    position1_degree = [convert_to_degree(position1[0]), convert_to_degree(position1[1])]
    position2_degree = [convert_to_degree(position2[0]), convert_to_degree(position2[1])]

    latitude, longitude = set_figure(format)

    vector = (position1_degree[1] - position2_degree[1]) / (position1_degree[0] - (position2_degree[0]))

    return vector


def set_figure(format):

    latitude, longitude = 0, 0

    if format == 'degree':
        latitude = 110000
        longitude =  90000
    elif format == 'minuate':
        latitude = 108000   
        longitude = 90000
    elif format == 'second':
        latitude = 126000   
        longitude = 90000
    else:
        raise ValueError

    return latitude, longitude

def convert_to_degree(position):
    if type(position) != str:
        raise ValueError

    degree = position.find('°')

    minuate = position.find('′')

    second = position.find('′′')

    if minuate == -1:
        return float(position[0:degree])

    if second == -1:
        return float(position[0:degree]) + float(position[degree + 1 : minuate]) / 60

    return float(position[0:degree]) + float(position[degree + 1 : minuate]) / 60 + float(position[minuate + 1 : second]) / 3600
