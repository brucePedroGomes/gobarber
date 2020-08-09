import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Calendar,
  NextAppointment,
  Schedule,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Welcome,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Scheduled time</h1>
          <p>
            <span>Today</span>
            <span>Day 6</span>
            <span>Friday</span>
          </p>

          <NextAppointment>
            <strong>Following service</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/62183312?s=460&u=9934bfbcaa4c13e901c83d9242f6965610117b67&v=4"
                alt=""
              />
              <strong>Pedro Gomes</strong>
              <span>
                <FiClock />
                8:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
