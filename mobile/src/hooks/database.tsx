import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View, Text } from 'react-native';
import { Connection, createConnection } from 'typeorm';

import { connectionConfig } from '../services/database';

interface DatabaseContextData {
  connection: Connection;
}

const DatabaseContext = createContext<DatabaseContextData>(
  {} as DatabaseContextData,
);

export const DatabaseProvider: React.FC = ({ children }) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection(connectionConfig);

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  if (!connection) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'roboto500', fontSize: 20 }}>
          Connecting to database...
        </Text>
      </View>
    );
  }

  return (
    <DatabaseContext.Provider value={{ connection }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export function useDatabaseConnection() {
  return useContext(DatabaseContext);
}
