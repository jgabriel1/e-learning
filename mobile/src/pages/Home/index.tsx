import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import CourseList from '../../components/CourseList';

import { Container, Header, SearchInputContainer, SearchInput } from './styles';

import logoImg from '../../assets/images/logo-small.png';
import CourseCard from '../../components/CourseCard';

const LIST_DATA = [
  {
    title: 'Química',
    lessonsCount: 10,
    imageURL:
      'https://jobs.newscientist.com/getasset/c40a5488-11be-43b0-843f-a2e6ef9f0612/',
  },
  {
    title: 'Geografia',
    lessonsCount: 10,
    imageURL:
      'https://www.wits.ac.za/media/wits-university/course-finder-images/world-map-freepik.png',
  },
  {
    title: 'Matemática',
    lessonsCount: 10,
    imageURL:
      'https://images.theconversation.com/files/207820/original/file-20180226-140213-yox11e.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip',
  },
  {
    title: 'Física',
    lessonsCount: 10,
    imageURL:
      'https://noic.com.br/wp-content/uploads/2018/10/physics_fundamentals.jpg',
  },
];

const Home = () => {
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
        courses={LIST_DATA}
        title="Categorias"
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

export default Home;
