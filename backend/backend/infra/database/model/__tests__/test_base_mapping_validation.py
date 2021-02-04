from unittest import TestCase

from pydantic import AnyHttpUrl
from sqlalchemy import Column, String, Integer

from backend.domain.exception import DomainValidationError
from backend.domain.model.base import Base as DomainBase
from backend.infra.database.model.base import DeclarativeBase


class TestBaseMappingValidation(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        class TestDomainModel(DomainBase):
            prop1: AnyHttpUrl
            prop2: int = None

        class TestModel(DeclarativeBase):
            __domain__ = TestDomainModel
            __tablename__ = "test"

            prop1 = Column(String, nullable=False)
            prop2 = Column(Integer, nullable=True)

        cls.Model = TestModel

    def test_domain_model_validation(self):
        instance = self.Model(prop1="http://test.com/test", prop2=123)

        self.assertIsInstance(instance, self.Model)

    def test_instantiate_with_wrong_types(self):
        with self.assertRaises(DomainValidationError):
            self.Model(prop1="invalid.url")
