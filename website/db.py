import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from website.models import Company

engine = create_engine(
    "postgresql+psycopg2://{user}:{password}@{hostname}/{database_name}".format(
        user=os.environ.get("POSTGRES_USER"),
        password=os.environ.get("POSTGRES_PASSWORD"),
        hostname=os.environ.get("POSTGRES_HOSTNAME"),
        database_name=os.environ.get("POSTGRES_DB"),
    )
)


Session = sessionmaker(bind=engine)


def get_session():
    return Session()


def get_company_list(session):
    companies = session.query(Company).all()
    return companies
