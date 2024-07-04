import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import Banner from '../components/Banner';
import { bannerAction } from '../redux/userSlice';

// Mock the useNavigate and useDispatch hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Banner Component', () => {
  let navigate;
  let dispatch;
  let store;

  beforeEach(() => {
    navigate = jest.fn();
    dispatch = jest.fn();
    useNavigate.mockReturnValue(navigate);
    useDispatch.mockReturnValue(dispatch);
    store = mockStore({});

    render(
        <Provider store={store}>
          <Router>
            <Banner message="Test Message" btnText="Click Me" />
          </Router>
        </Provider>
      );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders message and button', () => {
    expect(screen.getByText('Test Message')).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('dispatches action and navigates on button click', () => {

    fireEvent.click(screen.getByText('Click Me'));

    expect(dispatch).toHaveBeenCalledWith(bannerAction(false));
    expect(navigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
