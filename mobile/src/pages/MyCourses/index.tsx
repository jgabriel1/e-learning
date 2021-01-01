import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import CourseList from '../../components/CourseList';
import CourseCard from '../../components/CourseCard';

import { Container, Header, SearchInput, SearchInputContainer } from './styles';

import logoImg from '../../assets/images/logo-small.png';

const MyCourses: React.FC = () => {
  const handleNavigateToCourse = useCallback((courseName: string) => {
    console.log(courseName);
  }, []);

  return (
    <Container>
      <Header>
        <Image source={logoImg} />
        <Feather name="power" color="#FF6680" size={24} />
      </Header>

      <SearchInputContainer>
        <Feather name="search" color="#C4C4D1" size={20} />
        <SearchInput
          placeholder="Busque um curso"
          placeholderTextColor="#c4c4d1"
        />
      </SearchInputContainer>

      <CourseList
        courses={[]}
        title="Cursos Favoritos"
        renderItem={({ item }) => (
          <CourseCard
            {...item}
            onPress={() => handleNavigateToCourse(item.title)}
          />
        )}
      />
    </Container>
  );
};

export default MyCourses;
