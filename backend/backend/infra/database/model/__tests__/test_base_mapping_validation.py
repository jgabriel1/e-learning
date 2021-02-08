from unittest import TestCase

from pydantic import AnyHttpUrl
from sqlalchemy import Column, String, Integer

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

        cls.DomainModel = TestDomainModel
        cls.DBModel = TestModel

    def test_domain_model_parsing(self):
        domain_instance = self.DomainModel.parse_obj(
            {"prop1": "http://test.com/test", "prop2": 123}
        )

        db_instance = self.DBModel.from_domain(domain_instance)

        self.assertIsInstance(db_instance, self.DBModel)
        self.assertEqual(db_instance.prop1, domain_instance.prop1)
        self.assertEqual(db_instance.prop2, domain_instance.prop2)

    def test_domain_model_saving(self):
        domain_instance = self.DomainModel.parse_obj(
            {"prop1": "http://test.com/test", "prop2": 123}
        )

        db_instance = self.DBModel.from_domain(domain_instance)

        db_instance.prop2 = 456

        db_instance.save_model()

        self.assertIs(domain_instance, db_instance._model)
        self.assertEqual(domain_instance.prop2, 456)
