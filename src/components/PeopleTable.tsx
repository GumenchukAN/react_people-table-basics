import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useLocation } from 'react-router-dom';

type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const location = useLocation();
  const selectedSlug = location.pathname.split('/')[2];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people?.map(person => {
          const isSelected = selectedSlug === person.slug;
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={`${isSelected ? 'has-background-warning' : ''}`}
            >
              <td>
                <PersonLink person={person}></PersonLink>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <span className={'has-text-danger'}>
                      {person.motherName}
                    </span>
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.motherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    <span>{person.fatherName}</span>
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
