from unittest import TestCase


from backend.domain.exception import DomainValidationError
from backend.domain.model.base import Base
from backend.domain.model.types import ID


class TestBaseModelValidation(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        class TestModel(Base):
            prop1: int
            prop2: str = ""

        cls.Model = TestModel

    def test_instance(self):
        instance = self.Model(prop1=1, prop2="two")

        self.assertIsInstance(instance, self.Model)
        self.assertEqual(instance.prop1, 1)
        self.assertEqual(instance.prop2, "two")

    def test_parse_obj(self):
        parsed = self.Model.parse_obj({"prop1": 1, "prop2": "two"})

        self.assertIsInstance(parsed, self.Model)
        self.assertEqual(parsed.prop1, 1)
        self.assertEqual(parsed.prop2, "two")

    def test_instance_wrong_types(self):
        instance = self.Model(prop1=True)
        self.assertIsInstance(instance, self.Model)

        with self.assertRaises(DomainValidationError):
            self.Model(prop1=[])  # noqa

    def test_parse_wrong_types(self):
        with self.assertRaises(DomainValidationError):
            self.Model.parse_obj({"prop1": []})

    def test_parse_array(self):
        parsed = self.Model.parse_list(
            [{"prop1": i, "prop2": str(i)} for i in range(10)]
        )

        self.assertIsInstance(parsed, list)
        self.assertIsInstance(parsed[0], self.Model)
        self.assertEqual(parsed[0].prop1, 0)
