from unittest import TestCase

from sqlalchemy import create_engine, MetaData

from backend.infra.database.model import DeclarativeBase


class TestConnection(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.engine = create_engine("sqlite:///:memory:")

    def test_declarative_base_has_metadata(self):
        self.assertTrue(hasattr(DeclarativeBase, "metadata"))
        self.assertIsInstance(DeclarativeBase.metadata, MetaData)

    def test_able_to_create_tables(self):
        metadata: MetaData = DeclarativeBase.metadata
        metadata.create_all(bind=self.engine)

        mapped_table_names = metadata.tables.keys()

        created_tables_names = {
            name
            for name, in self.engine.execute(
                "SELECT name FROM sqlite_master;",
            )
        }

        self.assertEqual(mapped_table_names, created_tables_names)
