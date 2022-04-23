import pytest

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from website.models import Base, Company
from website.db import get_company_list


def test_get_company_list(db_session):
    company = Company(name="Google", ticker_code="GOOG")
    db_session.add(company)
    db_session.commit()

    companies = get_company_list(db_session)
    assert type(companies) == list
    saved_company = companies[0]

    assert type(saved_company) == Company
    assert saved_company.ticker_code == company.ticker_code
    assert saved_company.name == company.name


@pytest.fixture(scope="module")
def db_session():
    engine = create_engine('sqlite:///:memory:')
    Session = sessionmaker(bind=engine)
    session = Session()
    Base.metadata.create_all(engine)
    yield session

    Base.metadata.drop_all(engine)
