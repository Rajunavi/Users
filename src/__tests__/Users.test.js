import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import Users from '../components/Users';
import { addEditUser, addAllUsers } from '../redux/userSlice'; 
import { axiosInstance } from '../axiosInstance';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../axiosInstance');

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
useNavigate.mockReturnValue(mockNavigate);

describe('Users Component', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    store = mockStore({
      users: {
        users: [
          { id: 1, name: 'Shivu', mobile: '1234567890', email: 'Shivu@example.com' },
          { id: 2, name: 'Raju', mobile: '0987654321', email: 'Raju@example.com' },
        ],
      },
    });
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(callback => callback(store.getState()));
    render(
        <Provider store={store}>
          <Router>
            <Users />
          </Router>
        </Provider>
      );
  
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders user list', () => {
    expect(screen.getByText('Shivu')).toBeInTheDocument();
    expect(screen.getByText('Raju')).toBeInTheDocument();
  });

  test('navigates to add user on back button click', () => {
    fireEvent.click(screen.getByAltText('back'));

    expect(dispatch).toHaveBeenCalledWith(addEditUser(null));
    expect(mockNavigate).toHaveBeenCalledWith('/adduser');
  });

  test('dispatches action and navigates on edit button click', () => {
    fireEvent.click(screen.getAllByAltText('edit')[0]);

    expect(dispatch).toHaveBeenCalledWith(addEditUser(store.getState().users.users[0]));
    expect(mockNavigate).toHaveBeenCalledWith('/adduser');
  });

  test('dispatches action on delete button click', async () => {
    axiosInstance.delete.mockResolvedValue({
      data: [{ id: 2, name: 'Raju', mobile: '0987654321', email: 'Raju@example.com' }],
    });
    fireEvent.click(screen.getAllByAltText('delete')[0]);

    await waitFor(() => expect(axiosInstance.delete).toHaveBeenCalledWith('delete/1'));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(addAllUsers([
      { id: 2, name: 'Raju', mobile: '0987654321', email: 'Raju@example.com' },
    ])));
  });
});
