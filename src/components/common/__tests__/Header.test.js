import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';

it('should contain 3 NavLinks', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('NavLink').length).toEqual(3);
});

it('should contain 3 anchor tags', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>);
  const numAnchors = wrapper.find("a").length;
  expect(numAnchors).toEqual(3);
});
