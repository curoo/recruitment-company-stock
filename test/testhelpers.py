import socket


def port_open(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        s.connect(("localhost", port))
        s.close()
        return True
    except socket.error:
        return False


db_not_available = not port_open(5432)
