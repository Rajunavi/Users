import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UserForm from '../components/UserForm';
import { addAllUsers, bannerAction } from '../redux/userSlice';
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

describe("UserForm Componet", () => {
    let store;
  let dispatch;

  beforeEach(() => {
    store = mockStore({
      users: {
        banner: '',
        editUser: null,
      },
    });
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(callback => callback(store.getState()));
    render(
        <Provider store={store}>
          <Router>
            <UserForm />
          </Router>
        </Provider>
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial values', () => {
    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  });

  test('handles form submission with valid data', async () => {
    axiosInstance.post.mockResolvedValue({ data: [{ id: 1, name: 'Swamy', mobile: '1234567890', email: 'swamy@example.com' }] });
    fireEvent.input(screen.getByLabelText(/Username:/i), { target: { value: 'Swamy' } });
    fireEvent.input(screen.getByLabelText(/Mobile:/i), { target: { value: '9876543210' } });
    fireEvent.input(screen.getByLabelText(/Email:/i), { target: { value: 'swamy@example.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(addAllUsers([{ id: 1, name: 'Swamy', mobile: '1234567890', email: 'swamy@example.com' }])));
    expect(dispatch).toHaveBeenCalledWith(bannerAction('User Added Successfully'));
  });

  test('displays validation errors for invalid inputs', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/Field shouldn't be blank/i)).toBeInTheDocument();
    expect(await screen.findByText(/Mobile number is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
  });

  test('calls dispatch with correct actions on successful submission', async () => {
    axiosInstance.post.mockResolvedValue({ data: [{ id: 1, name: 'Raju', mobile: '1234567890', email: 'raju@example.com' }] });
    fireEvent.input(screen.getByLabelText(/Username:/i), { target: { value: 'Raju' } });
    fireEvent.input(screen.getByLabelText(/Mobile:/i), { target: { value: '9876543210' } });
    fireEvent.input(screen.getByLabelText(/Email:/i), { target: { value: 'raju@example.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(addAllUsers([{ id: 1, name: 'Raju', mobile: '1234567890', email: 'raju@example.com' }])));
    expect(dispatch).toHaveBeenCalledWith(bannerAction('User Added Successfully'));
  });

  test('displays banner on successful submission', async () => {
    store = mockStore({
      users: {
        banner: 'User Added Successfully',
        editUser: null,
      },
    });
    useSelector.mockImplementation(callback => callback(store.getState()));

    axiosInstance.post.mockResolvedValue({ data: [{ id: 1, name: 'John Doe', mobile: '1234567890', email: 'john@example.com' }] });

    fireEvent.input(screen.getByLabelText(/Username:/i), { target: { value: 'John Doe' } });
    fireEvent.input(screen.getByLabelText(/Mobile:/i), { target: { value: '9876543210' } });
    fireEvent.input(screen.getByLabelText(/Email:/i), { target: { value: 'john@example.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(addAllUsers([{ id: 1, name: 'John Doe', mobile: '1234567890', email: 'john@example.com' }])));
    expect(screen.getByText(/User Added Successfully/i)).toBeInTheDocument();
  });


}) 