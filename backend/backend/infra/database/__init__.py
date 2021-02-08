from backend.infra.database.connection import DatabaseConnection


async def create_database_connection():
    _connection = DatabaseConnection()

    return _connection
