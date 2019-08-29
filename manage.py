#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
# !pip install bs4
# !pip install python-firebase

import os
import sys
from firebase import firebase # firebase 라이브러리 불러오기


def main():
    url = 'https://trafficjamjam-3e477.firebaseio.com/' #"2항에서 본인이 발급받은 url 입력"
    fbase = firebase.FirebaseApplication(url, None) # 입력한 url로 열

    root_name = 'testData'
    data_key = 'Data2'
    data_dict = {'pear':'yellow', 'pitch':'pink', 'mellon':'green'}
    fbase.put('/' + root_name, data_key, data_dict)

    print(fbase.get('/'+ root_name, None))

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'conf.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
