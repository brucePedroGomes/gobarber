import React, { useState, useCallback } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/Auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);

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
          <Section>
            <strong>Morning</strong>

            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/62183312?s=460&u=9934bfbcaa4c13e901c83d9242f6965610117b67&v=4"
                  alt=""
                />
                <strong>Pedro Gomes</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/62183312?s=460&u=9934bfbcaa4c13e901c83d9242f6965610117b67&v=4"
                  alt=""
                />
                <strong>Pedro Gomes</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Evening</strong>
            <Appointment>
              <span>
                <FiClock />
                8:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/62183312?s=460&u=9934bfbcaa4c13e901c83d9242f6965610117b67&v=4"
                  alt=""
                />
                <strong>Pedro Gomes</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={selectedDate}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
