import { createBrowserRouter } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import GettingStarted from './pages/GettingStarted';
import Colors from './pages/tokens/Colors';
import Typography from './pages/tokens/Typography';
import Spacing from './pages/tokens/Spacing';
import Shadows from './pages/tokens/Shadows';
import Buttons from './pages/components/Buttons';
import Inputs from './pages/components/Inputs';
import Chips from './pages/components/Chips';
import Alerts from './pages/components/Alerts';
import Snackbars from './pages/components/Snackbars';
import Calendar from './pages/composites/Calendar';
import Header from './pages/composites/Header';
import MessengerCard from './pages/composites/MessengerCard';
import Messages from './pages/composites/Messages';
import QuickActions from './pages/composites/QuickActions';
import Navigation from './pages/layouts/Navigation';
import MessengerLayout from './pages/layouts/MessengerLayout';
import DealsPipeline from './pages/layouts/DealsPipeline';
import IconsCatalog from './pages/icons/IconsCatalog';
import Forms from './pages/patterns/Forms';
import Modals from './pages/patterns/Modals';
import Notifications from './pages/patterns/Notifications';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <GettingStarted /> },
      // Tokens
      { path: 'tokens/colors', element: <Colors /> },
      { path: 'tokens/typography', element: <Typography /> },
      { path: 'tokens/spacing', element: <Spacing /> },
      { path: 'tokens/shadows', element: <Shadows /> },
      // Components
      { path: 'components/buttons', element: <Buttons /> },
      { path: 'components/inputs', element: <Inputs /> },
      { path: 'components/chips', element: <Chips /> },
      { path: 'components/alerts', element: <Alerts /> },
      { path: 'components/snackbars', element: <Snackbars /> },
      // Composites
      { path: 'composites/calendar', element: <Calendar /> },
      { path: 'composites/header', element: <Header /> },
      { path: 'composites/messenger-card', element: <MessengerCard /> },
      { path: 'composites/messages', element: <Messages /> },
      { path: 'composites/quick-actions', element: <QuickActions /> },
      // Layouts
      { path: 'layouts/navigation', element: <Navigation /> },
      { path: 'layouts/messenger', element: <MessengerLayout /> },
      { path: 'layouts/deals-pipeline', element: <DealsPipeline /> },
      // Resources
      { path: 'icons', element: <IconsCatalog /> },
      // Patterns
      { path: 'patterns/forms', element: <Forms /> },
      { path: 'patterns/modals', element: <Modals /> },
      { path: 'patterns/notifications', element: <Notifications /> },
    ],
  },
]);
